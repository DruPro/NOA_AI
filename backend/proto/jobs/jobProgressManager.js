
import { generateProcessID } from "../../helpers/generators.js";


/**
 * @typedef {Object} DisplayUpdate
 * @property {'display' | 'status' } updateType
 * @property {IndicatorObject} indicator 
 */

/**
 * @typedef {object} FinishedJob
 * @property {string} processID
 * @property {string} result
 */

/**
 * @typedef {object} Job
 * @property {string} processID
 * @property {boolean} status
 * @property {Array<DisplayUpdate>} messageStack
 */


/**
 * @typedef IndicatorObject
 * @property {string} id
 * @property {string} [icon]
 * @property {string} message
 * @property {boolean} status
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


function JobProgressManager() {
    /**
     * @type {Array<Job>}
     */
    this.jobQueue = [];
    /**
     * @type {Array<FinishedJob>}
     */
    this.finishedJobs = [];
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
     * @param {FinishedJob} finishedJob 
     * @returns {FinishedJob}
     */
    this.addFinishedJob = function (processID, finishedJob) {
        if (!this.getFinishedJob(processID)) {
            this.finishedJobs.push(finishedJob)
        }
        else {
            console.error(`${processID} is already a finished job`)
        }
        return this.getFinishedJob(processID);
    }

    /**
     * @description retrieve job from queue
     * @param {string} processID 
     * @returns {Job} job
     */
    this.getJob = function (processID) {
        return this.jobQueue.find(job => job.processID === processID);
    }
    this.getFinishedJob = function (processID) {
        return this.finishedJobs.find(job => job.processID === processID);
    }

    /**
    * @param {string} processID 
    */
    this.dequeueJob = function (processID) {
        const job = this.getJob(processID);
        if (job) {
            const jobIndex = this.jobQueue.findIndex(j => j.processID === processID)
            this.jobQueue.splice(jobIndex, 1)
        } else {
            console.error(`Error: Could not find job : ${processID}`)
        }
    }

    /**
    * @param {string} processID 
    */
    this.removeFinishedJob = function (processID) {
        console.log("Removing Finished Jobs:")
        console.log(processID)
        const job = this.getFinishedJob(processID);
        console.log(job)
        console.log(this.finishedJobs)
        if (job) {
            const jobIndex = this.finishedJobs.findIndex(j => j.processID === processID);
            this.finishedJobs.splice(jobIndex, 1)
        } else {
            console.error(`Error: Could not find job : ${processID}`)
        }
    }

    /**
    * @param {string | Job} jobRef The processID or queded job object reference
    * @param {DisplayUpdate} displayUpdate
    */
    this.pushToMessageStack = function (jobRef, displayUpdate) {
        if (typeof jobRef === 'string') {
            const job = this.getJob(jobRef);
            if (job) {
                job.messageStack.push(displayUpdate)
            } else {
                console.error(`Error: JobID ${jobRef} is not an existing job`)
                return
            }
        } else {
            try {
                jobRef.messageStack.push(displayUpdate);
            } catch (e) {
                console.error(`Couldnt not clear the messageStack. Is it a job object?`)
            }
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
export default JobProgressManager
