/**
 * @typedef {Object} DisplayUpdate
 * @property {'display'} updateType
 * @property {IndicatorObject} indicator 
 */

/**
 * @typedef {object} Job
 * @property {string} processID
 * @property {boolean} status
 * @property {Array<DisplayUpdate>} messageStack
 */

/**
 * @typedef {object} PromptSettings
 * @property {boolean} needsSearch
 * @property {ChatConfig} chatConfig
 */