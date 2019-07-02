import scrollSnapPolyfill from "css-scroll-snap-polyfill";
import { html, css, customElement, property, LitElement } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

// These are the shared styles needed by this element.
import { SharedStyles } from "@assemblage/awc-base";

@customElement("awc-carousel")
export class Carousel extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          --button-color: var(--app-secondary-button-background-color);
          --button-shadow: rgba(0, 0, 0, 0.25);
          --button-size: 3rem;
          --carousel-width: 100vw;

          grid-auto-rows: 100%;
          place-items: center;
          position: relative;
        }

        figure {
          -webkit-overflow-scrolling: touch;
          display: grid;
          grid-auto-flow: column;
          grid-auto-rows: 100%;
          height: 100%;
          margin: 0;
          overflow-x: scroll;
          overflow-y: hidden;
          padding: 0;
          place-items: center;
          position: relative;
          scroll-snap-type: x mandatory;
        }

        figure:not(.cover) {
          width: var(--carousel-width, 80vw);
        }

        ::slotted(awc-responsive-picture) {
          height: 100%;
          scroll-snap-align: start;
          z-index: 1;
        }

        @media (hover: hover) {
          ::slotted(awc-responsive-picture) {
            filter: grayscale(100%);
            transition-duration: 2000ms;
            transition-property: filter;
            transition-timing-function: ease-in-out;
          }

          ::slotted(awc-responsive-picture:focus),
          ::slotted(awc-responsive-picture:hover) {
            filter: grayscale(0%);
          }
        }

        nav {
          display: grid;
          grid-auto-flow: column;
          grid-column-gap: 80%;
          height: 30%;
          left: 0;
          pointer-events: none;
          position: absolute;
          top: 35%;
          width: 100%;
          z-index: 2;
        }

        button {
          background-color: transparent;
          border: transparent;
          color: var(--button-color);
          cursor: pointer;
          font-size: var(--button-size, 3rem);
          pointer-events: auto;
          text-shadow: 0px 0px 5px var(--button-shadow, white);
        }

        @media (min-width: 768px) {
          :host {
            --button-color: var(--app-tertiary-button-background-color);

            --button-shadow: rgba(255, 255, 255, 0.25);
            --button-size: 6rem;
            --carousel-width: 80vw;
          }
        }
      `
    ];
  }

  @property({ type: Boolean })
  cover: boolean = false;

  private _leftButtonDisabled: boolean = false;

  private _rightButtonDisabled: boolean = false;

  private _classes: {
    cover: boolean;
  } = {
    cover: this.cover
  };

  protected firstUpdated() {
    this._classes = {
      cover: this.cover
    };

    // const elements = this.shadowRoot!.querySelectorAll("img");

    // const observer = lozad(elements); // lazy loads elements with default selector as '.lozad'
    // observer.observe();

    // elements.forEach(element => {
    //   observer.triggerLoad(element);
    // });

    scrollSnapPolyfill();

    this._addScrollListener();
  }

  protected render() {
    this._classes = {
      cover: this.cover
    };

    return html`
      <figure class=${classMap(this._classes)}>
        <slot></slot>
      </figure>
      <nav>
        <button
          ?disabled="${this._leftButtonDisabled}"
          @click="${this._leftButtonClicked}"
          class="icon"
          title="scroll left"
          left
        >
          ❬
        </button>
        <button
          ?disabled="${this._rightButtonDisabled}"
          @click="${this._rightButtonClicked}"
          class="icon"
          title="scroll right"
          right
        >
          ❭
        </button>
      </nav>
    `;
  }

  private _addScrollListener() {
    const figure = this.shadowRoot!.querySelector("figure");

    if (figure) {
      figure.addEventListener("scroll", () => {
        const scrolled = figure.scrollLeft;
        const scrollWidth = figure.scrollWidth;
        const width = figure.getBoundingClientRect().width;

        const left = scrolled - width;

        if (left <= width * -1) {
          this._leftButtonDisabled = true;
          this._rightButtonDisabled = false;
          return;
        } else {
          this._leftButtonDisabled = false;
        }

        if (left >= scrollWidth) {
          this._leftButtonDisabled = false;
          this._rightButtonDisabled = true;
          return;
        } else {
          this._rightButtonDisabled = false;
        }
      });
    }
  }

  private _leftButtonClicked() {
    const figure = this.shadowRoot!.querySelector("figure");

    if (figure) {
      const scrolled = figure.scrollLeft;
      // const scrollWidth = figure.scrollWidth;
      const width = figure.getBoundingClientRect().width;

      const left = scrolled - width;

      if (left <= width * -1) {
        this._leftButtonDisabled = true;
        this._rightButtonDisabled = false;
        return;
      }

      this._leftButtonDisabled = false;

      figure.scrollTo({
        top: 0,
        left,
        behavior: "smooth"
      });

      this.requestUpdate();
    }
  }

  private _rightButtonClicked() {
    const figure = this.shadowRoot!.querySelector("figure");

    if (figure) {
      const scrolled = figure.scrollLeft;
      const scrollWidth = figure.scrollWidth;
      const width = figure.getBoundingClientRect().width;

      const left = scrolled + width;

      if (left >= scrollWidth) {
        this._leftButtonDisabled = false;
        this._rightButtonDisabled = true;
        return;
      }

      this._rightButtonDisabled = false;

      figure.scrollTo({
        top: 0,
        left,
        behavior: "smooth"
      });

      this.requestUpdate();
    }
  }
}