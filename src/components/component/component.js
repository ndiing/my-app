import { LitElement } from "lit";
import { updateWhenLocaleChanges } from "@lit/localize";

/**
 * Kelas MdComponent adalah komponen LitElement yang mendukung lokalizasi.
 *
 * @extends LitElement
 */
class MdComponent extends LitElement {
    constructor() {
        super();
        updateWhenLocaleChanges(this);
    }

    /**
     * Membuat root rendering untuk komponen ini.
     *
     * @returns {MdComponent} Mengembalikan instance dari MdComponent.
     */
    createRenderRoot() {
        return this;
    }

    connectedCallback() {
        super.connectedCallback();

        this.classList.add(this.localName);
    }

    updated(changedProperties) {
        super.updated(changedProperties);
    }

    /**
     * Menambahkan listener untuk event yang diberikan.
     *
     * @param {string} type - Tipe event yang akan didengarkan.
     * @param {Function} listener - Fungsi yang akan dipanggil ketika event terjadi.
     */
    on(type, listener) {
        this.addEventListener(type, listener);
    }

    /**
     * Mengeluarkan event kustom dengan detail yang diberikan.
     *
     * @param {string} type - Tipe event yang akan dikeluarkan.
     * @param {Object} detail - Data yang ingin dikirim dengan event.
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

export { MdComponent };
