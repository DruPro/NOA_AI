import jobProgressManager from "./jobProgressManager.js";
import PromptBuilder from "./promptBuilder.js";

/**
 * @typedef {import('../../types/chatConfig.svelte.js'.ChatConfig)} ChatConfig
 */

/**
 * @param {jobProgressManager} jobProgressManager 
 */
function JobDispatcher(jobProgressManager) {
    this.jobProgressManager = jobProgressManager;
    this.promptBuilder = new PromptBuilder(jobProgressManager)
    /**
     * 
     * @param {string} processID 
     * @param {ChatConfig} chatConfig 
     */
    this.startJob = async function (processID, chatConfig) {
        const promptSettings = await this.promptBuilder.getPromptSettings(chatConfig);
        const prompt = await this.promptBuilder.generatePrompt(processID, promptSettings);
        jobProgressManager.addFinishedJob(processID,
            {
                processID,
                result: prompt,
            })
        const jobInQueue = jobProgressManager.getJob(processID);
        jobInQueue.status = true;
    }


}

/**
 * @param {ChatConfig} chatConfig 
 */
function retrieveMetaPrompts(chatConfig) {

}







export default JobDispatcher