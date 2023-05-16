

import { domain, user_token, bot_token } from './conf.js'

const site_url = "https://" + domain;
const headers = {
    Authorization: 'Bearer ' + user_token,
    'Content-Type': 'application/json;charset=utf-8',
    
};

export async function createBot(bot_name) {
    const url = site_url + "/api/bots"
    const bot = {
        title: bot_name
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bot),
    });
    if(response.ok) {
        const json = await response.json();
        if(json.ok) {
            return json.data;
        } else {
            console.error("create bor error: " + json.error.message);
            return null;
        }
    } else {
        console.error("create bot error: " + response.status);
        
    }
    return null;
}

export async function setBotToken(id) {
    const url = site_url + "/api/bots/" + id + "/token"
    const token = {
        token: bot_token,
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(token),
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("set bot token error: " + json.error.message);
        } 
    } else {
        console.error("set bot token error: " + response.status);
        
    }
    return null;
}

export async function deleteBotToken(id) {
    const url = site_url + "/api/bots/" + id + "/token"
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("delete bot token error: " + json.error.message);
        } 
    } else {
        console.error("delete bot token error: " + response.status);
        
    }
    return null;
}


export async function startBot(id) {
    const url = site_url + "/api/bots/"+ id + "/start"
    const response = await fetch(url, {
        method: 'PATCH',
        headers: headers,
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("start bot error: " + json.error.message);
        } 
    } else {
        console.error("start bot error: " + response.status);
        
    }
    return null;
}

export async function stopBot(id) {
    const url = site_url + "/api/bots/"+ id + "/stop"
    const response = await fetch(url, {
        method: 'PATCH',
        headers: headers,
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("stop bot error: " + json.error.message);
        } 
    } else {
        console.error("stop bot error: " + response.status);
        
    }
    return null;
}


export async function resetBot(id) {
    const url = site_url + "/api/bots/"+ id + "/wope"
    const response = await fetch(url, {
        method: 'PATCH',
        headers: headers,
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("reset bot error: " + json.error.message);
        } 
    } else {
        console.error("teset bot error: " + response.status);
        
    }
    return null;
}






