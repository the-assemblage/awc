import { css, customElement, html, LitElement, property } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@assemblage/awc-base";

// These are the elements needed by this element.
import "@material/mwc-icon-button";

@customElement("awc-cookie-notification")
export class CookieNotification extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          background-color: var(--app-overlay-primary-background-color);
          bottom: 0;
          color: var(--app-primary-overlay-text-color);
          display: grid;
          grid-auto-flow: column;
          grid-template-areas: "start middle end";
          grid-template-columns: 1fr 4fr 1fr;
          left: 0;
          min-height: var(--app-cookie-notification-height);
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
          color: var(--app-text-color-light);
        }

        a {
          white-space: nowrap;
        }

        mwc-icon-button {
          color: var(--app-text-color-light);
          grid-area: end;
          justify-self: end;
        }
      `
    ];
  }

  @property({ type: String })
  private appTitle = "Peaty";

  @property({ type: String })
  private buttonText: string = "Close cookie notification";

  private closeButtonClicked() {
    console.log("Close clicked");

    const cookiesAcceptedEvent = new CustomEvent("cookies-accepted-event");

    this.dispatchEvent(cookiesAcceptedEvent);
  }

  protected render() {
    return html`
      <span>
        ${this.appTitle} uses cookies.
        <a href="/cookie-policy">Read more here</a>
      </span>
      <mwc-icon-button
        @click="${this.closeButtonClicked}"
        aria-label="${this.buttonText}"
        icon="close"
      ></mwc-icon-button>
    `;
  }
}
