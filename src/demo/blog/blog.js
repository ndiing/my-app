import { html } from "lit";
import { MdComponent } from "../../components/component/component";

class DemoBlogComponent extends MdComponent {
    render() {
        return html`
            <h1>Blog</h1>
            <md-outlet></md-outlet>
        `;
    }
}

customElements.define("demo-blog", DemoBlogComponent);

export default document.createElement("demo-blog", DemoBlogComponent);
