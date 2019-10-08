import { css, customElement, html, svg, LitElement } from "lit-element";

import {
  facebookIcon,
  instagramIcon,
  pinterestIcon,
  snapchatIcon,
  twitterIcon,
  youtubeIcon
} from "./icons";

// These are the shared styles needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";

@customElement("awc-social-links")
export class SocialLinks extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          background-color: var(--mdc-theme-primary, darkgrey);
          color: var(--mdc-theme-text-primary-on-dark, white);
          display: grid;
          grid-auto-flow: column;
          grid-gap: 1.5rem;
          padding-bottom: 1rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          padding-top: 1rem;
          place-content: center;
          place-items: center;
        }

        @media (min-width: 460px) and (max-width: 1023px) {
          :host {
            grid-gap: 4rem;
          }
        }

        @media (min-width: 1024px) {
          :host {
            grid-gap: 8rem;
          }
        }

        h1 {
          display: none;
        }

        svg {
          fill: var(--mdc-theme-text-icon-on-dark, white);
          height: 2rem;
          width: 2rem;
        }
      `
    ];
  }

  protected render() {
    return html`
      <h1>Social</h1>
      <a href="https://instagram.com/peaty" title="Peaty on Instagram">
        ${instagramIcon}
      </a>
      <a href="https://www.snapchat.com/add/peaty" title="Peaty on Snapchat">
        ${snapchatIcon}
      </a>
      <a href="https://www.twitter.com/peaty" title="Peaty on Twitter">
        ${twitterIcon}
      </a>
      <a href="https://www.facebook.com/peaty" title="Peaty on Facebook">
        ${facebookIcon}
      </a>
      <a href="https://pinterest.com/peaty" title="Peaty on Pinterest">
        ${pinterestIcon}
      </a>
      <a href="https://www.youtube.com/peaty" title="Peaty on YouTube">
        ${youtubeIcon}
      </a>
    `;
  }
}
