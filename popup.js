document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const sitesContainer = document.getElementById('sitesContainer');
    const searchInput = document.getElementById('searchInput');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const envButton = document.getElementById('envButton');
    const envDropdown = document.getElementById('envDropdown');
    const currentEnvSpan = document.getElementById('currentEnv');
    const footerEnv = document.getElementById('footerEnv');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // 当前环境（默认生产环境）
    let currentEnv = 'dev';
    let currentCategory = 'hkexpress';
    let allSites = [];
    let filteredSites = [];

    // 环境名称映射
    const envNames = {
        prod: 'PROD ENV', uat: 'UAT ENV', dev: 'DEV ENV', nextdev: 'NEXT DEV ENV', nextuat: 'NEXT UAT ENV'
    };

    // 环境标签映射
    const envTags = {
        prod: 'PROD', uat: 'UAT', dev: 'DEV', nextdev: 'NEXT DEV', nextuat: 'NEXT UAT'
    };

    // 环境颜色类映射
    const envTagClasses = {
        prod: 'prod-tag', uat: 'uat-tag', dev: 'dev-tag', nextdev: 'next-dev-tag', nextuat: 'next-uat-tag'
    };

    // 环境切换器事件
    envButton.addEventListener('click', function (e) {
        e.stopPropagation();
        envDropdown.classList.toggle('show');
    });

    // 点击环境选项
    envDropdown.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const env = e.target.getAttribute('data-env');
            setEnvironment(env);
            envDropdown.classList.remove('show');
        }
    });

    // 点击页面其他地方关闭环境下拉菜单
    document.addEventListener('click', function (e) {
        if (!envButton.contains(e.target)) {
            envDropdown.classList.remove('show');
        }
    });

    // 分页标签事件
    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            // 更新当前分类
            currentCategory = this.getAttribute('data-category');
            // 重新渲染网站列表
            cleanFilter();
            filterSites();
        });
    });

    // 设置环境
    function setEnvironment(env) {
        currentEnv = env;
        currentEnvSpan.textContent = envNames[env];
        footerEnv.textContent = envNames[env];

        // 重新渲染网站列表
        filterSites();
    }

    const githubBaseUrl = {
        baseUrl: 'https://github.com/HKExpressAirwaysLimited/',
        mergerParam: '/compare/release...master',
        releaseParam: '/releases/new',
        apiVersionParam: '/packages/'
    }


    // 预定义网站配置（支持多环境）
    const sites = [
        {
            id: 'hkexpress',
            name: 'HKExpress',
            icon: 'https://mybooking.hkexpress.com/favicon.ico',
            category: 'hkexpress',
            baseUrl: {
                prod: 'https://mybooking.hkexpress.com/en',
                uat: 'https://irp-uat-booking.hkexpress.com/en',
                dev: 'https://irp-dev-booking.hkexpress.com/en'
            },
            order: 1,
            searchAble: false,

        },
        {
            id: 'fullasia',
            name: 'AMPortal',
            icon: 'https://mybooking.hkexpress.com/favicon.ico',
            category: 'hkexpress',
            baseUrl: {
                prod: 'https://mybooking.hkexpress.com/en-HK/full-miles-redemption/login',
                uat: 'https://irp-uat-booking.hkexpress.com/en/full-miles-redemption/login',
                dev: 'https://irp-dev-booking.hkexpress.com/en/full-miles-redemption/login'
            },
            order: 1,
            searchAble: false,

        },
        {
            id: 'adminportal',
            name: 'AdminPortal',
            icon: 'https://mybooking.hkexpress.com/favicon.ico',
            category: 'hkexpress',
            baseUrl: {
                prod: 'https://admin.hkexpress.com/dashboard',
                uat: 'https://irp-uat-admin.hkexpress.com/',
                dev: 'https://irp-dev-admin.hkexpress.com/'
            },
            order: 1,
            searchAble: false,

        },
        {
            id: 'b2bhkexpress',
            name: 'B2B',
            icon: 'https://mybooking.hkexpress.com/favicon.ico',
            category: 'hkexpress',
            baseUrl: {
                prod: 'https://mybooking.hkexpress.com/en/b2b/login',
                uat: 'https://irp-uat-booking.hkexpress.com/en/b2b/login',
                dev: 'https://irp-dev-booking.hkexpress.com/en/b2b/login'
            },
            order: 1,
            searchAble: false,

        },
        {
            id: 'sitecore',
            name: 'Sitecore',
            icon: 'https://mybooking.hkexpress.com/favicon.ico',
            category: 'hkexpress',
            baseUrl: {
                prod: 'https://api.hkexpress.com/public/v1/content-management/list?lang=en&application_code=ALL&channel=app',
                uat: 'https://irp-uat-edge.hkexpress.com/i18n/en/web.json',
                dev: 'https://irp-dev-edge.hkexpress.com/i18n/en/web.json'
            },
            order: 1,
            searchAble: false,

        },
        {
            id: 'githubquery',
            name: 'Query Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-flt-booking-query-svc',
            packagesId: '2167397',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githuborder',
            name: 'Order Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-order-svc',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubmgmt',
            name: 'Mgmt Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-flt-booking-mgmt-svc',
            packagesId: '2167465',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubauth',
            name: 'Auth Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-auth-svc',
            packagesId: '2167512',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubnotification',
            name: 'Notication Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-notification-svc',
            packagesId: '2164074',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubpayment',
            name: 'Payment Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-payment-svc',
            packagesId: '2167420',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubadmin',
            name: 'Admint Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-admin-svc',
            packagesId: '2146705',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubmember',
            name: 'Member Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-member-svc',
            packagesId: '2167453',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubnonpssint',
            name: 'Non pss int Service',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-non-pss-int-svc',
            packagesId: '2167571',
            order: 1,
            haveApi: true,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubnsklib',
            name: 'Nsk Lib',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-nsk-api',
            packagesId: '2170232',
            order: 1,
            haveApi: true,
            deployable: false,
            searchAble: false,

        },
        {
            id: 'githubbaselib',
            name: 'Base Lib',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-base-lib',
            packagesId: '2146780',
            order: 1,
            haveApi: true,
            deployable: false,
            searchAble: false,

        },
        {
            id: 'githubdevopsscript',
            name: 'Devops script',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-devops-script',
            order: 1,
            haveApi: false,
            deployable: false,
            searchAble: false,

        },
        {
            id: 'githubfrontend',
            name: 'Front end',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-frontend-monorepo',
            order: 1,
            haveApi: false,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubadminportal',
            name: 'Admin portal',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-admin-portal',
            order: 1,
            haveApi: false,
            deployable: true,
            searchAble: false,

        },
        {
            id: 'githubnativemobile',
            name: 'Native Mobile',
            icon: 'https://github.githubassets.com/favicons/favicon.svg',
            category: 'server',
            repositoryName: 'hkexpress-react-native-mobile',
            order: 1,
            haveApi: false,
            deployable: false,
            searchAble: false,

        },
        {
            id: 'jira',
            name: 'Jira',
            icon: 'https://www.atlassian.com/favicon.ico',
            category: 'others',
            url: 'https://hkexpress-uo.atlassian.net/jira/software/projects/UWA/boards/12',
            order: 1,
            searchAble: false,

        },
        {
            id: 'sendgrid',
            name: 'Sendgrid',
            icon: 'https://login.sendgrid.com/favicon.ico',
            category: 'others',
            url: 'https://app.sendgrid.com/',
            order: 1,
            searchAble: false,

        },
        {
            id: 'cognito',
            name: 'Cognito',
            icon: 'https://ap-southeast-2.signin.aws.amazon.com/favicon.ico',
            category: 'others',
            url: 'https://730335598856.signin.aws.amazon.com/console',
            order: 1,
            searchAble: false,

        },
        {
            id: 'trueuptimesheet',
            name: 'TimeSheet',
            icon: 'https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/brand-icons/product/svg/excel_32x1.svg',
            category: 'others',
            url: 'https://ts.accenture.com/:x:/r/sites/HKEAMS/_layouts/15/doc2.aspx?sourcedoc=%7B3CB24B6B-AA0D-42F5-AB5C-585EEC1BF713%7D&file=HKE%20AMS%20-%20Schedule%20Plan.xlsx&action=default&mobileredirect=true%20Sign%20in%20to%20your%20account',
            order: 1,
            searchAble: false,

        },
        {
            id: 'figma',
            name: 'Figma',
            icon: 'https://static.figma.com/app/icon/1/favicon.svg',
            category: 'others',
            url: 'https://www.figma.com/file/XvxmcGKZMaaYAjqqExhT3b/HKE-Collaborate?fuid=1390530896643064924',
            order: 1,
            searchAble: false,

        },
        {
            id: 'nskswagger',
            name: 'NskSwagger',
            icon: 'https://swagger.io/docs/favicon.svg',
            category: 'others',
            url: 'https://dotrezapir4x-akm.test.uo.navitaire.com/swagger/index.html#/token/nsk_v1_token_post',
            order: 1,
            searchAble: false,

        },
        {
            id: 'k6',
            name: 'K6',
            icon: 'https://app.k6.io/favicon.ico',
            category: 'others',
            url: 'https://app.k6.io/account/login',
            order: 1,
            searchAble: false,

        },
        {
            id: 'jimu',
            name: 'Jimu',
            icon: 'https://jimutour.com/favicon.ico',
            category: 'others',
            url: 'https://jimutour.com/submitlogin.do',
            order: 1,
            searchAble: false,

        },
        {
            id: 'jimu',
            name: 'Jimu',
            icon: 'https://jimutour.com/favicon.ico',
            category: 'opensearch',
            url: 'https://jimutour.com/submitlogin.do',
            order: 1,
            searchAble: false,
            placeholder: '输入搜索关键词'
        },


    ];

    // 初始化 - 设置默认环境
    setEnvironment('dev');
    allSites = sites;
    filteredSites = sites.filter(site => site.category === currentCategory);
    renderSites(filteredSites);

    // 搜索功能
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();
        filterSites(searchTerm);
    });

    // 筛选网站函数
    function filterSites(searchTerm = '') {
        // 首先按分类筛选
        filteredSites = sites.filter(site => site.category === currentCategory);

        // 如果有搜索词，进一步筛选
        if (searchTerm) {
            filteredSites = filteredSites.filter(site => site.name.toLowerCase().includes(searchTerm) || site.placeholder.toLowerCase().includes(searchTerm));
        }

        // 渲染网站列表
        renderSites(filteredSites);
    }

    function cleanFilter() {
        // 首先按分类筛选
        searchInput.value = '';
    }

    // 渲染网站列表函数
    function renderSites(sitesToRender) {
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

        // 渲染每个网站
        sitesToRender.forEach(site => {

            if (site.category == 'server') {
                const rowElement1 = document.createElement('div');
                rowElement1.className = 'github-svc-div';
                rowElement1.innerHTML = `
                        <p class="github-svc-name"> <span><i class="fa-solid fa-server"></i></span> ${site.name}</p>
                `;
                sitesContainer.appendChild(rowElement1);

                if (site.deployable) {
                    const rowElement2 = document.createElement('div');
                    rowElement2.className = 'site-container';
                    rowElement2.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="https://www.redhat.com/favicon.ico"></img>
                        <span>Red Hat</span>
                    </button>
                `;

                    sitesContainer.appendChild(rowElement2);
                    rowElement2.querySelector('.svc-base').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openSite(siteId);

                    });
                    const rowElement3 = document.createElement('div');
                    rowElement3.className = 'site-container';
                    rowElement3.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="https://openshift-gitops-server-openshift-gitops.apps.hkerosa-nonprod.o5ys.p1.openshiftapps.com/assets/favicon/favicon-32x32.png"></img>
                        <span>Argo</span>
                    </button>
                `;
                    sitesContainer.appendChild(rowElement3);
                    rowElement3.querySelector('.svc-base').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openSite(siteId);

                    });

                }

                if (site.haveApi) {
                    const rowElement4 = document.createElement('div');
                    rowElement4.className = 'site-container';
                    rowElement4.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>APIVersion</span>
                    </button>
                `;
                    sitesContainer.appendChild(rowElement4);
                    rowElement4.querySelector('.svc-base').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openServerRelatedSite(siteId,'apiversion');

                    });
                }


                const rowElement5 = document.createElement('div');
                rowElement5.className = 'site-container';
                rowElement5.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Repository</span>
                    </button>
                `;
                changeSitesContainerType("layout-table")

                sitesContainer.appendChild(rowElement5);
                rowElement5.querySelector('.svc-base').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openServerRelatedSite(siteId,'repository');

                });

                const rowElement6 = document.createElement('div');
                rowElement6.className = 'site-container';
                rowElement6.innerHTML = `
                    <button class="site-button svc-merge"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Merge</span>
                    </button>
                `;
                changeSitesContainerType("layout-table")
                sitesContainer.appendChild(rowElement6);
                rowElement6.querySelector('.svc-merge').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openServerRelatedSite(siteId,'merge');

                });
                const rowElement7 = document.createElement('div');
                rowElement7.className = 'site-container';
                rowElement7.innerHTML = `
                    <button class="site-button svc-release"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Release</span>
                    </button>
                `;
                changeSitesContainerType("layout-table")
                sitesContainer.appendChild(rowElement7);
                rowElement7.querySelector('.svc-release').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openServerRelatedSite(siteId,'release');

                });


            }


            if (site.category == 'hkexpress') {
                const rowElement = document.createElement('div');
                rowElement.className = 'site-container';
                rowElement.innerHTML = `
                    <button class="site-button"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>${site.name}</span>
                    </button>
                `;

                changeSitesContainerType("layout-table")
                sitesContainer.appendChild(rowElement);

                // 添加打开按钮事件
                rowElement.querySelector('.site-button').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openSite(siteId);

                });

            }
            if (site.category == 'others') {
                const rowElement = document.createElement('div');
                rowElement.className = 'site-container';
                rowElement.innerHTML = `
                    <button class="site-button"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>${site.name}</span>
                    </button>
                `;

                changeSitesContainerType("layout-table")
                sitesContainer.appendChild(rowElement);

                // 添加打开按钮事件
                rowElement.querySelector('.site-button').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openSite(siteId);

                });

            }


            if (site.category == 'opensearch') {
                rowElement.className = 'site-row';
                rowElement.innerHTML = `
                    <div class="site-name">
                        <i class="${site.icon}"></i>
                        <span>${site.name}</span>
                    </div>
                    <div  class="param-input">
                        <input type="text"
                               id="input-${site.id}"
                               placeholder="${site.placeholder}"
                               data-site-id="${site.id}">
                    </div>
                    <button  class="open-btn" data-site-id="${site.id}">
                        <i class="fas fa-external-link-alt"></i>
                        打开
                    </button>
                `;
                changeSitesContainerType("layout-table")
                // 添加打开按钮事件
                rowElement.querySelector('.open-btn').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openSite(siteId);
                });

                // 添加点击网站名聚焦输入框
                rowElement.querySelector('.site-name').addEventListener('click', function () {
                    inputField.focus();
                });

            }


        });
    }

    function changeSitesContainerType(type) {
        if (sitesContainer.classList.contains(type)) {
            return;
        }
        const cssList = ["layout-grid", "layout-table"]
        cssList.filter(css => css != type).forEach(css => sitesContainer.classList.remove(css))
        sitesContainer.classList.add(type);
    }

    function openServerRelatedSite(siteId, type) {
        const site = sites.find(s => s.id === siteId);
        if (!site) return;

        // 对参数进行编码
        var fullUrl = ''
        switch (type) {
            case 'apiversion':
                fullUrl = githubBaseUrl.baseUrl + site.repositoryName + githubBaseUrl.apiVersionParam + site.packagesId
                break;
            case 'repository':
                fullUrl = githubBaseUrl.baseUrl + site.repositoryName
                break;
            case 'merge':
                fullUrl = githubBaseUrl.baseUrl + site.repositoryName + githubBaseUrl.mergerParam
                break;
            case 'release':
                fullUrl = githubBaseUrl.baseUrl + site.repositoryName + githubBaseUrl.releaseParam
                break;
        }

        // 在实际Chrome扩展中，使用chrome.tabs.create打开网页
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({url: fullUrl});
        } else {
            // 在普通浏览器环境中测试
            window.open(fullUrl, '_blank');
        }

        showNotification(`正在打开: ${site.name}`);
    }

    // 打开网站函数
    function openSite(siteId) {
        const site = sites.find(s => s.id === siteId);
        if (!site) return;

        const inputElement = document.getElementById(`input-${siteId}`);
        const param = site.searchAble ? inputElement.value.trim() : '';

        if (site.searchAble & !param) {
            showNotification(`请输入${site.placeholder}`, true);
            inputElement.focus();
            return;
        }

        // 获取当前环境的URL
        const baseUrl = site.baseUrl[currentEnv];

        // 对参数进行编码
        const encodedParam = encodeURIComponent(param);
        const fullUrl = baseUrl + encodedParam;

        // 在实际Chrome扩展中，使用chrome.tabs.create打开网页
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({url: fullUrl});
        } else {
            // 在普通浏览器环境中测试
            window.open(fullUrl, '_blank');
        }

        showNotification(`正在打开: ${site.name}`);
    }

    // 显示通知
    function showNotification(message, isError = false) {
        notificationText.textContent = message;
        notification.className = isError ? 'notification error' : 'notification';

        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});