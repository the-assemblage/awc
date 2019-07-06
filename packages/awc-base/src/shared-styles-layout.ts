import { css } from "lit-element";

export const SharedStylesLayout = css`
  *,
  *:before,
  *:after,
  :host {
    box-sizing: border-box;
  }

  :host {
    display: grid;
  }

  .error {
    display: block;
    margin-top: 1rem;
  }
`;
