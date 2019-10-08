import { css, customElement, html, LitElement, property } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";

// These are the elements needed by this element.
import "@material/mwc-icon-button";

@customElement("awc-cookie-notification")
export class CookieNotification extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          background-color: var(--mdc-theme-overlay, rgba(0, 0, 0, 0.75));
          bottom: 0;
          color: var(--mdc-theme-text-primary-on-dark, white);
          display: grid;
          grid-auto-flow: column;
          grid-template-areas: "start middle end";
          grid-template-columns: 1fr 4fr 1fr;
          left: 0;
          min-height: var(--awc-dimension-height-cookie-notification, 6rem);
          padding: 1rem;
          place-content: center;
          place-items: center;
          position: fixed;
          text-align: center;
          width: 100%;
          z-index: 1000;
        }

        span {
          grid-area: middle;
        }

        a,
        span {
          color: var(--mdc-theme-on-primary, white);
        }

        a {
          white-space: nowrap;
        }

        mwc-icon-button {
          color: var(--mdc-theme-on-primary, white);
          grid-area: end;
          justify-self: end;
        }
      `
    ];
  }

  @property({ type: String })
  public buttonText: string = "Close cookie notification";

  @property({ type: String })
  public cta = "Read more";

  @property({ type: String })
  public information = "Peaty uses cookies";

  private closeButtonClicked() {
    console.log("Close clicked");

    const cookiesAcceptedEvent = new CustomEvent("cookies-accepted-event");

    this.dispatchEvent(cookiesAcceptedEvent);
  }

  protected render() {
    return html`
      <span>
        ${this.information}
        <a href="/cookie-policy">${this.cta}</a>
      </span>
      <mwc-icon-button
        @click="${this.closeButtonClicked}"
        aria-label="${this.buttonText}"
        icon="close"
      ></mwc-icon-button>
    `;
  }
}
