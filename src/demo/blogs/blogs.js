import { html } from "lit";
import { MyComponent } from "../../components/component/component";

class DemoBlogsComponent extends MyComponent {
    render() {
        return html`
            <h1>Blogs</h1>
            <my-outlet></my-outlet>
        `;
    }
}

customElements.define("demo-blogs", DemoBlogsComponent);

export default document.createElement("demo-blogs", DemoBlogsComponent);
