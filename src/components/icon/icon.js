import { html, nothing } from "lit";
import { MyComponent } from "../component/component";

class MyIconComponent extends MyComponent {}

customElements.define("my-icon", MyIconComponent);

export { MyIconComponent };
