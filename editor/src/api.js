

import { domain, user_token } from './conf.js'

const site_url = "https://" + domain;
const headers = {
    Authentication: 'Bearer ' + user_token,
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
        const json = response.json();
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