import { css } from "lit-element";

export const SharedStylesColor = css`
  /*
   * Elements
   */
  a {
    color: var(--mdc-theme-text-primary-on-background, black);
  }

  /*
   * Form Fields
   */
  button,
  input,
  select,
  textarea {
    background-color: var(--mdc-theme-background, white);
    color: var(--mdc-theme-text-primary-on-background, black);
    border-color: var(--mdc-theme-on-surface, black);
  }

  button.cta {
    background-color: var(--mdc-theme-primary, darkgrey);
    color: var(--mdc-theme-on-primary, white);
  }

  /*
   * States
   */
  .danger {
    color: #721c24;
  }

  .info {
    color: #0c5460;
  }

  .success {
    color: #155724;
  }

  .warning {
    color: #856404;
  }

  /*
   * Alerts
   */
  .alert.danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  .alert.info {
    background-color: #d1ecf1;
    border-color: #bee5eb;
  }

  .alert.success {
    background-color: #d4edda;
    border-color: #c3e6cb;
  }

  .alert.warning {
    background-color: #fff3cd;
    border-color: #ffeeba;
  }

  .validation-error {
    color: red;
  }
`;
