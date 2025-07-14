import { exec } from 'child_process';
import { promisify } from 'util';
import pLimit from 'p-limit';

const execPromise = promisify(exec);
import { fetchHuddleLLM } from "../../api/huddle/huddleApi.js"
import { generateMetaPrompt } from "../../helpers/metaPrompts.js"
import { fetchSearchResults } from "../../api/brave/searchAPI.js"
import JobProgressManager from './jobProgressManager.js';

/**
 * @param {JobProgressManager} jobProgressManager 
 */
function PromptBuilder(jobProgressManager) {
    this.jobProgressManager = jobProgressManager
    /**
     * @param {ChatConfig} chatConfig 
     * @returns {PromptSettings} promptSettings
     */
    this.getPromptSettings = async function (chatConfig) {
        const promptSettings = {
            needsSearch: await needsSearch(chatConfig),
            chatConfig,
        }
        return promptSettings
    }
    /**
     * 
     * @param {PromptSettings} promptSettings 
     */
    this.generatePrompt = async function (processID, promptSettings) {
        if (promptSettings.needsSearch === true) {
            const userPrompt = promptSettings.chatConfig.prompt;
            /**
             * @type {Array<string>}
             */
            this.jobProgressManager.pushToMessageStack(processID, {
                updateType: 'display',
                indicator: {
                    id: "searching",
                    icon: "https://cdn-icons-png.flaticon.com/512/11493/11493785.png",
                    status: true
                }
            })
            const searchQuerries = await getSearchQuerries(userPrompt);
            this.jobProgressManager.pushToMessageStack(processID, {
                updateType: 'display',
                indicator: {
                    id: "searching",
                    icon: "https://cdn-icons-png.flaticon.com/512/11493/11493785.png",
                    status: false
                }
            })
            /**
             * @type {Array<WebLinks>}
             */

            const searchLinks = await getLinks(searchQuerries);

            const scrapedWebPages = await summarizeWebPageData(await scrapeWebPages(processID,searchLinks))

            const metaPrompt = generateMetaPrompt('analyzeSearchData', userPrompt, scrapedWebPages)
            const searchSummary = (await fetchHuddleLLM(metaPrompt, "system"));
            return searchSummary.choices[0].message.content
        }
    }

    /**
     * @param {ChatConfig} chatConfig 
     */
    async function needsSearch(chatConfig) {
        if (chatConfig.modifiers.find(modifier => modifier === 'search')) {
            const metaPrompt = generateMetaPrompt('needSearch', chatConfig.prompt);
            const needSearchConfirmation = await fetchHuddleLLM(metaPrompt, 'system');
            return needSearchConfirmation.choices[0].message.content === 'SEARCH' ? true : false
        }
        else {
            return false
        }
    }

    /**
     * 
     * @param {string} userPrompt 
     */
    async function getSearchQuerries(userPrompt) {
        const metaPrompt = generateMetaPrompt('searchQuerries', userPrompt)
        /**
         * @type {Array<string>}
         */
        const searchQuerries = JSON.parse((await fetchHuddleLLM(metaPrompt, 'system')).choices[0].message.content);
        return searchQuerries;
    }

    /**
     * @typedef {object} WebLinks
     * @property {string} link
     * @property {string} icon
     */

    /**
     * @typedef {'news' | 'web' | 'video'} linkTypes
     */

    /**
     * @typedef {Object} GetLinksOptions
     * @property {Array<linkTypes>} linkTypes
     */

    /**
     * @param {Array<string>} searchQuerries 
     * @param {GetLinksOptions} [options]
     * @returns {Array<WebLinks>} links
     */
    async function getLinks(searchQuerries, options) {
        const links = []
        for (let querry of searchQuerries) {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1200)
            let braveSearchResults = await fetchSearchResults({ q: querry, count: 1 });
            for (let result of braveSearchResults['web'].results) {
                links.push({ link: result.url, icon: result.meta_url.favicon })
            }
        }
        return links;
    }

    /***
     * @typedef {object} WebPageData
     * @property {string} link
     * @property {string} data
     */

    /**
     * @param {Array<WebLinks>} WebLinks 
     * @returns {Array<WebPageData>} webPageData
     */
    async function scrapeWebPages(processID,WebLinks) {
        const limit = pLimit(5); // Adjust concurrency here

        const tasks = WebLinks.map(obj =>
            limit(async () => {
                console.log(`Scraping: ${obj.link}`);
                jobProgressManager.pushToMessageStack(processID,{
                    updateType: 'display',
                    indicator : 
                    {
                        id: obj.link,
                        icon: obj.icon,
                        message : `Searching ${obj.link}`,
                        status : true,
                    }
                })
                const command = `scrapy crawl quotes --nolog -a url="${obj.link}"`;
                try {
                    const { stdout } = await execPromise(command, { cwd: './python/tutorial' });
                    jobProgressManager.pushToMessageStack(processID,{
                        updateType: 'display',
                        indicator : 
                        {
                            id: obj.link,
                            icon: obj.icon,
                            message : `Searching ${obj.link}`,
                            status : false,
                        }
                    })               
                    return { link: obj.link, data: stdout };
                } catch (error) {
                    console.error(`Error scraping ${obj.link}:`, error);
                    return { link: obj.link, data: '' };
                }
            })
        );

        const webPageData = await Promise.all(tasks);
        return webPageData;
    }

    /**
     * 
     * @param {Array<WebPageData>} webPageData 
     * @returns {Array<WebPageData} webPageData
     */
    async function summarizeWebPageData(webPageData) {
        let summarizedWebPageData = [];
        for (let webPage of webPageData) {
            let summarizedData = (await fetchHuddleLLM(generateMetaPrompt('summarize', webPage.data), 'system')).choices[0].message.content;
            console.log(summarizedData)

            summarizedWebPageData.push({ link: webPage.link, data: summarizedData })
        }
        return summarizedWebPageData;
    }
}



export default PromptBuilder