
import { generateProcessID } from "../../helpers/generators.js";
/**
 * @typedef IndicatorObject
 * @property {string} id
 * @property {string} [icon]
 * @property {string} message
 * @property {boolean} status
 */

/**
 * @typedef {object} Job
 * @property {string} processID
 * @property {boolean} status
 * @property {Array<IndicatorObject>} messageStack
 */

/**
 * @typedef {" search" | "file" } Modifier
 */
/**
 * @typedef {Array<Modifier>}ModiferList
 */
/**
 * @typedef {object} ChatConfig
 * @property {ModiferList} modifiers
 * @property {string} prompt
 * @property {string} promptRole
 */

//We can que messages also find them if they already exist in the frontend adn then
//change their properties accordingly


function JobManager() {
    this.jobQueue = [];
    /**
     * @param {ChatConfig} chatConfig 
     * @returns {string} processID
     */

    this.queueJob = function (chatConfig) {
        const processID = generateProcessID()
        /**
         * @type {Job}
         */
        const newJob = {
            processID,
            status: false,
            messageStack: [],
        }
        this.jobQueue.push(newJob)
        return newJob.processID;
    }

    /**
     * @param {string} processID 
     * @returns {Job} job
     */
    this.getJob = function (processID) {
        return this.jobQueue.find(job => job.processID === processID);
    }

    /**
    * @param {string} processID 
    */
    this.dequeueJob = function (processID) {
        const job = this.getJob(processID);
        if (job) {
            const jobIndex = this.jobQueue.findIndex()
            this.jobQueue.splice(jobIndex, 1)
        } else {
            console.error(`Error: Could not find job : ${processID}`)
        }

    }
    /**
    * @param {string | Job} jobRef 
    */
    this.clearJobMessageStack = function (jobRef) {
        if (typeof jobRef === 'string') {
            const job = this.getJob(jobRef);
            if (job) {
                job.messageStack = []
            } else {
                console.error(`Error: JobID ${jobRef} is not an existing job`)
                return
            }
        } else {
            try {
                jobRef.messageStack = []
            } catch (e) {
                console.error(`Couldnt not clear the messageStack. Is it a job object?`)
            }
        }


    }

}
export default JobManager
