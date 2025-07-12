import 'dotenv/config'
const chatBotURL = "https://huddleai-apim.azure-api.net/language/hl/v1/chat/completions";
const HUDDLE_LLM_API_KEY = process.env.HUDDLE_LLM_API_KEY;

/**
 * 
 * @param {string} prompt Chat message prompt
 * @param {string} promptRole The role executing a prompt
 * @returns 
 */
export async function fetchHuddleLLM(prompt, promptRole) {
    let llmRequestHeaders = new Headers();
    llmRequestHeaders.append("Content-type", "application/json");
    llmRequestHeaders.append("Ocp-Apim-Subscription-Key", HUDDLE_LLM_API_KEY);
    const raw = JSON.stringify({
        messages: [{
            role: promptRole,
            content: prompt,
        }]
    })
    const requestOptions = {
        method: "POST",
        headers: llmRequestHeaders,
        body: raw,
    }
    const response = await fetch(chatBotURL, requestOptions);
    return response.json();
}