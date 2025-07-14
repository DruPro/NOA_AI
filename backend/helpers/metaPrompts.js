import { fetchHuddleLLM } from "../api/huddle/huddleApi.js"


/**
 * @typedef {{import('../types/scraper.svelte.js').WebPageData}} WebPageData
 */

/**
 * 
 * @param {*} metaPromptName 
 * @param  {...any} args 
 * @returns 
 */

export function generateMetaPrompt(metaPromptName, ...args) {
    const metaPrompts = {
        summarize: (webdata) => {
            const meta = `You are a high-performance summarization and reasoning engine. Your task is to process the full content of a webpage, extract key information into condensed, semantically-rich compound units, and prepare this structured data to support accurate and efficient responses to user queries.

1. Read and understand the full text of the webpage provided.
2. Identify and extract key ideas, facts, arguments, or themes. Focus on clarity, salience, and relevance.
3. Condense this information into compact compound units such as:
   - Bulleted key points
   - Thematic summaries
   - Labeled sections (e.g., [Problem], [Solution], [Data], [Conclusion])
   - Timestamped highlights (if applicable)
4. Avoid redundancy. Each unit should be self-contained and semantically meaningful.
5. These units should serve as a knowledge base to answer future user prompts without re-reading the full text.

After this structured summary, remain ready to answer follow-up questions from the user based on this processed content alone.
Webpage
"""
${webdata}
"""
`
            return meta
        },
        needSearch: (userPrompt) => {
            const meta = `
        You are a helpful assistant that determines whether a prompt requires up-to-date or external web-based research.

        Given the following user input, answer with one of the following:
        - "NO_SEARCH" — if the prompt can be answered using general knowledge or reasoning alone.
        - "SEARCH" — if the prompt likely requires current information, specific data, or context that is typically only found online.

        Only respond with one of the two values. Do not explain your reasoning.

        Prompt:
        """
        ${userPrompt}
        """
        `
            return meta
        },
        searchQuerries: (userPrompt) => {
            const meta = `
            You are an assistant that determines relevant web search queries based on a user's input.
Analyze the user's prompt and determine what information would require current, web-based knowledge.
Then, return only a raw JavaScript JSON array of concise, high-quality search queries. 

DO NOT include any explanation, markdown formatting, or wrapping syntax like triple backticks or quotes.

User Prompt:
"""
${userPrompt}
"""`;
            return meta
        },
        /**
         * 
         * @param {string} userPrompt 
         * @param {Array<WebPageData>} webPageData 
         */
        analyzeSearchData: (userPrompt, webPageData) => {
            let webPageDataText = ''
            for (let webPage of webPageData) {
                webPageDataText += `- Link: ${webPage.link}
                                    - Raw Extracted Data: ${webPage.data}`
            }
            let meta = `You are an intelligent assistant that analyzes and interprets website content to help users make informed decisions, extract summaries, or answer questions.
s
The website content has been extracted and provided in simplified form. It includes headings and text content from the page (e.g., h1, h2, h3, etc.), all concatenated into a single string for efficiency.

Here is the website data:
"""
${webPageDataText}
"""

Your task:
1. Analyze the data as if you're scanning the page yourself.
2. Use that content to respond to the user prompt.
3. Respond in clear, clean **Markdown format** with helpful structure (e.g., ##, -, >, code blocks, etc.).
4. Add a little bit of *flair* — personality, commentary, or style — **but keep it relevant and respectful**.
5. Be brief if the data is limited, but never vague.

User Prompt: 
"""
${userPrompt}
"""
`
            return meta
        }
    }

    if (metaPrompts.hasOwnProperty(metaPromptName)) {
        return metaPrompts[metaPromptName](...args)
    }
    else {
        console.error(`Error: Meta prompt ${metaPromptName} does not have a handler`)
    }
}


