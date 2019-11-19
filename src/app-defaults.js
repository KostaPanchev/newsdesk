let API = 'https://your-api-url.dk';

if(document.getElementById('api')){
    API = document.getElementById('api').value;
}
export const APIRoot = API;



export const basename = '/newsdesk/';
// export const basename = '/';
// export const basename = '/newsdesk-test/';
// export const basename = 'jourbox_old/newsdesk/';


// =============== app defaults ===============================

export const maxPriority = 9;
export const maxCategoriesWarn = 10;

export const postsFetchingInterval = 1000 * 60 * 2;
export const dailyReportsFetchingInterval = 1000 * 10;
export const pushMessagesInterval = 1000 * 60 * 10;

// sections

export const postsSectionName = 'Publikationsplan';
export const dailyReportsSectionName = 'Overleveringer';
export const pushMessagesSectionName = 'Push Beskeder';

// in package.json
// "homepage": "https://jourbox.dk/assets/newsdesk/react/"