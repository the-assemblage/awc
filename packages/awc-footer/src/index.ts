import { html, css, customElement, property, LitElement } from "lit-element";

// These are the shared styles needed by this element.
import { SharedStyles } from "@assemblage/awc-base";

export const FooterStyles = css`
  /*
a,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-block-end: 0;
}
*/

  nav {
    display: grid;
    grid-column-gap: var(--app-footer-grid-column-gap);
    grid-row-gap: var(--app-footer-grid-row-gap);
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
  @property({ type: String })
  appTitle = "";

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          display: grid;
          font-size: 0.75rem;
          grid-column-gap: var(--app-footer-grid-column-gap);
          opacity: var(--main-opacity, 1);
          padding-bottom: var(--app-footer-spacing-vertical);
          padding-left: var(--app-section-padding);
          padding-right: var(--app-section-padding);
          padding-top: var(--app-footer-spacing-vertical);
          place-content: stretch;
        }

        @media (max-width: 767px) {
          :host(.dark-theme) {
            background-color: var(--mdc-theme-primary);
          }

          :host(.dark-theme) a,
          :host(.dark-theme) h1,
          :host(.dark-theme) h2,
          :host(.dark-theme) h3,
          :host(.dark-theme) h4,
          :host(.dark-theme) h5,
          :host(.dark-theme) h6 {
            color: var(--app-text-color-light);
            margin-block-end: 0;
          }
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
