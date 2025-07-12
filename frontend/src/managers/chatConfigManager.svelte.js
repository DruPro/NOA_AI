
/**
 * @typedef {import('$lib/types/chatConfig').ChatConfig;} ChatConfig
 */

export function useChatConfigManager() {
    /**
     * @type {ChatConfig}
     */
    let config = {
        prompt: "",
        promptRole: "",
        modifiers: [],
    }

    /**
     * @param {Modifier} modifierName 
     */
    function toggleModifier(modifierName) {
        let mod = config.modifiers.find((modifier) => modifier === modifierName);
        if (mod) {
            let modIndex = config.modifiers.indexOf(mod);
            config.modifiers.splice(modIndex, 1);
        } else {
            config.modifiers.push(modifierName)
        }
    }

    /**
     * 
     * @param {string} prompt 
     */
    function setPrompt(prompt){
        config.prompt = prompt
    }
    /**
 * 
 * @param {string} promptRole 
 */
    function setPromptRole(promptRole) {
        config.promptRole = promptRole
    }
    return { config, toggleModifier, setPrompt, setPromptRole }
}

export default useChatConfigManager