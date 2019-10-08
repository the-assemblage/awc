import { LitElement, html, css, customElement, property } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";

@customElement("awc-snack-bar")
export class SnackBar extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          display: block;
          position: fixed;
          top: 100%;
          left: 0;
          right: 0;
          padding: 12px;
          background-color: var(--mdc-theme-secondary, grey);
          color: var(--mdc-theme-on-primary, white);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          transition-property: visibility, transform;
          transition-duration: 0.2s;
          visibility: hidden;
        }

        :host([active]) {
          visibility: visible;
          transform: translate3d(0, -100%, 0);
        }

        @media (min-width: 768px) {
          :host {
            width: 320px;
            margin: auto;
          }
        }
      `
    ];
  }

  @property({ type: Boolean })
  active = false;

  protected render() {
    return html`
      <slot></slot>
    `;
  }
}
