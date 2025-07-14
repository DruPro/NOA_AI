import ThinkingImage from '$lib/icons/ai/network_intelligence_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';
import { getChatProgress, startChat } from "../api/noa/noa.svelte";
/**
 * @typedef {"chatInit" | "chatListen" | "chatFinish"} ChatStateName
 */

/**
 * @typedef {import('$lib/types/api.svelte'.DisplayUpdate)} DisplayUpdate
 */

/**
 * @typedef {import('$lib/types/api.svelte'.Job)} Job
 */


/**
 * @typedef {Object.<ChatStateName, StateBehavior>} ChatListenerStates
 */

/**
 * @callback StateBehavior
 * @param {...*} args
 * @returns {void}
 */


/**
 * @description Chat listener is a statefull networking manager
 */
export function useChatListener() {
    const chatListenerConfig = {
        currentState: 'chatInit',
        isListening: false,
        currentProcessID: "",
    }
    /**
     * @type {ChatListenerStates}
     */
    const chatListenerStates = {
        //Initate chat or conversation,
        "chatInit": async function (chatConfigManager, indicatorManager) {
            chatConfigManager.config.isListening = true;
            const result = await startChat(chatConfigManager.config)
            if (result) {
                chatListenerConfig.currentProcessID = result.processID;
                indicatorManager.displayIndicator({
                    id: "initMessage",
                    icon: ThinkingImage,
                    message: `Job id : ${result.processID}`,
                    status: true
                })
                console.log(result)
                transition('chatListen');
                exec(chatConfigManager, indicatorManager)
            } else {
                console.error("Error: chatInit - Server side error")
            }
        },
        // wait until job status is true meanwhile listen to messages on a queue
        "chatListen": async function (chatConfigManager, indicatorManager) {
            const checkProgressInterval = setInterval(async () => {

                /**
                 * @type {Job}
                 */
                let result = await getChatProgress(chatListenerConfig.currentProcessID)
                if (result) {
                    console.log(result)
                    if (result.messageStack.length >= 1){
                        for (let message of result.messageStack){
                            setTimeout(()=>{
                                indicatorManager.updateDisplay(message);
                            },1000)
                        }
                    }
                    //Job status not https status
                    if(result.status == true){
                        clearInterval(checkProgressInterval)
                        transition('chatFinish')
                        exec()
                    }
                }
                else {
                    
                }
            }, 2000)
        },
        "chatFinish": function () {
                
        }
    }
    /**
     * Transition to a new state / behavior
     * @param {ChatStateName} state 
     */
    function transition(state) {
        if (chatListenerStates.hasOwnProperty(state)) {
            chatListenerConfig.currentState = state;
        }
        else {
            throw new Error(`Error: ${state} is not a valid state`)
        }
    }
    /**
     * @description Execute current state behavior
 *   * @param {...*} args - Arguments to pass to the current state's behavior
     */
    function exec(...args) {
        let currentState = getCurrentState();
        chatListenerStates[currentState](...args)
    }

    /**
     * @description Returns the current state 
     * @returns {string} CurrentState
     */
    function getCurrentState() {
        return chatListenerConfig.currentState
    }

    /**
     * @description Returns true if currently listening to fetch request
     * @returns {boolean}
     */
    function isListening() {
        return chatListenerConfig.isListening
    }

    return { transition, exec, getCurrentState, isListening }
}

export default useChatListener