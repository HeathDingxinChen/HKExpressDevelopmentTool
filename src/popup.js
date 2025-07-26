import {sites, openSearchUrl, argoUrl, githubUrl, redhatUrl, icons, envNames, timeNames} from "@/constants.js";

document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const sitesContainer = document.getElementById('sitesContainer');
    const searchInput = document.getElementById('searchInput');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const envButton = document.getElementById('envButton');
    const timeButton = document.getElementById('timeButton');
    const clearCookiesButton = document.getElementById('clearCookiesButton');
    const envDropdown = document.getElementById('envDropdown');
    const timeDropdown = document.getElementById('timeDropdown');
    const currentEnvSpan = document.getElementById('currentEnv');
    const currentTimeSpan = document.getElementById('currentTimeSelector');
    const timeSwitcherContainer = document.getElementById('timeSwitcherContainer');
    const cookieCleanerContainer = document.getElementById('cookieCleanerContainer');
    // const footerEnv = document.getElementById('footerEnv');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const clearSearch = document.getElementById('clearSearch');
    const githubRepoFoot = document.getElementById('github-repo-foot');
    const CACHE_EXPIRATION_MINUTES = 10;

    let currentEnv = 'dev';
    let currentTime = 'd1';
    let currentSearchWord = '';
    let currentCategory = 'hkexpress';
    let allSites = [];
    let filteredSites = [];


    envButton.addEventListener('click', function (e) {
        e.stopPropagation();
        envDropdown.classList.toggle('show');
    });

    timeButton.addEventListener('click', function (e) {
        e.stopPropagation();
        timeDropdown.classList.toggle('show');
    });

    clearCookiesButton.addEventListener('click', function (e) {
        showNotification('敬请期待！', true);
        return;
        if (typeof chrome === 'undefined' || !chrome.cookies) {
            console.error('Chrome cookies API不可用');
            showNotification('Cookies清理功能不可用，请检查扩展权限设置', true);
            return;
        }


        const cookiesToClear = Object.values(sites.find(s => s.id === "hkexpress").env);

        const objects = cookiesToClear.map(url => {
            try {
                return {
                    domain: new URL(url).hostname
                };
            } catch (err) {
                console.error('解析URL失败:', url, err);
                return null;
            }
        }).filter(Boolean);

        const allTabs = chrome.tabs.query({});

        const [currentTab] = chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        // 步骤3: 获取所有 Cookie 存储容器
        const cookieStores = chrome.cookies.getAllCookieStores();

        // 步骤4: 收集其他标签页的 storeId
        const storeIdsToDelete = new Set();

        for (const tab of allTabs) {
            // 跳过当前标签页
            if (tab.id === currentTab.id) continue;

            // 查找标签页所属的 Cookie 存储容器
            const store = cookieStores.find(s => s.tabIds.includes(tab.id));
            if (store) {
                storeIdsToDelete.add(store.id);
            }
        }

        for (const storeId of storeIdsToDelete) {
            // 获取该容器中的所有 cookies
            const cookies = chrome.cookies.getAll({storeId});

            // 删除每个 cookie
            for (const cookie of cookies) {
                const url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`;
                try {
                    // chrome.cookies.remove({
                    //     url,
                    //     name: cookie.name,
                    //     storeId
                    // });
                    console.log(`Deleted: ${cookie.name} in store ${storeId}`);
                } catch (error) {
                    console.error(`Failed to delete ${cookie.name}:`, error);
                }
            }
        }


        chrome.cookies.getAllCookieStores(function (cookieStores) {
            console.log('所有 Cookie Stores:', cookieStores);

            // 获取hkexpress网站的所有环境URL
            const siteUrls = Object.values(sites.find(s => s.id === "hkexpress").env);

            // 从URL中提取域名
            const targetDomains = siteUrls.map(url => {
                try {
                    return new URL(url).hostname;
                } catch (err) {
                    console.error('解析URL失败:', url, err);
                    return null;
                }
            });

            chrome.cookies.getAll({domain: "irp-uat-manage.hkexpress.com"}, function (cookies) {
                console.log('cookies:', cookies)
            })

            objects.forEach(object => {
                // 获取该域名下的所有cookies
                chrome.cookies.getAll(object, function (cookies) {
                    if (chrome.runtime.lastError) {
                        console.error('获取cookies失败:', domain, chrome.runtime.lastError);
                        processedDomains++;
                        return;
                    }
                    console.log(`找到 ${cookies.length} 个cookies在域名 ${object} 下`);
                    // if (cookies.length === 0) {
                    //     processedDomains++;
                    //     checkCompletion();
                    //     return;
                    // }

                    let domainRemoved = 0;
                    cookies.forEach(cookie => {
                        chrome.cookies.remove({
                            url: (cookie.secure ? "https://" : "http://") + cookie.domain.replace(/^\./, "") + cookie.path,
                            name: cookie.name
                        }, function (details) {
                            if (details) {
                                totalRemoved++;
                                domainRemoved++;
                            }

                            if (chrome.runtime.lastError) {
                                console.debug('删除cookie失败:', cookie.name, chrome.runtime.lastError);
                            }

                            // 检查是否完成了当前域名的所有cookies处理
                            if (domainRemoved === cookies.length) {
                                console.log(`已清除 ${domain} 下的 ${domainRemoved} 个cookies`);
                                processedDomains++;
                                checkCompletion();
                            }
                        });
                    });

                    // 辅助函数：检查是否完成所有处理
                    function checkCompletion() {
                        if (processedDomains === domains.length) {
                            showNotification(`完成！共清除 ${totalRemoved} 个cookies`);
                        }
                    }
                });
            });

            setTimeout(() => {
                showNotification(`已尝试清除指定cookies`);
            }, 1000);


        });
    });

    envDropdown.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const env = e.target.getAttribute('data-env');
            setCurrentEnv(env);
            envDropdown.classList.remove('show');
            let ENV = env.toUpperCase();
            showNotification(`已切换到 ${ENV} ENV`);
        }
    });

    timeDropdown.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const time = e.target.getAttribute('data-env');
            setTimeSelector(time);
            timeDropdown.classList.remove('show');
            showNotification(`已切换到 ${timeNames[time]} 查询范围`);
        }
    });

    clearSearch.addEventListener('click', function () {
        searchInput.value = '';
        setSearchWord('');
        filterSites('');
        // 隐藏清除按钮
        clearSearch.classList.add('hidden');
    });

    githubRepoFoot.addEventListener('click', function () {
        chrome.tabs.create({url: "https://github.com/HeathDingxinChen/HKExpressDevelopmentTool"});
    });

    document.addEventListener('click', function (e) {
        if (!envButton.contains(e.target)) {
            envDropdown.classList.remove('show');
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            // 更新当前分类
            currentCategory = this.getAttribute('data-category');
            if (currentCategory === 'opensearch') {
                timeSwitcherContainer.classList.remove('hidden');
            } else {
                timeSwitcherContainer.classList.add('hidden');
            }
            if (currentCategory === 'hkexpress') {
                cookieCleanerContainer.classList.remove('hidden');
            } else {
                cookieCleanerContainer.classList.add('hidden');
            }
            setSelectedTab(currentCategory);
            // 重新渲染网站列表
            filterSites(currentSearchWord)
        });
    });


    function setSearchWord(word) {
        currentSearchWord = word;
        const data = {
            value: word, timestamp: new Date().getTime()
        };
        localStorage.setItem('searchWord', JSON.stringify(data));
    }

    function setSelectedTab(tab) {
        const data = {
            value: tab, timestamp: new Date().getTime()
        };
        localStorage.setItem('selectedTab', JSON.stringify(data));
    }

    function setCurrentEnv(env) {
        currentEnv = env;
        currentEnvSpan.textContent = envNames[env];
        const data = {
            value: env, timestamp: new Date().getTime()
        };
        localStorage.setItem('selectedEnv', JSON.stringify(data));
        filterSites(currentSearchWord);
    }

    function setTimeSelector(time) {
        currentTime = time;
        currentTimeSpan.textContent = timeNames[time];
        const data = {
            value: time, timestamp: new Date().getTime()
        };
        localStorage.setItem('selectedTime', JSON.stringify(data));
        filterSites(currentSearchWord);
    }

    function loadCachedEnv() {
        const savedData = localStorage.getItem('selectedEnv');
        if (!savedData) {
            currentEnvSpan.textContent = envNames[currentEnv];
            return;
        }
        try {
            const data = JSON.parse(savedData);
            if (data.value && envNames[data.value]) {
                currentEnv = data.value;
                currentEnvSpan.textContent = envNames[currentEnv];
                return;
            }
        } catch (e) {
            console.error('Error parsing saved data:', e);
        }
        localStorage.removeItem('selectedEnv');
        currentEnvSpan.textContent = envNames[currentEnv];

    }

    function loadCachedSelectedTab() {
        const savedData = localStorage.getItem('selectedTab');
        if (!savedData) {
            tabButtons.forEach(button => {
                if (button.getAttribute('data-category') === currentCategory) {
                    button.classList.add('active');
                }
            });
            return;
        }
        try {
            const data = JSON.parse(savedData);
            // 检查是否在有效期内
            if (checkCacheExpiration(data.timestamp)) {
                if (data.value) {
                    currentCategory = data.value
                    tabButtons.forEach(button => {
                        if (button.getAttribute('data-category') === currentCategory) {
                            button.classList.add('active');
                        }
                    });
                    return;
                }
            }
        } catch (e) {
            console.error('Error parsing saved data:', e);
        }
        localStorage.removeItem('selectedTab');
        tabButtons.forEach(button => {
            if (button.getAttribute('data-category') === currentCategory) {
                button.classList.add('active');
            }
        });
    }

    function checkCacheExpiration(cachedTime) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - cachedTime;
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        return minutesDiff < CACHE_EXPIRATION_MINUTES
    }

    function loadCachedSearchWord() {
        const savedData = localStorage.getItem('searchWord');
        if (!savedData) {
            searchInput.value = currentSearchWord
            clearSearch.classList.add('hidden');
            return;
        }
        try {
            const data = JSON.parse(savedData);
            if (checkCacheExpiration(data.timestamp)) {
                if (data.value) {
                    currentSearchWord = data.value;
                    searchInput.value = data.value
                    if (currentSearchWord) {
                        clearSearch.classList.remove('hidden');
                    } else {
                        clearSearch.classList.add('hidden');
                    }
                    return;
                }
            }
        } catch (e) {
            console.error('Error parsing saved data:', e);
        }
        localStorage.removeItem('searchWord');

        searchInput.value = currentSearchWord
        clearSearch.classList.add('hidden');

    }

    function loadTimeSelector() {
        const savedData = localStorage.getItem('selectedTime');
        if (!savedData) {
            currentTimeSpan.textContent = timeNames[currentTime];
            return;
        }
        try {
            const data = JSON.parse(savedData);
            // 检查是否在有效期内
            if (checkCacheExpiration(data.timestamp)) {
                if (data.value && timeNames[data.value]) {
                    currentTime = data.value;
                    currentTimeSpan.textContent = timeNames[currentTime];
                    return;
                }
            }
        } catch (e) {
            console.error('Error parsing saved data:', e);
        }
        localStorage.removeItem('selectedTime');
        currentTimeSpan.textContent = timeNames[currentTime];
    }

    loadCachedSelectedTab()
    loadCachedSearchWord()
    loadCachedEnv()
    loadTimeSelector()


    allSites = sites;
    filteredSites = sites.filter(site => site.category === currentCategory);
    filterSites(currentSearchWord)
    renderSites(filteredSites);

    // 搜索功能
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();
        setSearchWord(searchTerm)

        if (searchTerm) {
            clearSearch.classList.remove('hidden');
        } else {
            clearSearch.classList.add('hidden');
        }

        filterSites(searchTerm);
    });

    // 筛选网站函数
    function filterSites(searchTerm = '') {
        filteredSites = sites.filter(site => site.category === currentCategory);
        if (searchTerm) {
            filteredSites = filteredSites.filter(site => site.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        renderSites(filteredSites);
    }

    function cleanFilter() {
        // searchInput.value = '';
    }

    function renderSites(sitesToRender) {

        if (currentCategory.toString() === 'opensearch') {
            timeSwitcherContainer.classList.remove('hidden');
        }

        // 清空容器
        sitesContainer.innerHTML = '';

        if (sitesToRender.length === 0) {
            sitesContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>没有找到网站</p>
                    </div>
                `;
            return;
        }
        const fragment = document.createDocumentFragment();

        sitesToRender.forEach(site => {

            switch (site.category) {
                case 'server': {
                    fragment.appendChild((() => {
                        let element = document.createElement('div');
                        element.className = 'github-svc-div';
                        element.innerHTML = `
                        <p class="github-svc-name"> <span><i class="fa-solid fa-server"></i></span> ${site.name}</p>
                `;
                        return element;
                    })())

                    if (site.deployable) {
                        fragment.appendChild((() => {
                            let element = document.createElement('div');
                            element.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${icons.redhat}"></img>
                        <span>RedHat</span>
                    </button>
                `;
                            element.querySelector('.site-button').addEventListener('click', function () {
                                const siteId = this.getAttribute('data-site-id');
                                openServerRelatedSite(siteId, 'redhat');

                            });
                            return element;
                        })())

                        fragment.appendChild((() => {
                            let element = document.createElement('div');
                            element.innerHTML = `
                 <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${icons.argo}"></img>
                        <span>Argo</span>
                    </button>
                `;
                            element.querySelector('.site-button').addEventListener('click', function () {
                                const siteId = this.getAttribute('data-site-id');
                                openServerRelatedSite(siteId, 'argo');

                            });
                            return element;
                        })())
                    }

                    if (site.haveApi) {
                        fragment.appendChild((() => {
                            let element = document.createElement('div');
                            element.innerHTML = `
                       <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>ApiVer</span>
                    </button>
                `;
                            element.querySelector('.site-button').addEventListener('click', function () {
                                const siteId = this.getAttribute('data-site-id');
                                openServerRelatedSite(siteId, 'apiversion');
                            });
                            return element;
                        })())
                    }

                    fragment.appendChild((() => {
                        let element = document.createElement('div');
                        element.innerHTML = `
                            <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Repository</span>
                    </button>
                `;
                        element.querySelector('.site-button').addEventListener('click', function () {
                            const siteId = this.getAttribute('data-site-id');
                            openServerRelatedSite(siteId, 'repository');
                        });
                        return element;
                    })())


                    fragment.appendChild((() => {
                        let element = document.createElement('div');
                        element.innerHTML = `
                <button class="site-button svc-merge"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Merge</span>
                    </button>
                `;

                        element.querySelector('.site-button').addEventListener('click', function () {
                            const siteId = this.getAttribute('data-site-id');
                            openServerRelatedSite(siteId, 'merge');
                        });
                        return element;
                    })())


                    fragment.appendChild((() => {
                        let element = document.createElement('div');
                        element.innerHTML = `
              <button class="site-button svc-release"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Release</span>
                    </button>
                `;
                        element.querySelector('.site-button').addEventListener('click', function () {
                            const siteId = this.getAttribute('data-site-id');
                            openServerRelatedSite(siteId, 'release');
                        });
                        return element;
                    })())


                    fragment.childNodes.forEach((rowElement) => {
                        if (rowElement.className || rowElement.className === '') {
                            rowElement.className = 'layout-table site-container';
                        }
                    })


                    break;
                }
                case
                'hkexpress': {
                    fragment.appendChild((() => {
                        let element = document.createElement('div');
                        element.className = 'layout-table site-container';
                        element.innerHTML = `
                 <button class="site-button"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>${site.name}</span>
                    </button>
                `;
                        element.querySelector('.site-button').addEventListener('click', function () {
                            const siteId = this.getAttribute('data-site-id');
                            openHKExpressSite(siteId);

                        });
                        return element;
                    })())
                    break;
                }

                case
                'others'
                : {

                    fragment.appendChild((() => {
                        let element = document.createElement('div');
                        element.className = 'layout-table site-container';
                        element.innerHTML = `
                  <button class="site-button"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>${site.name}</span>
                    </button>
                `;
                        element.querySelector('.site-button').addEventListener('click', function () {
                            const siteId = this.getAttribute('data-site-id');
                            openNormalSite(siteId);

                        });
                        return element;
                    })())

                    break;
                }
                case
                'opensearch'
                : {


                    fragment.appendChild((() => {
                        let element = document.createElement('div');
                        element.className = 'github-svc-div';
                        element.innerHTML = `
      <p class="github-svc-name"> <span><i class="fas fa-search"></i></i></span> ${site.name}</p>
                `;
                        return element;
                    })())


                    if (site.searchAble) {
                        fragment.appendChild((() => {
                            let element = document.createElement('div');
                            element.className = 'layout-grid site-container';
                            element.innerHTML = `
                <div  class="param-input">
                        <input type="text"
                               id="input-${site.id}"
                               placeholder="${site.placeholder}"
                               data-site-id="${site.id}">
                    </div>
                    <button  class="opensearch-btn" data-site-id="${site.id}">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                `;
                            element.querySelector('.opensearch-btn').addEventListener('click', function () {
                                const siteId = this.getAttribute('data-site-id');
                                openOpensearch(siteId);

                            });
                            return element;
                        })())

                    } else {
                        fragment.appendChild((() => {
                            let element = document.createElement('div');
                            element.className = 'layout-grid site-container';
                            element.innerHTML = `
                   <div style="opacity:0.5; pointer-events: none;" class="param-input">
                        <input type="text"
                               id="input-${site.id}"
                               placeholder="NA"
                               data-site-id="${site.id}">
                    </div>
                    <button  class="opensearch-btn" data-site-id="${site.id}">
                       <i class="fa-solid fa-magnifying-glass"></i>
                       
                    </button>
                `;
                            element.querySelector('.opensearch-btn').addEventListener('click', function () {
                                const siteId = this.getAttribute('data-site-id');
                                openOpensearch(siteId);

                            });
                            return element;
                        })())
                    }
                    break;
                }
            }
            sitesContainer.appendChild(fragment);
        });

    }

    function openServerRelatedSite(siteId, type) {
        const site = sites.find(s => s.id === siteId);
        if (!site) return;

        var fullUrl = ''
        switch (type) {
            case 'redhat':
                fullUrl = redhatUrl.baseUrl + site.env[currentEnv] + redhatUrl.url1 + site.repositoryName + redhatUrl.url2
                break;
            case 'argo':
                fullUrl = argoUrl.baseUrl + site.env[currentEnv] + argoUrl.url1
                break;
            case 'apiversion':
                fullUrl = githubUrl.baseUrl + site.repositoryName + githubUrl.apiVersionParam + site.packagesId
                break;
            case 'repository':
                fullUrl = githubUrl.baseUrl + site.repositoryName
                break;
            case 'merge':
                fullUrl = githubUrl.baseUrl + site.repositoryName + githubUrl.mergerParam
                break;
            case 'release':
                fullUrl = githubUrl.baseUrl + site.repositoryName + githubUrl.releaseParam
                break;
        }

        // 在实际Chrome扩展中，使用chrome.tabs.create打开网页
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({url: fullUrl});
        } else {
            // 在普通浏览器环境中测试
            window.open(fullUrl, '_blank');
        }

        // showNotification(`正在打开: ${site.name}`);
    }

    function openHKExpressSite(siteId) {
        const site = sites.find(s => s.id === siteId);
        if (!site) return;
        // 获取当前环境的URL
        const fullUrl = site.env[currentEnv];
        // 在实际Chrome扩展中，使用chrome.tabs.create打开网页
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({url: fullUrl});
        } else {
            // 在普通浏览器环境中测试
            window.open(fullUrl, '_blank');
        }
        // showNotification(`正在打开: ${site.name}`);
    }

    function openNormalSite(siteId) {
        const site = sites.find(s => s.id === siteId);
        if (!site) return;
        // 获取当前环境的URL

        const fullUrl = site.url;
        // 在实际Chrome扩展中，使用chrome.tabs.create打开网页
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({url: fullUrl});
        } else {
            // 在普通浏览器环境中测试
            window.open(fullUrl, '_blank');
        }
        // showNotification(`正在打开: ${site.name}`);
    }

    function openOpensearch(siteId) {
        const site = sites.find(s => s.id === siteId);

        const inputElement = document.getElementById(`input-${siteId}`);
        const param = site.searchAble ? inputElement.value.trim() : '';

        if (!site) return;
        const baseUrl = openSearchUrl.env[currentEnv];
        const showColumn = site.showColumn;
        const index = openSearchUrl.indexParam.replace('$1', openSearchUrl.indexPattern[currentEnv])
        const time = openSearchUrl.timeSelector[currentTime]
        var filterIndex = ''

        if (site.usedFilter === true) {
            filterIndex = openSearchUrl.filterIndex.replace('$1', openSearchUrl.indexPattern[currentEnv])
        }

        var queryParam = site.envQueryParam != null ? site.envQueryParam[currentEnv] : site.queryParam;
        if (site.searchAble === true) {
            queryParam = queryParam.replaceAll('$1', param)
        }


        const fullUrl = baseUrl + showColumn + index + time + filterIndex + queryParam;

        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({url: fullUrl});
        } else {
            // 在普通浏览器环境中测试
            window.open(fullUrl, '_blank');
        }
        // showNotification(`正在打开: ${site.name}`);
    }

    // 显示通知
    function showNotification(message, isError = false) {
        notificationText.textContent = message;
        notification.className = isError ? 'notification error' : 'notification';

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 1000);
    }
});