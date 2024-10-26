import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoBlogsComponent extends MdComponent {
    render() {
        return html`
            <h1>Blogs</h1>
            <md-outlet></md-outlet>
        `;
    }
}

customElements.define("demo-blogs", DemoBlogsComponent);

export default document.createElement("demo-blogs", DemoBlogsComponent);
