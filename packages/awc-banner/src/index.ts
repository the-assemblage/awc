import { LitElement, html, css, customElement, property } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@assemblage/awc-base";

@customElement("awc-banner")
export class Banner extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          background-color: var(--mdc-theme-secondary, black);
          color: var(--mdc-theme-text-secondary-on-dark, white);
          display: block;
          opacity: 0;
          padding: 1rem;
          text-align: center;
          transform: translate3d(0, 100%, 0);
          transition-duration: 0.2s;
          transition-property: opacity, transform;
          will-change: opacity, transform;
        }

        :host([active]) {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        ::slotted(button) {
          background: transparent;
          color: var(--mdc-theme-text-primary-on-dark, white);
          border: none;
          cursor: pointer;
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
