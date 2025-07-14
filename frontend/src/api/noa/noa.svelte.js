const NOA_API_URL = "http://localhost:3000";

export async function getNOAHealth() {
    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    }
    let result = await fetch(NOA_API_URL + '/health', options)
    return await result.json()
}

/**
 * @typedef {import('$lib/types/chatConfig').ChatConfig";} ChatConfig
 */

/**
 * 
 * @param {string} prompt Chat message prompt
 * @param {ChatConfig} chatConfig The role executing a prompt
 * @returns 
 */
export async function startChat(chatConfig) {
    const raw = JSON.stringify({
        chatConfig
    })
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: raw,
    }
    const response = await fetch(NOA_API_URL + "/chat", requestOptions);
    if (response.status === 200) {
        return response.json();
    }
    else { return false }
}

/**
 * @description recieves a status update on the ongoing job
 * @param {string} processID 
 * 
 */
export async function getChatProgress(processID) {
    const requestOptions = {
        method: "Get",
        headers: {
            'Content-Type': "application/json",
        }
    }
    const response = await fetch(NOA_API_URL + "/chat/progress/" + processID, requestOptions);
    if (response.status === 200) {
        return response.json();
    }
    else { return false }
}

export async function getChatResult(processID) {
    const requestOptions = {
        method: "Get",
        headers: {
            'Content-Type': "application/json",
        }
    }
    const response = await fetch(NOA_API_URL + "/chat/finished/" + processID, requestOptions);
    if (response.status === 200) {
        return response.json();
    }
    else { return false }
}