import { html, nothing } from "lit";
import { MyComponent } from "../component/component";

class MySegmentedButtonComponent extends MyComponent {}

customElements.define("my-segmented-button", MySegmentedButtonComponent);

export { MySegmentedButtonComponent };
