import { html, css, customElement, property, LitElement } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";

export const FooterStyles = css`
  nav {
    display: grid;
    grid-column-gap: var(--awc-dimension-gap-vertical-section, 1rem);
    grid-row-gap: var(--awc-dimension-gap-horizontal-section, 1rem);
  }

  @media (max-width: 767px) {
    nav {
      margin-bottom: 1rem;
      order: -1;
    }
  }

  @media (max-width: 1339px) {
    awc-language-picker {
      margin-bottom: 1rem;
    }
  }

  @media (min-width: 460px) and (max-width: 1023px) {
    nav {
      grid-template-columns: repeat(2, minmax(8rem, 1fr));
    }
  }

  @media (min-width: 1024px) {
    nav {
      grid-template-columns: repeat(4, minmax(8rem, 1fr));
    }
  }

  h1,
  label {
    font-size: 1rem;
    text-align: left;
  }

  section {
    align-content: start;
    display: grid;
    grid-row-gap: 1rem;
  }

  select {
    width: 100%;
  }

  a {
    text-decoration: none;
  }
`;

@customElement("awc-footer")
export class Footer extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          display: grid;
          font-size: 0.75rem;
          grid-column-gap: var(--awc-dimension-gap-horizontal-section, 1rem);
          opacity: var(--main-opacity, 1);
          margin-bottom: var(--awc-dimension-margin-vertical-section, 1rem);
          margin-left: var(--awc-dimension-margin-horizontal-section, 1rem);
          margin-right: var(--awc-dimension-margin-horizontal-section, 1rem);
          margin-top: var(--awc-dimension-margin-vertical-section, 1rem);
          place-content: stretch;
        }

        @media (min-width: 1440px) {
          :host {
            grid-template-columns: 1fr 2fr;
          }
        }
      `
    ];
  }

  protected render() {
    return html`
      <slot></slot>
    `;
  }
}
