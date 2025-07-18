export let currentEnv = 'dev';
export let currentTime = 'd1';
export let currentSearchWord = '';
export let currentCategory = 'hkexpress';
export let allSites = [];
export let filteredSites = [];


export const envNames = {
    prod: 'PROD ENV', uat: 'UAT ENV', dev: 'DEV ENV', nextdev: 'NEXT DEV ENV', nextuat: 'NEXT UAT ENV'
};
export const timeNames = {
    h1: '1 Hour', d1: '1 Day', w1: '1 Week', m1: '1 Month'
};