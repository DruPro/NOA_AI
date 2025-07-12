import DefaultIcon from '$lib/icons/web/website-icon-11.png'
import { shallowTypeCheck } from './typeChecker.svelte';

function useIndicatorManager() {
    let context = $state({ indicators: [] });

    /**
     * @typedef IndicatorObject
     * @property {string} id
     * @property {string} [icon]
     * @property {string} message
     * @property {boolean} status
     */

    /**
     * 
     * @param {IndicatorObject} indicatorObject 
     * @example
     * import Image1 from '$lib/assets/img.svg
     * displayIndicator({icon: Image1, message: "My message", status: false})
     */
    function displayIndicator(indicatorObject) {
        if (getIndicator(indicatorObject.id)) {
            console.error(`Error: ${"displayIndicator"} there is already an indicator with this id`)
            return
        }
        if (!indicatorObject) {
            console.error(`Error: ${"displayIndicator"} is missing a indicator Object`)
            return
        }
        let typeDefinition = [
            { keyName: "id", type: "string" },
            { keyName: "message", type: "string" },
            { keyName: "status", type: "boolean" },
        ]
        if (shallowTypeCheck(typeDefinition, indicatorObject)) {
            context.indicators.push(indicatorObject)
        }
        else {
            console.error(`Error: displayIndicator indicatorObject argument is of the wrong type`)
        }

    }

    function clearIndicators() {
        context.indicators = [];
    }

    /**
     * @description finds an indicator with a matching id
     * @param {string} id 
     * @returns {IndicatorObject | false}
     */
    function getIndicator(id) {
        const indicatorList = context.indicators;
        const selectedIndicator = indicatorList.find((indicator) => indicator.id === id)
        if (selectedIndicator) {
            return selectedIndicator
        } else {
            return false
        }

    }

    /**
     * @description finds an indicator with a matching id and changes its status
     * @param {string} id 
     * @returns {boolean} true if operation is succesfull, false if failed
     */
    function toggleStatus(id) {
        let selectedIndicator = getIndicator(id);
        if (selectedIndicator) {
            try {
                selectedIndicator.status = !selectedIndicator.status;
                return true
            }
            catch (e) {
                return false;
            }
        }
        else {
            return false
        }
    }

    return { context, displayIndicator, clearIndicators, getIndicator, toggleStatus }
}

export default useIndicatorManager