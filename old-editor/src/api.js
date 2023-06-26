

import { domain, user_token, bot_token } from './conf.js'

const site_url = "https://" + domain;
const headers = {
    Authorization: 'Bearer ' + user_token,
    'Content-Type': 'application/json;charset=utf-8',
    
};

export async function createBot(bot_name) {
    const url = site_url + "/api/bots";
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
    const url = site_url + "/api/bots/" + id + "/token";
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
    const url = site_url + "/api/bots/" + id + "/token";
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
    const url = site_url + "/api/bots/"+ id + "/start";
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
    const url = site_url + "/api/bots/"+ id + "/stop";
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
    const url = site_url + "/api/bots/"+ id + "/wipe";
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

export async function getStartComponent(botId) {
    const url = site_url + "/api/bots/"+ botId + "/components";
    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("add component error: " + json.error.message);
        } else {
            return json.data[0];
        }
    } else {
        console.error("add component error: " + response.status);
        
    }
    return null;
}


export async function addComponent(botId, componentAPIJSON) {
    const url = site_url + "/api/bots/"+ botId + "/components";
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(componentAPIJSON),
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("add component error: " + json.error.message);
        } else {
            return json.data.id;
        }
    } else {
        console.error("add component error: " + response.status);
        
    }
    return null;
}


export async function deleteComponent(botId, compId) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("delete component error: " + json.error.message);
        }
    } else {
        console.error("delete component error: " + response.status);
        
    }
    return null;
}


export async function updateComponent(botId, compId, componentData) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId;
    const body = {
        data: componentData,
    };
    const response = await fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body),
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("update component error: " + json.error.message);
        }
    } else {
        console.error("update component error: " + response.status);
        
    }
    return null;
}


export async function setNextStepForComponent(botId, compId, nextStepId) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId + "/next";
    const body = {
        nextStepId: nextStepId,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("Error: " + json.error.message);
        }
    } else {
        console.error("Error: " + response.status);
        
    }
    return null;
}

export async function deleteNextStepForComponent(botId, compId) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId + "/next";
    
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("Error: " + json.error.message);
        }
    } else {
        console.error("Error: " + response.status);
        
    }
    return null;
}


export async function setNextStepForCommand(botId, compId, commandId, nextStepId) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId + "/commands/" + commandId + "/next";
    
    const body = {
        nextStepId: nextStepId,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("Error: " + json.error.message);
        }
    } else {
        console.error("Error: " + response.status);
        
    }
    return null;
}

export async function deleteNextStepForCommand(botId, compId, commandId) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId + "/commands/" + commandId + "/next";
    
    
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("Error: " + json.error.message);
        }
    } else {
        console.error("Error: " + response.status);
        
    }
    return null;
}


export async function addCommand(botId, compId, type, data) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId + "/commands";
    
    const body = {
        type: type,
        data: data,
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("Error: " + json.error.message);
        } else {
            return json.data.id;
        }
    } else {
        console.error("Error: " + response.status);
        
    }
    return null;
}


export async function deleteCommand(botId, compId, commandId) {
    const url = site_url + "/api/bots/"+ botId + "/components/" + compId + "/commands/" + commandId;
    
    
    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        
    });
    if(response.ok) {
        const json = await response.json();
        if(!json.ok) {
            console.error("Error: " + json.error.message);
        }
    } else {
        console.error("Error: " + response.status);
        
    }
    return null;
}




