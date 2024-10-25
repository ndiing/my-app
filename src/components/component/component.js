import { LitElement } from "lit";

/**
 * Class representing a custom component extending LitElement.
 * @extends LitElement
 */
class MyComponent extends LitElement {
    /**
     * Creates the render root for the component.
     * @returns {HTMLElement} The render root element.
     */
    createRenderRoot() {
        return this;
    }

    /**
     * Adds an event listener to the component.
     * @param {string} type - The event type to listen for.
     * @param {Function} listener - The function to call when the event is triggered.
     */
    on(type, listener) {
        this.addEventListener(type, listener);
    }

    /**
     * Emits a custom event from the component.
     * @param {string} type - The type of the event to emit.
     * @param {Object} detail - The detail object to pass with the event.
     */
    emit(type, detail) {
        const event = new CustomEvent(type, {
            bubbles: true,
            cancelable: true,
            detail,
        });
        this.dispatchEvent(event);
    }
}

export { MyComponent };
