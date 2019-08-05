import { html, css, customElement, property, LitElement } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@assemblage/awc-base";

@customElement("awc-copyright")
export class Copyright extends LitElement {
  @property({ type: String })
  public text = `© ${new Date().getFullYear()}`;

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          background-color: var(--mdc-theme-secondary, grey);
          color: var(--mdc-theme-on-primary, white);
          display: grid;
          height: 4rem;
          place-content: center;
          text-transform: uppercase;
          width: 100%;
        }
      `
    ];
  }

  protected render() {
    return html`
      ${this.text}
    `;
  }
}
