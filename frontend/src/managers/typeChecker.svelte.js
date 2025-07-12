/**
 * @typedef {Object} TypeDefinitionItem
 * @property {string} keyName - The name of the key to check on the object.
 * @property {string} type - The expected JavaScript type of the value (e.g. "string", "number", "boolean").
 */

/**
 * @typedef {TypeDefinitionItem[]} TypeDefinition
 */

/**
 * @description A shallow type checker. Verifies that an object's key-value pairs match the expected type definitions.
 * @param {TypeDefinition} typeDefinition - An array of type definition items specifying keys and expected types.
 * @param {Object} objectToCheck - The object to validate against the type definitions.
 * @returns {boolean} Returns true if all keys exist and have the correct type, otherwise false.
 */
export function shallowTypeCheck(typeDefinition, objectToCheck) {
    try {
        for (let property of typeDefinition) {
            // Check if key exists in the object
            const keyExists = objectToCheck.hasOwnProperty(property.keyName);
            if (keyExists) {
                const typeCorrect = typeof objectToCheck[property.keyName] === property.type;
                if (!typeCorrect) {
                    return false;
        
                }
            } else {
                return false;
            }
        }
        return true;
    } catch (e) {
        return false;
    }
}