// import { classMap } from "lit-html/directives/class-map";
import {
  LitElement,
  TemplateResult,
  css,
  customElement,
  html,
  property
} from "lit-element";
import { until } from "lit-html/directives/until";

import { getAPIData } from "@the-assemblage/utilities";

// These are the shared styles needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";

export interface IMediaObject {
  alt?: string;
  createdAt?: Date;
  description?: string;
  id?: string;
  length?: string;
  layout?: number;
  mimeType?: string;
  src?: string;
  title?: string;
  updatedAt?: Date;
  view?: number;
}

export interface IPageSection {
  createdAt?: Date;
  pages?: string[];
  description?: string;
  id?: string;
  layout?: number;
  media?: Array<IMediaObject>;
  published?: boolean;
  text?: Array<{
    createdAt?: Date;
    description?: string;
    id?: string;
    layout?: number;
    title?: string;
    updatedAt?: Date;
    view?: number;
  }>;
  title?: string;
  updatedAt?: Date;
  view?: string;
}

// @ts-ignore Argument of type 'typeof ElementPageSection' is not assignable to parameter of type 'ClassDescriptor | Constructor<HTMLElement>'.
@customElement("awc-page-section")
export class ElementPageSection extends LitElement {
  static styles = [
    SharedStyles,
    css`
      :host {
        align-content: start;
        align-items: stretch;
        display: grid;
        grid-template-columns: 1fr;
      }

      header {
        grid-area: header;
        margin-bottom: var(--awc-dimension-margin-vertical-section, 1rem);
        margin-left: var(--awc-dimension-margin-horizontal-section, 1rem);
        margin-right: var(--awc-dimension-margin-horizontal-section, 1rem);
        margin-top: var(--awc-dimension-margin-vertical-section, 1rem);
      }

      .media {
        object-fit: cover;
        width: 100%;
      }

      .text {
        margin-bottom: var(--awc-dimension-margin-vertical-section, 1rem);
        margin-left: var(--awc-dimension-margin-horizontal-section, 1rem);
        margin-right: var(--awc-dimension-margin-horizontal-section, 1rem);
        margin-top: var(--awc-dimension-margin-vertical-section, 1rem);
      }

      .media-0 {
        grid-area: media-0;
      }

      .media-1 {
        grid-area: media-1;
      }

      .media-2 {
        grid-area: media-2;
      }

      .media-3 {
        grid-area: media-3;
      }

      .media-4 {
        grid-area: media-4;
      }

      .text-0 {
        grid-area: text-0;
      }

      .text-1 {
        grid-area: text-1;
      }

      .text-2 {
        grid-area: text-2;
      }

      .text-3 {
        grid-area: text-3;
      }

      .text-4 {
        grid-area: text-4;
      }

      /* Section Layouts */
      :host([layout="1"]) {
        align-content: end;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "header" "media-0" "media-1" "media-2" "media-3" "media-4" "text-0" "text-1" "text-2" "text-3" "text-4";
      }

      :host([layout="2"]) {
        align-content: end;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "header header" "text-0 media-0" "text-1 media-1" "media-2 text-2" "text-3 media-3" "media-4 text-4";
      }

      :host([layout="3"]) {
        align-content: end;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: "header header" "media-0 text-0" "media-1 text-1" "text-2 media-2" "media-3 text-3" "text-4 media-4";
      }

      :host([layout="4"]) {
        align-content: end;
        grid-template-columns: 1fr;
        grid-template-areas: "header" "text-0" "text-1" "text-2" "text-3" "text-4" "media-0" "media-1" "media-2" "media-3" "media-4";
      }

      :host([layout="3"]) .media {
        object-fit: contain;
      }

      :host([layout="4"]) .media {
        -webkit-filter: brightness(0.5);
        filter: brightness(0.5);
      }

      :host([layout="4"]) .text {
        align-self: center;
        width: 45%;
        z-index: 1;
      }

      :host([layout="4"]) .media-0 {
        justify-self: end;
      }

      :host([layout="4"]) .media-1 {
        justify-self: end;
      }

      :host([layout="4"]) .media-2 {
        justify-self: start;
      }

      :host([layout="4"]) .media-3 {
        justify-self: end;
      }

      :host([layout="4"]) .media-4 {
        justify-self: start;
      }

      :host([layout="4"]) .text-1 {
        justify-self: start;
      }

      :host([layout="4"]) .text-0 {
        justify-self: end;
      }

      :host([layout="4"]) .text-2 {
        justify-self: end;
      }

      :host([layout="4"]) .text-3 {
        justify-self: start;
      }

      :host([layout="4"]) .text-4 {
        justify-self: end;
      }

      /* Media Queries */
      @media (max-width: 767px) {
        :host([layout="1"]) {
          grid-template-areas: "header" "media-1" " text-1" "media-2" "text-2" "media-3" "text-3" "media-4" "text-4";
        }

        :host([layout="2"]) {
          grid-template-areas: "header" "media-1" " text-1" "media-2" "text-2" "media-3" "text-3" "media-4" "text-4";
        }
      }

      @media (min-width: 768px) {
        :host {
          grid-template-columns: 1fr 1fr;
        }

        :host([layout="1"]) {
          grid-template-areas: "header header" "text-0 media-0" "media-1 text-1" "text-2 media-2" "media-3 text-3" "text-4 media-4";
        }

        :host([layout="2"]) {
          grid-template-areas: "header header" "media-0 text-0" "text-1 media-1" "media-2 text-2" "text-3 media-3" "media-4 text-4";
        }

        :host([layout="4"]) .text {
          font-size: 2.4rem;
        }
      }
    `
  ];

  @property({
    type: Object
  })
  public section: IPageSection = {};

  @property({ type: String })
  public _mediaTemplateResults: TemplateResult[] = [];

  @property({ type: String })
  public _textTemplateResults: TemplateResult[] = [];

  protected render() {
    return html`
      ${until(
        this.getSectionData().then(data => this.getSectionTemplateResult(data)),
        html`
          <span>Loading &hellip;</span>
        `
      )}
    `;
  }

  private getMediaTemplateResult(media, index) {
    let templateResult: TemplateResult = html``;

    if (media.mimeType.startsWith("image/svg+xml")) {
      templateResult = html`
        <img
          alt="${media.alt}"
          class="media media-${index}"
          src="${media.src}.svg"
          title="${media.title}"
        />
      `;
    } else if (media.mimeType.startsWith("image")) {
      templateResult = html`
        <awc-responsive-picture
          alt="${media.alt}"
          class="media media-${index}"
          src="${media.src}"
          title="${media.title}"
        >
        </awc-responsive-picture>
      `;
    } else if (media.mimeType.startsWith("video")) {
      templateResult = html`
        <video
          class="media media-${index}"
          controls
          src="${media.sources.mp4}"
          title="${media.title}"
        >
          <source src="${media.sources.webm}" type="video/webm" />
          <source src="${media.sources.mp4}" type="video/mp4" />

          Sorry, your browser doesn't support embedded videos.
        </video>
      `;
    }

    return templateResult;
  }

  private async getSectionData() {
    return getAPIData(`/sections/${this.section.id}`).then(
      response => response.json(),
      error => console.error(error)
    );
  }

  private getSectionTemplateResult(data): TemplateResult[] {
    const templateResults: TemplateResult[] = [];

    let openingTag = html``;
    let closingTag = html``;

    console.log("data", data);
    if (data.view) {
      import(`../components/${data.view}.js`);
      switch (data.view) {
        case "awc-carousel":
          openingTag = html`
            <awc-carousel> </awc-carousel>
          `;
          closingTag = html`</awc-carousel>`;
          break;
        case "awc-intro-signup":
          openingTag = html`
            <awc-intro-signup> </awc-intro-signup>
          `;
          closingTag = html`</awc-intro-signup>`;
          break;
        case "awc-sign-in-form":
          openingTag = html`
            <awc-sign-in-form> </awc-sign-in-form>
          `;
          closingTag = html`</awc-sign-in-form>`;
          break;
        case "awc-sign-up-form":
          openingTag = html`
            <awc-sign-up-form> </awc-sign-up-form>
          `;
          closingTag = html`</awc-sign-up-form>`;
          break;
      }

      templateResults.push(openingTag);
    }

    templateResults.push(
      html`
        <header><h1>${data.title}</h1></header>
      `
    );

    data.media &&
      Array.isArray(data.media) &&
      data.media.forEach((media, index) => {
        templateResults.push(this.getMediaTemplateResult(media, index));
      });

    data.text &&
      Array.isArray(data.text) &&
      data.text.forEach((text, index) => {
        templateResults.push(
          html`
            <div class="text text-${index}">
              ${text.value
                ? html`
                    <span>
                      ${text.value}
                    </span>
                  `
                : `No text value defined`}
            </div>
          `
        );
      });

    if (data.view) {
      templateResults.push(closingTag);
    }

    return templateResults;
  }
}
