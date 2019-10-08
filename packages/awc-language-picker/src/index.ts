import { LitElement, html, css, customElement, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat";

// These are the shared styles needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";

@customElement("awc-language-picker")
export class LanguagePicker extends LitElement {
  static styles = [
    SharedStyles,
    css`
      :host(.color-scheme-dark) label {
        color: white;
      }
    `
  ];

  @property({ type: String })
  private appLanguage = localStorage.getItem("language")
    ? (localStorage.getItem("language") as string)
    : "en";

  @property()
  i18nextApp;

  @property({ type: Array })
  private languages: Array<{
    disabled?: boolean;
    text: string;
    value: string;
  }> = [
    { text: "English", value: "en" },
    { text: "English (British)", value: "en-GB" },
    { text: "English (American)", value: "en-US" },
    { text: "French", value: "fr" },
    { text: "Arabic", value: "ar" },
    { text: "Arabic (Saudi Arabia)", value: "ar-SA" },
    { text: "Japanese", value: "ja" }
  ];

  @property({ type: Boolean })
  private showCustomerSelector: boolean = false;

  protected render() {
    return html`
      <form dir="${this.i18nextApp.dir(this.appLanguage)}">
        <label for="app-language-selector">App language</label>
        <select
          @change="${this.appLanguageSelectChanged}"
          id="app-language-selector"
        >
          ${repeat(
            this.languages,
            language => html`
              <option
                ?disabled="${language.disabled}"
                ?selected="${this.appLanguage === language.value}"
                value="${language.value}"
                >${language.text}</option
              >
            `
          )}
        </select>
      </form>
    `;
  }

  private appLanguageUpdated(language) {
    console.log("this.i18nextApp", this.i18nextApp);
    if (this.i18nextApp) {
      this.i18nextApp.changeLanguage(language, error => {
        if (error) {
          return console.error("something went wrong loading", error);
        }

        localStorage.setItem("language", language);
        // console.info("i18nextApp languageChanged", language);
      });
    }
  }

  private appLanguageSelectChanged(event) {
    this.appLanguageUpdated(event.target.value);
  }
}
