import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoBlogComponent extends MyComponent {
    render() {
        return html`
            <h1>Blog</h1>
            <my-outlet></my-outlet>
        `;
    }
}

customElements.define("demo-blog", DemoBlogComponent);

export default document.createElement("demo-blog", DemoBlogComponent);
