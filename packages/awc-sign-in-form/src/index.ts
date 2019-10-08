import ValidForm from "@pageclip/valid-form";
import { customElement, css, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

// These are the elements needed by this element.
import { SharedStyles } from "@the-assemblage/awc-base";
import "@material/mwc-button";

@customElement("awc-sign-in-form")
export class SignInForm extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          margin-bottom: 1rem;
          margin-top: 1rem;
        }
      `
    ];
  }

  @property({ type: String })
  public buttonText: string = "Sign in";

  @property({ type: Boolean })
  public horizontalLabels: boolean = false;

  @property({ type: Boolean })
  public showLabels: boolean = false;

  @property({ type: Object })
  public user: {
    authenticated?: boolean;
    email?: string;
    error?: boolean;
    errorType?: string | null;
    event?: "sign-in" | "sign-up";
    id?: string;
    message?: string | null;
    password?: string;
    username?: string;
  } = {};

  @property({ type: Boolean })
  public verbose: boolean = false;

  // @ts-ignore: Property 'shadowRoot' does not exist on type 'SignInForm'.
  private form: HTMLFormElement;

  private _classes: {
    "horizontal-labels": boolean;
    "show-labels": boolean;
  } = {
    "horizontal-labels": this.horizontalLabels,
    "show-labels": this.showLabels
  };

  private async addValidation() {
    await this.updateComplete;

    if (!this.form) {
      console.error("No form found");
      return;
    }

    ValidForm(this.form, {
      errorPlacement: "after"
    });

    this.form.addEventListener("submit", this.formSubmitHandler);
  }

  private async formSubmitHandler(event) {
    event.preventDefault();

    const valid = this.form.checkValidity();

    console.info("valid", valid);

    const formData = new FormData(this.form);

    // @ts-ignore: Property 'fromEntries' does not exist on type 'ObjectConstructor'.
    const user = Object.fromEntries(formData);

    // @ts-ignore: Property 'dispatchEvent' does not exist on type 'SignInForm'.
    this.dispatchEvent(
      new CustomEvent("sign-in", {
        detail: user
      })
    );
  }

  private async setupResizeObserver() {
    // @ts-ignore: Property 'shadowRoot' does not exist on type 'SignInForm'.
    const style = this.shadowRoot.host.style;

    // @ts-ignore: Cannot find name 'ResizeObserver'.
    const ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        // entry.target.style.borderRadius =
        //   Math.max(0, 250 - entry.contentRect.width) + "px";

        // const { left, top, width, height } = entry.contentRect;

        // console.log("Element:", entry.target);
        // console.log(`Element's size: ${width}px x ${height}px`);
        // console.log(`Element's paddings: ${top}px ; ${left}px`);

        const { width } = entry.contentRect;

        if (this.verbose && width >= 768) {
          style.setProperty("--grid-template-columns", "1fr 1fr");
          style.setProperty("--button_grid-column", "1 / span 2");
        } else {
          style.setProperty("--grid-template-columns", "1fr");
          style.setProperty("--button_grid-column", "1");
        }

        if (width >= 1024) {
          style.setProperty("--grid-column-gap", "5rem");
        } else {
          style.setProperty("--grid-column-gap", "1rem");
        }
      }
    });

    if (!this.form) {
      console.error("No form found");
      return;
    }

    ro.observe(this.form);

    // console.log("ro", ro);
  }

  protected firstUpdated() {
    this._classes = {
      "horizontal-labels": this.horizontalLabels,
      "show-labels": this.showLabels
    };

    this.form = this.shadowRoot!.getElementById(
      "sign-in-form"
    ) as HTMLFormElement;

    this.addValidation();
    // this.setupResizeObserver();
  }

  protected render() {
    this._classes = {
      "horizontal-labels": this.horizontalLabels,
      "show-labels": this.showLabels
    };

    if (
      this.user &&
      this.user.event === "sign-in" &&
      this.user.authenticated &&
      this.user.username
    ) {
      return html`
        <p>Welcome ${this.user.username}</p>
        <p>Show a list of links here if no redirect property has been set</p>
      `;
    } else {
      return html`
        <form
          action="/user"
          class=${classMap(this._classes)}
          id="sign-in-form"
          method="post"
        >
          <fieldset>
            <div class="form-group">
              <label class="label-1" for="username">username</label>
              <input
                autocomplete="username"
                aria-label="username"
                class="input-1"
                id="username"
                name="username"
                pattern="[a-zA-Z][a-zA-Z0-9-_.]{1,20}"
                placeholder="please enter your username"
                required
                type="text"
              />
            </div>
            <div class="form-group">
              <label class="label-1" for="password">password</label>
              <input
                autocomplete="password"
                aria-label="password"
                class="input-1"
                id="password"
                name="password"
                placeholder="please enter your password"
                required
                type="password"
              />
            </div>
          </fieldset>
          <mwc-button
            @click="${this.formSubmitHandler}"
            label="${this.buttonText}"
            unelevated
          ></mwc-button>
        </form>
        ${this.user &&
          this.user.error &&
          this.user.errorType === "signInFormError" &&
          html`
            <span class="error"
              >${this.user.message
                ? this.user.message
                : "An error occurred"}</span
            >
          `}
      `;
    }
  }
}
