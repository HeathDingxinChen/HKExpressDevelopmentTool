const iconModules = import.meta.glob(
    '@/assets/icons/*.{svg,png,jpg,ico}',
    { eager: true }
);

export const icons = {};
for (const path in iconModules) {
    const fileName = path.split('/').pop().split('.')[0];
    icons[fileName] = iconModules[path].default;
}

export const openSearchUrl = {
    env: {
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
export const argoUrl = {
    baseUrl: 'https://openshift-gitops-server-openshift-gitops.apps.hkerosa-nonprod.o5ys.p1.openshiftapps.com/applications/openshift-gitops/',
    url1: '?view=tree&resource=kind%3ARollout',
}
export const githubUrl = {
    baseUrl: 'https://github.com/HKExpressAirwaysLimited/',
    mergerParam: '/compare/release...master',
    releaseParam: '/releases/new',
    apiVersionParam: '/packages/'
}
export const redhatUrl = {
    baseUrl: 'https://console-openshift-console.apps.hkerosa-nonprod.o5ys.p1.openshiftapps.com/k8s/ns/',
    url1: '/deployments/',
    url2: '/pods/',
}

export const envNames = {
    prod: 'PROD ENV', uat: 'UAT ENV', dev: 'DEV ENV', nextdev: 'NEXT DEV ENV', nextuat: 'NEXT UAT ENV'
};
export const timeNames = {
    h1: '1 Hour', d1: '1 Day', w1: '1 Week', m1: '1 Month'
};
export const sites = [{
    id: 'hkexpress',
    name: 'HKExpress',
    icon: icons.hke_little,
    category: 'hkexpress',
    env: {
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
    icon: icons.hke_little,
    category: 'hkexpress',
    env: {
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
    icon: icons.hke_little,
    category: 'hkexpress',
    env: {
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
    icon: icons.hke_little,
    category: 'hkexpress',
    env: {
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
    icon: icons.sitecore,
    category: 'hkexpress',
    env: {
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
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-flt-booking-query-svc',
    packagesId: '2167397',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: true,
    deployable: true,
    searchAble: false,

}, {
    id: 'githuborder',
    name: 'Order Service',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-order-svc',
    env: {
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
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-flt-booking-mgmt-svc',
    packagesId: '2167465',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: true,
    deployable: true,
    searchAble: false,

}, {
    id: 'githubauth',
    name: 'Auth Service',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-auth-svc',
    packagesId: '2167512',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: true,
    deployable: true,
    searchAble: false,

}, {
    id: 'githubnotification',
    name: 'Notication Service',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-notification-svc',
    packagesId: '2164074',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: true,
    deployable: true,
    searchAble: false,

}, {
    id: 'githubpayment',
    name: 'Payment Service',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-payment-svc',
    packagesId: '2167420',
    env: {
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
    id: 'githubadmin',
    name: 'Admint Service',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-admin-svc',
    packagesId: '2146705',
    env: {
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
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-member-svc',
    packagesId: '2167453',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: true,
    deployable: true,
    searchAble: false,

}, {
    id: 'githubnonpssint',
    name: 'Non pss int Service',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-non-pss-int-svc',
    packagesId: '2167571',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: true,
    deployable: true,
    searchAble: false,

}, {
    id: 'githubnsklib',
    name: 'Nsk Lib',
    icon: icons.github,
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
    icon: icons.github,
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
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-devops-script',
    order: 1,
    haveApi: false,
    deployable: false,
    searchAble: false,

}, {
    id: 'githubfrontend',
    name: 'Front end',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-frontend-monorepo',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: false,
    deployable: true,
    searchAble: false,

}, {
    id: 'githubadminportal',
    name: 'Admin portal',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-admin-portal',
    env: {
        dev: 'ibe-dev', uat: 'ibe-uat', prod: 'ibe-uat', nextdev: 'ibe-next-dev', nextuat: 'ibe-next-uat',
    },
    order: 1,
    haveApi: false,
    deployable: true,
    searchAble: false,

}, {
    id: 'githubnativemobile',
    name: 'Native Mobile',
    icon: icons.github,
    category: 'server',
    repositoryName: 'hkexpress-react-native-mobile',
    order: 1,
    haveApi: false,
    deployable: false,
    searchAble: false,

}, {
    id: 'jira',
    name: 'Jira',
    icon: icons.jira,
    category: 'others',
    url: icons.jira,
    order: 1,
    searchAble: false,

}, {
    id: 'sendgrid',
    name: 'Sendgrid',
    icon: icons.sendgrid,
    category: 'others',
    url: 'https://app.sendgrid.com/',
    order: 1,
    searchAble: false,

}, {
    id: 'cognito',
    name: 'Cognito',
    icon: icons.cognito,
    category: 'others',
    url: 'https://730335598856.signin.aws.amazon.com/console',
    order: 1,
    searchAble: false,

}, {
    id: 'trueuptimesheet',
    name: 'TimeSheet',
    icon: icons.excel,
    category: 'others',
    url: 'https://ts.accenture.com/:x:/r/sites/HKEAMS/_layouts/15/doc2.aspx?sourcedoc=%7B3CB24B6B-AA0D-42F5-AB5C-585EEC1BF713%7D&file=HKE%20AMS%20-%20Schedule%20Plan.xlsx&action=default&mobileredirect=true%20Sign%20in%20to%20your%20account',
    order: 1,
    searchAble: false,

}, {
    id: 'figma',
    name: 'Figma',
    icon: icons.figma,
    category: 'others',
    url: 'https://www.figma.com/file/XvxmcGKZMaaYAjqqExhT3b/HKE-Collaborate?fuid=1390530896643064924',
    order: 1,
    searchAble: false,

}, {
    id: 'nskswagger',
    name: 'NskSwagger',
    icon: icons.swagger,
    category: 'others',
    url: 'https://dotrezapir4x-akm.test.uo.navitaire.com/swagger/index.html#/token/nsk_v1_token_post',
    order: 1,
    searchAble: false,

}, {
    id: 'k6',
    name: 'K6',
    icon: icons.k6,
    category: 'others',
    url: 'https://app.k6.io/account/login',
    order: 1,
    searchAble: false,

}, {
    id: 'jimu',
    name: 'Jimu',
    icon: icons.jimu,
    category: 'others',
    url: 'https://jimutour.com/submitlogin.do',
    order: 1,
    searchAble: false,

}, {
    id: 'regextest',
    name: 'Regex',
    icon: icons.regex,
    category: 'others',
    url: 'https://www.jyshare.com/front-end/854/',
    order: 1,
    searchAble: false,

}, {
    id: 'tokendecode',
    name: 'JTW',
    icon: icons.jwt,
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
        id: 'searchcreatepaymentbyorderId',
        name: 'search create payment by orderId',
        category: 'opensearch',
        showColumn: '_a=(discover:(columns:!(kubernetes.container_name,structured.level,structured.message,structured.request_url,structured.request_body,structured.response_body,structured.traceId),isDirty:!t,sort:!()),',
        queryParam: '&_q=(filters:!((\'$state\':(store:appState),meta:(alias:!n,disabled:!f,index:f4f12330-b079-11ef-ad74-6d49bebb7247,key:structured.request_url,negate:!f,params:(query:\'v1%2Fpayment%2Fcreate-payment\'),type:phrase),query:(match_phrase:(structured.request_url:\'v1%2Fpayment%2Fcreate-payment\')))),query:(language:kuery,query:\'$1\'))',
        order: 1,
        searchAble: true,
        usedFilter: false,
        placeholder: 'please enter order Id'
    }, {
        id: 'searchpnrbyorderId',
        name: 'search PNR by orderId',
        category: 'opensearch',
        showColumn: '_a=(discover:(columns:!(kubernetes.container_name,structured.level,structured.message,structured.request_url,structured.request_body,structured.response_body),isDirty:!t,sort:!()),',
        queryParam: '&_q=(filters:!((\'$state\':(store:appState),meta:(alias:!n,disabled:!f,index:f4f12330-b079-11ef-ad74-6d49bebb7247,key:structured.request_url,negate:!f,params:(query:internal%2Fv1%2Fbooking),type:phrase),query:(match_phrase:(structured.request_url:internal%2Fv1%2Fbooking)))),query:(language:kuery,query:\'$1\'))',
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
        queryParam: "key:structured.message,negate:!f,params:(query:'%5BAdmin%20Access%20Log%5D'),type:phrase),query:(match_phrase:(structured.message:'%5BAdmin%20Access%20Log%5D')))),query:(language:kuery,query:''))",
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
        queryParam: "key:structured.request_url,negate:!f,params:(query:'   v1%2Fbooking%2Fretrieve%2FbyRecordLocator%2FO9WLVT'),type:phrase),query:(match_phrase:(structured.request_url:'v1%2Fbooking%2Fretrieve%2FbyRecordLocator%2F$1')))),query:(language:kuery,query:\'\'))",
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
        queryParam: 'key:structured.request_url,negate:!f,params:(query:v1%2Forder%2F$1%2Fpolling-status),type:phrase),query:(match_phrase:(structured.request_url:\'v1%2Forder%2F$1%2Fpolling-status\')))),query:(language:kuery,query:\'\'))',
        order: 1,
        searchAble: true,
        usedFilter: true,
        placeholder: 'please enter order Id'
    },
    {
        id: 'insurancepricinglog',
        name: 'search insurance pricing log',
        category: 'opensearch',
        showColumn: '_a=(discover:(columns:!(kubernetes.container_name,structured.level,structured.message,structured.request_url,structured.request_body),isDirty:!t,sort:!()),',
        envQueryParam:{
            dev: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing')))),query:(language:kuery,query:''))",
            uat: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing')))),query:(language:kuery,query:''))",
            prod: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing')))),query:(language:kuery,query:''))",
            nextdev: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing')))),query:(language:kuery,query:''))",
            nextuat: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpricing')))),query:(language:kuery,query:''))"
        },
        order: 1,
        searchAble: false,
        usedFilter: true,
        placeholder: 'please enter order Id'
    },

    {
        id: 'insurancepurchaselog',
        name: 'search insurance purchase log',
        category: 'opensearch',
        showColumn: '_a=(discover:(columns:!(kubernetes.container_name,structured.level,structured.message,structured.request_url,structured.request_body),isDirty:!t,sort:!()),',
        envQueryParam:{
            dev: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase')))),query:(language:kuery,query:''))",
            uat: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase')))),query:(language:kuery,query:''))",
            prod: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase')))),query:(language:kuery,query:''))",
            nextdev: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase')))),query:(language:kuery,query:''))",
            nextuat: "key:structured.request_url,negate:!f,params:(query:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase'),type:phrase),query:(match_phrase:(structured.request_url:'https:%2F%2Fprod-eu.api.ancileo.com%2Fv1%2Ftravel%2Ffront%2Fpurchase')))),query:(language:kuery,query:''))",
           },
        order: 1,
        searchAble: false,
        usedFilter: true,
        placeholder: 'please enter order Id'
    },
];