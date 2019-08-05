import ValidForm from "@pageclip/valid-form";
import { customElement, css, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

// These are the elements needed by this element.
import { SharedStyles } from "@assemblage/awc-base";
import "@material/mwc-button";

@customElement("awc-sign-up-form")
export class SignUpForm extends LitElement {
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
  public buttonText: string = "Sign up";

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

  // @ts-ignore: Property 'shadowRoot' does not exist on type 'SignUpForm'.
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

    // @ts-ignore: Property 'dispatchEvent' does not exist on type 'SignUpForm'.
    this.dispatchEvent(
      new CustomEvent("sign-up", {
        detail: user
      })
    );
  }

  private async setupResizeObserver() {
    // @ts-ignore: Property 'shadowRoot' does not exist on type 'SignUpForm'.
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
      "sign-up-form"
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
      this.user.event === "sign-up" &&
      this.user.authenticated &&
      this.user.username
    ) {
      return html`
        <p>Welcome ${this.user.username}</p>
      `;
    } else {
      return html`
        <form
          action="/user"
          class=${classMap(this._classes)}
          id="sign-up-form"
          method="post"
        >
          ${this.verbose
            ? html`
                <fieldset>
                  <legend>personal details</legend>
                  <div class="form-group">
                    <label class="label-1" for="honorific-prefix"
                      >honorific prefix</label
                    >
                    <input
                      autocomplete="honorific-prefix"
                      class="input-1"
                      id="honorific-prefix"
                      list="honorific-prefix-list"
                      name="honorific-prefix"
                      placeholder="please enter your honorific prefix"
                      type="text"
                    />
                    <datalist id="honorific-prefix-list">
                      <option>mr</option>
                      <option>mrs</option>
                      <option>ms</option>
                      <option>miss</option>
                      <option>mx</option>
                      <option>master</option>
                      <option>sir</option>
                      <option>dame</option>
                      <option>lord</option>
                      <option>lady</option>
                    </datalist>
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="given-name">given name</label>
                    <input
                      autocomplete="given-name"
                      class="input-1"
                      id="given-name"
                      name="given-name"
                      placeholder="please enter your given name"
                      required
                      type="text"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="additional-name"
                      >additional name</label
                    >
                    <input
                      autocomplete="additional-name"
                      class="input-1"
                      id="additional-name"
                      name="additional-name"
                      placeholder="please enter your additional name"
                      type="text"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="family-name">family name</label>
                    <input
                      autocomplete="family-name"
                      class="input-1"
                      id="family-name"
                      name="family-name"
                      placeholder="please enter your family name"
                      required
                      type="text"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="date-of-birth"
                      >date of birth</label
                    >
                    <input
                      autocomplete="locality"
                      class="input-1"
                      id="date-of-birth"
                      name="date-of-birth"
                      placeholder="please enter your date of birth"
                      required
                      type="date"
                    />
                  </div>
                  <div class="form-group">
                    <span class="label">gender</span>
                    <div class="radio-group">
                      <div class="radio-item">
                        <input
                          autocomplete="sex"
                          class="input-1"
                          id="gender-male"
                          name="gender"
                          required
                          type="radio"
                        />
                        <label class="label-1" for="gender-male">male</label>
                      </div>
                      <div class="radio-item">
                        <input
                          autocomplete="sex"
                          class="input-1"
                          id="gender-female"
                          name="gender"
                          required
                          type="radio"
                        />
                        <label class="label-1" for="gender-female"
                          >female</label
                        >
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>address</legend>
                  <div class="form-group">
                    <label class="label-1" for="street-address"
                      >street address</label
                    >
                    <input
                      autocomplete="street-address"
                      class="input-1"
                      id="street-address"
                      name="street-address"
                      placeholder="please enter your street address"
                      required
                      type="text"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="address-locality"
                      >locality</label
                    >
                    <input
                      autocomplete="locality"
                      class="input-1"
                      id="address-locality"
                      name="address-locality"
                      placeholder="please enter your locality"
                      required
                      type="text"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="address-region">region</label>
                    <input
                      autocomplete="region"
                      class="input-1"
                      id="address-region"
                      name="address-region"
                      placeholder="please enter your region"
                      required
                      type="text"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="postal-code">postal code</label>
                    <input
                      autocomplete="postal-code"
                      class="input-1"
                      id="postal-code"
                      name="postal-code"
                      placeholder="please enter your postal code"
                      required
                      type="text"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="address-country">country</label>
                    <input
                      autocomplete="country"
                      class="input-1"
                      id="address-country"
                      list="country-list"
                      name="address-country"
                      placeholder="please enter your country of residence"
                      required
                      type="text"
                    />
                    <datalist id="country-list">
                      <option value="fr">France</option>
                      <option value="uk">United Kingdom</option>
                      <option value="us">United States</option>
                    </datalist>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>communications</legend>
                  <div class="form-group">
                    <label class="label-1" for="email">email address</label>
                    <input
                      autocomplete="email"
                      class="input-1"
                      id="email"
                      name="email"
                      placeholder="please enter your email address"
                      required
                      type="email"
                    />
                  </div>
                  <div class="form-group">
                    <label class="label-1" for="telephone">telephone</label>
                    <input
                      autocomplete="tel"
                      class="input-1"
                      id="telephone"
                      name="telephone"
                      placeholder="please enter your telephone number"
                      required
                      type="telephone"
                    />
                  </div>
                </fieldset>
              `
            : null}

          <fieldset>
            <div class="form-group">
              <label class="label-1" for="email">email address</label>
              <input
                autocomplete="email"
                class="input-1"
                id="email"
                name="email"
                placeholder="please enter your email address"
                required
                type="email"
              />
            </div>

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
              <span class="guidance"
                >Make sure it's at least 15 characters OR at least 8 characters
                including a number and a lowercase letter.
                <a href="/password-policy">View password policy</a>.</span
              >
            </div>
          </fieldset>
          <p>
            By clicking “Sign up for Peaty, you agree to our
            <a href="/terms-of-service">Terms of Service</a> and
            <a href="/privacy-statement">Privacy Statement</a>. We’ll
            occasionally send you account related emails.
          </p>
          <mwc-button
            @click="${this.formSubmitHandler}"
            label="${this.buttonText}"
            unelevated
          ></mwc-button>
        </form>
        <footer>
          <p class="notice">
            By clicking on the "Sign Up" button, you agree to Peaty's
            <a href="/legal/end-user-agreement/" target="_blank"
              >Terms and Conditions of Use</a
            >.
          </p>
          <p>
            To learn more about how Peaty collects, uses, shares and protects
            your personal data please read Peaty's
            <a href="/legal/privacy-policy/" target="_blank">Privacy Policy</a>.
          </p>
        </footer>
        ${this.user &&
          this.user.error &&
          this.user.errorType === "signUpFornError" &&
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
