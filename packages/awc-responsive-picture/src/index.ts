import { LitElement, html, css, customElement, property } from "lit-element";
import lozad from "lozad";
import { repeat } from "lit-html/directives/repeat";

// These are the shared styles needed by this element.
import { SharedStyles } from "@assemblage/awc-base";

@customElement("awc-responsive-picture")
export class ResponsivePicture extends LitElement {
  @property({ type: String })
  alt = "";

  @property({ type: String })
  src = "";

  private _sizes = [2560, 1920, 1280, 640, 320];

  constructor() {
    super();
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          background-color: var(--mdc-theme-background, white);
          position: relative;
        }

        picture,
        img {
          object-fit: cover;
          position: relative;
          width: 100%;
          z-index: 2;
        }

        picture {
          display: flex;
          grid-auto-rows: 100%;
        }

        img {
          height: 100%;
        }

        span {
          background-color: var(--mdc-theme-background, white);
          color: var(--mdc-theme-text-primary-on-background, black);
          display: grid;
          font-size: 1rem;
          height: 100%;
          left: 0;
          place-content: center;
          position: absolute;
          text-align: center;
          top: 0;
          width: 100%;
          z-index: 1;
        }

        ::slotted(*) {
          position: absolute;
          z-index: 3;
        }

        ::slotted(div) {
          display: grid;
          height: 100%;
          left: 0;
          padding: 1rem;
          top: 0;
          width: 100%;
        }
      `
    ];
  }

  protected firstUpdated() {
    const element = this.shadowRoot!.querySelector("picture");
    const observer = lozad(element);
    observer.observe();
  }

  protected render() {
    return html`
      <picture
        class="lozad"
        data-alt="${this.alt}"
        data-iesrc="${this.src}-1280px@1x.jpeg"
        loading="lazy"
        style="display: flex; min-height: 1rem"
      >
        ${repeat(
          this._sizes,
          size => html`
            <source
              srcset="
                ${this.src}-${size.toString()}px@1x.jpeg,
                ${this.src}-${size.toString()}px@2x.jpeg 2x,
                ${this.src}-${size.toString()}px@3x.jpeg 3x
              "
              media="(min-width: ${size.toString()}px)"
              type="image/jpeg"
            />
            <source
              srcset="
                ${this.src}-${size.toString()}px@1x.webp,
                ${this.src}-${size.toString()}px@2x.webp  2x,
                ${this.src}-${size.toString()}px@3x.webp 3x
              "
              media="(min-width: ${size.toString()}px)"
              type="image/webp"
            />
          `
        )}
      </picture>
      <span>Image loading&hellip;</span>
      <slot></slot>
    `;
  }
}
