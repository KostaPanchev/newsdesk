import DBConfig from './db-config';

const catchErr = (error, text) => ({
    data: false,
    errors: [
        {
            Datetime: '',
            Description: `[${text}] - ${error}`
        }
    ]
});

export const getUser = async uuid => {
    const post = {
        uuid,
        json: true
    };
    try {
        const response = await fetch(`${DBConfig.APIUrl}/user/`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getUser');
    }
};


export const updateUserSettings = async (post) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/user/update`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, updateUserSettings');
    }
};


export const getWorkbenches = async () => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/workbenches/`);
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getWorkbenches');
    }
};

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/categories/`);
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getAllCategories');
    }
};

export const getFilteredCategories = async (workbenchId) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/workbenches/${workbenchId}/categories`);
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getFilteredCategories');
    }
};

export const getPostOptions = async () => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/posts/options`);
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getPostOptions');
    }
};


// ========== posts ==============


export const getAllPosts = async (date, uuid) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/posts?date=${date}&uuid=${uuid}`);
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getAllPosts');
    }
};

export const getFilteredPosts = async (date, uuid, categories) => {
    let data = {
        uuid,
        date,
        categories,
        json: true
    };

    try {
        const response = await fetch(`${DBConfig.APIUrl}/posts`, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getFilteredPosts');
    }
};

export const getPostsByWorkbench = async ({id, date, uuid}) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/workbenches/${id}/posts/?date=${date}&uuid=${uuid}`);
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getPostsByWorkbench');
    }
};

export const getPostsByCategory = async ({id, date, uuid, interval}) =>{
    try {
        const response = await fetch(`${DBConfig.APIUrl}/categories/${id}/posts/?date=${date}&uuid=${uuid}&interval=${interval}`);
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getPostsByCategory');
    }
};

export const createPost = async (post) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/posts/create`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, createPost');
    }
};

export const updatePost = async (post) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/posts/update`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, updatePost');
    }
};

export const deletePost = async (post) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/posts/delete`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, deletePost');
    }
};

export const updatePostNote = async (post) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/posts/note/update`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, updatePostNote');
    }
};


// ========== daily reports ===============

export const getDailyReports = async (props) => {
    let post = Object.assign(props, {json: true});
    try {
        const response = await fetch(`${DBConfig.APIUrl}/daily-reports/get`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getDailyReports');
    }
};

export const updateDailyReport = async (post) => {
    try {
        const response = await fetch(`${DBConfig.APIUrl}/daily-reports/update`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, updateDailyReport');
    }
};

export const triggerLock = async (post) => {
    // console.log('triggerLock', post);
    try {
        const response = await fetch(`${DBConfig.APIUrl}/daily-reports/locked`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, triggerLock');
    }
};



// ======= Push Messages =================

export async function getPushMessages(props){
    try {
        const response = await fetch(`${DBConfig.pushAPIUrl}/messages/get`, {
            method: 'POST',
            body: JSON.stringify(props)
            // mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, getPushMessages err');
    }
};

export async function updatePushMessage(post) {
    try {
        const response = await fetch(`${DBConfig.pushAPIUrl}/messages/update`, {
            method: 'POST',
            body: JSON.stringify(post),
            mode: 'cors'
        });
        return await response.json();
    }
    catch (error) {
        return catchErr(error, 'db-api.js, updatePushMessage');
    }
};

