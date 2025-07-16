document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const sitesContainer = document.getElementById('sitesContainer');
    const searchInput = document.getElementById('searchInput');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const envButton = document.getElementById('envButton');
    const timeButton = document.getElementById('timeButton');
    const envDropdown = document.getElementById('envDropdown');
    const timeDropdown = document.getElementById('timeDropdown');
    const currentEnvSpan = document.getElementById('currentEnv');
    const currentTimeSpan = document.getElementById('currentTimeSelector');
    const timeSwitcherContainer = document.getElementById('timeSwitcherContainer');
    // const footerEnv = document.getElementById('footerEnv');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const clearSearch = document.getElementById('clearSearch');
    const CACHE_EXPIRATION_MINUTES = 10;
    // 预定义网站配置（支持多环境）
    const sites = [{
        id: 'hkexpress',
        name: 'HKExpress',
        icon: 'icons/hke_little.ico',
        category: 'hkexpress',
        baseUrl: {
            prod: 'https://mybooking.hkexpress.com/en',
            uat: 'https://irp-uat-booking.hkexpress.com/en',
            dev: 'https://irp-dev-booking.hkexpress.com/en',
            nextdev: 'https://irp-next-dev-booking.hkexpress.com/en',
            nextuat: 'https://irp-next-uat-booking.hkexpress.com/en'
        },
        order: 1,
        searchAble: false,

    }, {
        id: 'fullasia',
        name: 'AMPortal',
        icon: 'icons/hke_little.ico',
        category: 'hkexpress',
        baseUrl: {
            prod: 'https://mybooking.hkexpress.com/en-HK/full-miles-redemption/login',
            uat: 'https://irp-uat-booking.hkexpress.com/en/full-miles-redemption/login',
            dev: 'https://irp-dev-booking.hkexpress.com/en/full-miles-redemption/login',
            nextdev: 'https://irp-next-dev-booking.hkexpress.com/en/full-miles-redemption/login',
            nextuat: 'https://irp-next-uat-booking.hkexpress.com/en/full-miles-redemption/login'
        },
        order: 1,
        searchAble: false,

    }, {
        id: 'adminportal',
        name: 'AdminPortal',
        icon: 'icons/hke_little.ico',
        category: 'hkexpress',
        baseUrl: {
            prod: 'https://admin.hkexpress.com/dashboard',
            uat: 'https://irp-uat-admin.hkexpress.com/',
            dev: 'https://irp-dev-admin.hkexpress.com/',
            nextdev: 'https://irp-next-dev-admin.hkexpress.com/',
            nextuat: 'https://irp-next-uat-admin.hkexpress.com/'
        },
        order: 1,
        searchAble: false,

    }, {
        id: 'b2bhkexpress',
        name: 'B2B',
        icon: 'icons/hke_little.ico',
        category: 'hkexpress',
        baseUrl: {
            prod: 'https://mybooking.hkexpress.com/en/b2b/login',
            uat: 'https://irp-uat-booking.hkexpress.com/en/b2b/login',
            dev: 'https://irp-dev-booking.hkexpress.com/en/b2b/login',
            nextdev: 'https://irp-next-dev-booking.hkexpress.com/en/b2b/login',
            nextuat: 'https://irp-next-uat-booking.hkexpress.com/en/b2b/login'
        },
        order: 1,
        searchAble: false,

    }, {
        id: 'sitecore',
        name: 'Sitecore',
        icon: 'icons/sitecore.ico',
        category: 'hkexpress',
        baseUrl: {
            prod: 'https://api.hkexpress.com/public/v1/content-management/list?lang=en&application_code=ALL&channel=app',
            uat: 'https://irp-uat-edge.hkexpress.com/i18n/en/web.json',
            dev: 'https://irp-dev-edge.hkexpress.com/i18n/en/web.json',
            nextdev: 'https://irp-next-dev-edge.hkexpress.com/i18n/en/web.json',
            nextuat: 'https://irp-next-uat-edge.hkexpress.com/i18n/en/web.json'
        },
        order: 1,
        searchAble: false,

    }, {
        id: 'githubquery',
        name: 'Query Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-flt-booking-query-svc',
        packagesId: '2167397',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githuborder',
        name: 'Order Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-order-svc',
        project: {
            dev: 'ibe-pci-dev',
            uat: 'ibe-pci-uat',
            prod: 'ibe-pci-uat',
            nextdev: 'ibe-pci-next-dev',
            nextuat: 'ibe-pci-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubmgmt',
        name: 'Mgmt Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-flt-booking-mgmt-svc',
        packagesId: '2167465',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubauth',
        name: 'Auth Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-auth-svc',
        packagesId: '2167512',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubnotification',
        name: 'Notication Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-notification-svc',
        packagesId: '2164074',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubpayment',
        name: 'Payment Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-payment-svc',
        packagesId: '2167420',
        project: {
            dev: 'ibe-dev',
            uat: 'ibe-pci-uat',
            prod: 'ibe-pci-uat',
            nextdev: 'ibe-pci-next-dev',
            nextuat: 'ibe-pci-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubadmin',
        name: 'Admint Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-admin-svc',
        packagesId: '2146705',
        project: {
            dev: 'ibe-pci-dev',
            uat: 'ibe-pci-uat',
            prod: 'ibe-pci-uat',
            nextdev: 'ibe-pci-next-dev',
            nextuat: 'ibe-pci-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubmember',
        name: 'Member Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-member-svc',
        packagesId: '2167453',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubnonpssint',
        name: 'Non pss int Service',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-non-pss-int-svc',
        packagesId: '2167571',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: true,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubnsklib',
        name: 'Nsk Lib',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-nsk-api',
        packagesId: '2170232',
        order: 1,
        haveApi: true,
        deployable: false,
        searchAble: false,

    }, {
        id: 'githubbaselib',
        name: 'Base Lib',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-base-lib',
        packagesId: '2146780',
        order: 1,
        haveApi: true,
        deployable: false,
        searchAble: false,

    }, {
        id: 'githubdevopsscript',
        name: 'Devops script',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-devops-script',
        order: 1,
        haveApi: false,
        deployable: false,
        searchAble: false,

    }, {
        id: 'githubfrontend',
        name: 'Front end',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-frontend-monorepo',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: false,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubadminportal',
        name: 'Admin portal',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-admin-portal',
        project: {
            dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
        },
        order: 1,
        haveApi: false,
        deployable: true,
        searchAble: false,

    }, {
        id: 'githubnativemobile',
        name: 'Native Mobile',
        icon: 'icons/github.svg',
        category: 'server',
        repositoryName: 'hkexpress-react-native-mobile',
        order: 1,
        haveApi: false,
        deployable: false,
        searchAble: false,

    }, {
        id: 'jira',
        name: 'Jira',
        icon: 'icons/jira.ico',
        category: 'others',
        url: 'icons/jira.ico',
        order: 1,
        searchAble: false,

    }, {
        id: 'sendgrid',
        name: 'Sendgrid',
        icon: 'icons/sendgrid.ico',
        category: 'others',
        url: 'https://app.sendgrid.com/',
        order: 1,
        searchAble: false,

    }, {
        id: 'cognito',
        name: 'Cognito',
        icon: 'icons/cognito.ico',
        category: 'others',
        url: 'https://730335598856.signin.aws.amazon.com/console',
        order: 1,
        searchAble: false,

    }, {
        id: 'trueuptimesheet',
        name: 'TimeSheet',
        icon: 'icons/excel.svg',
        category: 'others',
        url: 'https://ts.accenture.com/:x:/r/sites/HKEAMS/_layouts/15/doc2.aspx?sourcedoc=%7B3CB24B6B-AA0D-42F5-AB5C-585EEC1BF713%7D&file=HKE%20AMS%20-%20Schedule%20Plan.xlsx&action=default&mobileredirect=true%20Sign%20in%20to%20your%20account',
        order: 1,
        searchAble: false,

    }, {
        id: 'figma',
        name: 'Figma',
        icon: 'icons/figma.svg',
        category: 'others',
        url: 'https://www.figma.com/file/XvxmcGKZMaaYAjqqExhT3b/HKE-Collaborate?fuid=1390530896643064924',
        order: 1,
        searchAble: false,

    }, {
        id: 'nskswagger',
        name: 'NskSwagger',
        icon: 'icons/swagger.svg',
        category: 'others',
        url: 'https://dotrezapir4x-akm.test.uo.navitaire.com/swagger/index.html#/token/nsk_v1_token_post',
        order: 1,
        searchAble: false,

    }, {
        id: 'k6',
        name: 'K6',
        icon: 'icons/k6.ico',
        category: 'others',
        url: 'https://app.k6.io/account/login',
        order: 1,
        searchAble: false,

    }, {
        id: 'jimu',
        name: 'Jimu',
        icon: 'icons/jimu.ico',
        category: 'others',
        url: 'https://jimutour.com/submitlogin.do',
        order: 1,
        searchAble: false,

    }, {
        id: 'regextest',
        name: 'Regex',
        icon: 'icons/regex.ico',
        category: 'others',
        url: 'https://www.jyshare.com/front-end/854/',
        order: 1,
        searchAble: false,

    }, {
        id: 'tokendecode',
        name: 'JTW',
        icon: 'icons/jwt.svg',
        category: 'others',
        url: 'https://jwt.io/',
        order: 1,
        searchAble: false,

    },

//         https://irp-nonprod-os.hkexpress.com/_dashboards/app/data-explorer/discover#?
//     _a=(discover:(columns:!(structured.message,structured.level,structured.request_url,structured.request_body),isDirty:!t,sort:!()),
//     metadata:(indexPattern:'1ddac3d0-29f4-11ef-8292-e1b84fc6127c',view:discover))
// &_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1w,to:now))&_q=(filters:!(),query:(language:kuery,query:''))
        {
            id: 'searchbytraceId',
            name: 'search by trace Id',
            category: 'opensearch',
            showColumn: '_a=(discover:(columns:!(kubernetes.container_name,structured.level,structured.message,structured.request_url,structured.request_body),isDirty:!t,sort:!()),',
            queryParam: '&_q=(filters:!(),query:(language:kuery,query:\'$1\'))',
            order: 1,
            searchAble: true,
            usedFilter: false,
            placeholder: 'please enter trace Id'
        }, {
            id: 'searchlogbyorderId',
            name: 'search by orderId',
            category: 'opensearch',
            showColumn: '_a=(discover:(columns:!(kubernetes.container_name,structured.level,structured.message,structured.request_url,structured.request_body),isDirty:!t,sort:!()),',
            queryParam: '&_q=(filters:!(),query:(language:kuery,query:\'$1\'))',
            order: 1,
            searchAble: true,
            usedFilter: false,
            placeholder: 'please enter order Id'
        }, {
            id: 'searchjimupayment',
            name: 'search recent jimu api call',
            category: 'opensearch',
            order: 1,
            searchAble: false,
            usedFilter: true,
            showColumn: '_a=(discover:(columns:!(structured.message,structured.level,structured.request_url,structured.request_body),isDirty:!t,sort:!()),',
            queryParam: 'key:structured.request_url,negate:!f,params:(query:\'https:%2F%2Fapistores.jimutour.com%2Fapiworks%2Fpay%2Fscanqrcode%2Fgateway\'),type:phrase),query:(match_phrase:(structured.request_url:\'https:%2F%2Fapistores.jimutour.com%2Fapiworks%2Fpay%2Fscanqrcode%2Fgateway\')))),query:(language:kuery,query:\'\'))',
            placeholder: '输入搜索关键词'
        },

        {
            id: 'searchrecentcreatepaymentapicall',
            name: 'search recent create payment api call',
            category: 'opensearch',
            showColumn: '_a=(discover:(columns:!(structured.message,structured.request_url,structured.request_body,structured.logging_http_request_header.nsk_token,structured.traceId),isDirty:!t,sort:!()),',
            queryParam: 'key:structured.request_url,negate:!f,params:(query:%2Fexternal%2Fv1%2Fpayment%2Fcreate-payment),type:phrase),query:(match_phrase:(structured.request_url:%2Fexternal%2Fv1%2Fpayment%2Fcreate-payment)))),query:(language:kuery,query:\'\'))',
            order: 1,
            searchAble: false,
            usedFilter: true,
            placeholder: '输入搜索关键词'
        }, {
            id: 'searchadminportallog',
            name: 'search recent admin portal log',
            category: 'opensearch',
            showColumn: '_a=(discover:(columns:!(structured.username,structured.request_method,structured.method_name,structured.request_body),isDirty:!t,sort:!()),',
            queryParam: 'key:structured.request_url,negate:!f,params:(query:%2Fexternal%2Fv1%2Fpayment%2Fcreate-payment),type:phrase),query:(match_phrase:(structured.request_url:%2Fexternal%2Fv1%2Fpayment%2Fcreate-payment)))),query:(language:kuery,query:\'\'))',
            order: 1,
            searchAble: false,
            usedFilter: true,
            placeholder: '输入搜索关键词'
        },
        {
            id: 'searchbooingstatebypnr',
            name: 'search booking state by pnr',
            category: 'opensearch',
            showColumn: '_a=(discover:(columns:!(structured.message,structured.request_url,structured.request_body,structured.response_body),isDirty:!t,sort:!()),',
            queryParam: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fdotrezapir4x-akm.test.uo.navitaire.com%2Fapi%2Fnsk%2Fv1%2Fbooking%2Fretrieve%2FbyRecordLocator%2FO9WLVT'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fdotrezapir4x-akm.test.uo.navitaire.com%2Fapi%2Fnsk%2Fv1%2Fbooking%2Fretrieve%2FbyRecordLocator%2F$1')))),query:(language:kuery,query:\'\'))",
            order: 1,
            searchAble: true,
            usedFilter: true,
            placeholder: 'please enter pnr'
        },
        {
            id: 'searchlongpollingapilog',
            name: 'search long polling api log',
            category: 'opensearch',
            showColumn: '_a=(discover:(columns:!(structured.message,structured.request_url,structured.request_body,structured.response_body),isDirty:!t,sort:!()),',
            queryParam: 'key:structured.request_url,negate:!f,params:(query:\'http:%2F%2Firp-dev-api.hkexpress.com%2Fv1%2Forder%2F$1%2Fpolling-status\'),type:phrase),query:(match_phrase:(structured.request_url:\'http:%2F%2Firp-dev-api.hkexpress.com%2Fv1%2Forder%2F$1%2Fpolling-status\')))),query:(language:kuery,query:\'\'))',
            order: 1,
            searchAble: true,
            usedFilter: true,
            placeholder: 'please enter order Id'
        },


    ];

    let currentEnv = 'dev';
    let currentTime = 'd1';
    let currentSearchWord = '';
    let currentCategory = 'hkexpress';
    let allSites = [];
    let filteredSites = [];

    // 环境名称映射
    const envNames = {
        prod: 'PROD ENV', uat: 'UAT ENV', dev: 'DEV ENV', nextdev: 'NEXT DEV ENV', nextuat: 'NEXT UAT ENV'
    };
    const timeNames = {
        h1: '1 Hour', d1: '1 Day', w1: '1 Week', m1: '1 Month'
    };

    envButton.addEventListener('click', function (e) {
        e.stopPropagation();
        envDropdown.classList.toggle('show');
    });

    timeButton.addEventListener('click', function (e) {
        e.stopPropagation();
        timeDropdown.classList.toggle('show');
    });

    envDropdown.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const env = e.target.getAttribute('data-env');
            setEnvironment(env);
            envDropdown.classList.remove('show');
        }
    });

    timeDropdown.addEventListener('click', function (e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            const time = e.target.getAttribute('data-env');
            setTimeSelector(time);
            timeDropdown.classList.remove('show');
        }
    });

    clearSearch.addEventListener('click', function () {
        searchInput.value = '';
        setSearchWord('');
        filterSites('');
        // 隐藏清除按钮
        clearSearch.classList.add('hidden');
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
            setSelectedTab(currentCategory);
            // 重新渲染网站列表
            filterSites(currentSearchWord)
        });
    });


    const opensearch = {
        baseUrl: {
            dev: 'https://irp-nonprod-os.hkexpress.com/_dashboards/app/data-explorer/discover#?',
            uat: 'https://irp-nonprod-os.hkexpress.com/_dashboards/app/data-explorer/discover#?',
            nextdev: 'https://irp-nonprod-os.hkexpress.com/_dashboards/app/data-explorer/discover#?',
            nextuat: 'https://irp-nonprod-os.hkexpress.com/_dashboards/app/data-explorer/discover#?',
            prod: 'https://irp-prod-os.hkexpress.com/_dashboards/app/data-explorer/discover?security_tenant=hke-prod-rosa#?'
        },
        filterIndex: '&_q=(filters:!((\'$state\':(store:appState),meta:(alias:!n,disabled:!f,index:\'$1\',',
        indexParam: 'metadata:(indexPattern:\'$1\',view:discover))',
        indexPattern: {
            dev: '71d8fc80-2301-11ef-ae1c-751edb730112',
            uat: '1ddac3d0-29f4-11ef-8292-e1b84fc6127c',
            nextdev: 'fb93de40-e377-11ef-9dde-157a1613bce2',
            nextuat: '064376c0-e378-11ef-8062-87353e736baa',
            prod: 'f4f12330-b079-11ef-ad74-6d49bebb7247',
        },
        timeSelector: {
            h1: '&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1h,to:now))',
            d1: '&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1d,to:now))',
            w1: '&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1w,to:now))',
            m1: '&_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-1M,to:now))',
        }
    }
    const argo = {
        baseUrl: 'https://openshift-gitops-server-openshift-gitops.apps.hkerosa-nonprod.o5ys.p1.openshiftapps.com/applications/openshift-gitops/',
        url1: '?view=tree&resource=kind%3ARollout',
    }
    const githubBaseUrl = {
        baseUrl: 'https://github.com/HKExpressAirwaysLimited/',
        mergerParam: '/compare/release...master',
        releaseParam: '/releases/new',
        apiVersionParam: '/packages/'
    }
    const redhatBaseUrl = {
        baseUrl: 'https://console-openshift-console.apps.hkerosa-nonprod.o5ys.p1.openshiftapps.com/k8s/ns/',
        url1: '/deployments/',
        url2: '/pods/',
    }


    function setSearchWord(word) {
        currentSearchWord = word;
        const data = {
            value: word,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('searchWord', JSON.stringify(data));
    }

    function setSelectedTab(tab) {
        const data = {
            value: tab,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('selectedTab', JSON.stringify(data));
    }

    function setEnvironment(env) {
        currentEnv = env;
        currentEnvSpan.textContent = envNames[env];
        const data = {
            value: env,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('selectedEnv', JSON.stringify(data));
        filterSites(currentSearchWord);
    }

    function setTimeSelector(time) {
        currentTime = time;
        currentTimeSpan.textContent = timeNames[time];
        const data = {
            value: time,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('selectedTime', JSON.stringify(data));
        filterSites(currentSearchWord);
    }

    function loadEnvironment() {
        const savedData = localStorage.getItem('selectedEnv');
        if (!savedData){
            currentEnvSpan.textContent = envNames[currentEnv];
            return;
        }
        try {
            const data = JSON.parse(savedData);
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - data.timestamp;
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));

            // 检查是否在有效期内
            if (minutesDiff < CACHE_EXPIRATION_MINUTES) {
                if (data.value && envNames[data.value]) {
                    currentEnv = data.value;
                    currentEnvSpan.textContent = envNames[currentEnv];
                    return;
                }
            }
        } catch (e) {
            console.error('Error parsing saved data:', e);
        }
        localStorage.removeItem('selectedEnv');
        currentEnvSpan.textContent = envNames[currentEnv];

    }

    function loadSelectedTab() {
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
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - data.timestamp;
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));

            // 检查是否在有效期内
            if (minutesDiff < CACHE_EXPIRATION_MINUTES) {
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


    function loadSearchWord() {
        const savedData = localStorage.getItem('searchWord');
        if (!savedData) {
            searchInput.value = currentSearchWord
            clearSearch.classList.add('hidden');
            return;
        }
        try {
            const data = JSON.parse(savedData);
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - data.timestamp;
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));

            // 检查是否在有效期内
            if (minutesDiff < CACHE_EXPIRATION_MINUTES) {
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
        if (!savedData){
            currentTimeSpan.textContent = timeNames[currentTime];
            return;
        }
        try {
            const data = JSON.parse(savedData);
            const tempCurrentTime = new Date().getTime();
            const timeDiff = tempCurrentTime - data.timestamp;
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));

            // 检查是否在有效期内
            if (minutesDiff < CACHE_EXPIRATION_MINUTES) {
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

    loadSelectedTab()
    loadSearchWord()
    loadEnvironment()
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
        // 首先按分类筛选
        filteredSites = sites.filter(site => site.category === currentCategory);

        // 如果有搜索词，进一步筛选
        if (searchTerm) {
            filteredSites = filteredSites.filter(site => site.name.toLowerCase().includes(searchTerm));
        }

        // 渲染网站列表
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
                    rowElement2.className = 'layout-table site-container';
                    rowElement2.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="icons/redhat.ico"></img>
                        <span>RedHat</span>
                    </button>
                `;

                    sitesContainer.appendChild(rowElement2);
                    rowElement2.querySelector('.svc-base').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openServerRelatedSite(siteId, 'redhat');

                    });
                    const rowElement3 = document.createElement('div');
                    rowElement3.className = 'layout-table site-container';
                    rowElement3.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="icons/argo.png"></img>
                        <span>Argo</span>
                    </button>
                `;
                    sitesContainer.appendChild(rowElement3);
                    rowElement3.querySelector('.svc-base').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openServerRelatedSite(siteId, 'argo');

                    });

                }

                if (site.haveApi) {
                    const rowElement4 = document.createElement('div');
                    rowElement4.className = 'layout-table site-container';
                    rowElement4.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>ApiVer</span>
                    </button>
                `;
                    sitesContainer.appendChild(rowElement4);
                    rowElement4.querySelector('.svc-base').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openServerRelatedSite(siteId, 'apiversion');

                    });
                }


                const rowElement5 = document.createElement('div');
                rowElement5.className = 'layout-table site-container';
                rowElement5.innerHTML = `
                    <button class="site-button svc-base"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Repository</span>
                    </button>
                `;

                sitesContainer.appendChild(rowElement5);
                rowElement5.querySelector('.svc-base').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openServerRelatedSite(siteId, 'repository');

                });

                const rowElement6 = document.createElement('div');
                rowElement6.className = 'layout-table site-container';
                rowElement6.innerHTML = `
                    <button class="site-button svc-merge"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Merge</span>
                    </button>
                `;
                sitesContainer.appendChild(rowElement6);
                rowElement6.querySelector('.svc-merge').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openServerRelatedSite(siteId, 'merge');

                });
                const rowElement7 = document.createElement('div');
                rowElement7.className = 'layout-table site-container';
                rowElement7.innerHTML = `
                    <button class="site-button svc-release"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>Release</span>
                    </button>
                `;
                sitesContainer.appendChild(rowElement7);
                rowElement7.querySelector('.svc-release').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openServerRelatedSite(siteId, 'release');

                });

            }


            if (site.category == 'hkexpress') {
                const rowElement = document.createElement('div');
                rowElement.className = 'layout-table site-container';
                rowElement.innerHTML = `
                    <button class="site-button"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>${site.name}</span>
                    </button>
                `;
                sitesContainer.appendChild(rowElement);

                // 添加打开按钮事件
                rowElement.querySelector('.site-button').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openHKExpressSite(siteId);

                });

            }
            if (site.category == 'others') {
                const rowElement = document.createElement('div');
                rowElement.className = 'layout-table site-container';
                rowElement.innerHTML = `
                    <button class="site-button"  data-site-id="${site.id}">
                        <img width="15px" height="15px" src="${site.icon}"></img>
                        <span>${site.name}</span>
                    </button>
                `;
                sitesContainer.appendChild(rowElement);

                // 添加打开按钮事件
                rowElement.querySelector('.site-button').addEventListener('click', function () {
                    const siteId = this.getAttribute('data-site-id');
                    openNormalSite(siteId);

                });

            }

            if (site.category == 'opensearch') {
                const rowElement1 = document.createElement('div');
                rowElement1.className = 'github-svc-div';
                rowElement1.innerHTML = `
                        <p class="github-svc-name"> <span><i class="fas fa-search"></i></i></span> ${site.name}</p>
                `;
                sitesContainer.appendChild(rowElement1);


                if (site.searchAble) {
                    const rowElement5 = document.createElement('div');
                    rowElement5.className = 'layout-grid site-container';
                    rowElement5.innerHTML = `
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
                    sitesContainer.appendChild(rowElement5);
                    rowElement5.querySelector('.opensearch-btn').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openOpensearch(siteId);
                    });
                } else {
                    const rowElement5 = document.createElement('div');
                    rowElement5.className = 'layout-grid site-container';
                    rowElement5.innerHTML = `
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
                    sitesContainer.appendChild(rowElement5);
                    rowElement5.querySelector('.opensearch-btn').addEventListener('click', function () {
                        const siteId = this.getAttribute('data-site-id');
                        openOpensearch(siteId);
                    });
                }


            }

        });

    }

    function openServerRelatedSite(siteId, type) {
        const site = sites.find(s => s.id === siteId);
        if (!site) return;

        // 对参数进行编码
        var fullUrl = ''
        switch (type) {
            case 'redhat':
                fullUrl = redhatBaseUrl.baseUrl + site.project[currentEnv] + redhatBaseUrl.url1 + site.repositoryName + redhatBaseUrl.url2
                break;
            case 'argo':
                fullUrl = argo.baseUrl + site.project[currentEnv] + argo.url1
                break;
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

        // showNotification(`正在打开: ${site.name}`);
    }

    function openHKExpressSite(siteId) {
        const site = sites.find(s => s.id === siteId);
        if (!site) return;
        // 获取当前环境的URL
        const baseUrl = site.baseUrl[currentEnv];
        const fullUrl = baseUrl;
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
        const baseUrl = opensearch.baseUrl[currentEnv];
        const showColumn = site.showColumn;
        const index = opensearch.indexParam.replace('$1', opensearch.indexPattern[currentEnv])
        const time = opensearch.timeSelector[currentTime]
        var filterIndex = ''

        if (site.usedFilter === true) {
            filterIndex = opensearch.filterIndex.replace('$1', opensearch.indexPattern[currentEnv])
        }

        var queryParam = site.queryParam;
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
        }, 3000);
    }
});