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
  class = "";

  @property({ type: String })
  position = "";

  @property({ type: String })
  src = "";

  private _sizes = [320, 640, 1280, 1920, 2560];

  constructor() {
    super();
  }

  static get styles() {
    return [
      css`
        :host {
          background-color: var(--mdc-theme-background, white);
          display: grid;
          position: relative;
        }

        picture.object-position_bottom img {
          object-position: bottom center;
        }

        picture.object-position_left img {
          object-position: center left;
        }

        picture.object-position_left_bottom img {
          object-position: left bottom;
        }

        picture.object-position_left_top img {
          object-position: left top;
        }

        picture.object-position_right img {
          object-position: right center;
        }

        picture.object-position_right_bottom img {
          object-position: right bottom;
        }

        picture.object-position_right_top img {
          object-position: right top;
        }

        picture.object-position_top img {
          object-position: top center;
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

  private getMediaQuery(index) {
    const min = `(min-width: ${this._sizes[index].toString()}px)`;

    if (index + 1 < this._sizes.length) {
      return `${min} and (max-width: ${this._sizes[index + 1].toString()}px)`;
    } else {
      return min;
    }
  }

  private getSource(index, type) {
    return html`
      <source
        srcset="
          ${this.src}-${this._sizes[index].toString()}px@1x.jpeg,
          ${this.src}-${this._sizes[index].toString()}px@2x.jpeg 2x,
          ${this.src}-${this._sizes[index].toString()}px@3x.jpeg 3x
        "
        media="${this.getMediaQuery(index)}"
        type="${type}"
      />
    `;
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
        data-toggle-class="object-position_${this.position}"
        loading="lazy"
        style="display: flex; min-height: 1rem"
      >
        ${this._sizes.map(
          (_size, index) =>
            html`
              ${this.getSource(index, "image/jpeg")}
              ${this.getSource(index, "image/webp")}
            `
        )}
      </picture>
      <span>Image loading&hellip;</span>
      <slot></slot>
    `;
  }
}
