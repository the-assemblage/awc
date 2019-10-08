import { LitElement, html, css, customElement, property } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";

import { CartItem } from "./interfaces";

@customElement("awc-menu-shopping-basket")
export class ShoppingBasket extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          align-self: flex-end;
          position: relative;
        }

        div {
          background-color: var(--mdc-theme-background);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          color: var(--mdc-theme-text-primary-on-light);
          padding: 1rem;
          position: absolute;
          right: 0;
          transform: translate3d(0, -100%, 0);
          transform: translate3d(0, 0, 0);
          transition-duration: 0.2s;
          transition-property: visibility, transform;
          visibility: hidden;
          width: 260px;
          will-change: transform;
        }

        :host([active]) div {
          visibility: visible;
        }

        image {
          clip-path: circle(40px);
          height: 80px;
          width: 80px;
        }
      `
    ];
  }

  @property({ type: String })
  private currency: string = "";

  @property({ type: Array })
  private items: Array<CartItem> = [];

  @property({ type: Object })
  private user = {
    image: "",
    username: ""
  };

  protected render() {
    return html`
      <div>
        <img
          src="${this.user.image}"
          alt="Profile image for ${this.user.username}"
        />
        <dl>
          <dt>username</dt>
          <dd>${this.user.username}</dd>
        </dl>
      </div>
    `;
  }
}
