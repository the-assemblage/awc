import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend"; // primary use cache
import XHRBackend from "i18next-xhr-backend"; // fallback xhr load

const options = {
  backend: {
    // loadPath: "locales/{{lng}}/{{ns}}.json"
    backends: [
      LocalStorageBackend, // primary
      XHRBackend // fallback
    ],
    backendOptions: [
      {
        loadPath: `/locales/{{lng}}/{{ns}}.json`
      }
    ]
  },
  debug: true,
  fallbackLng: "en",
  ns: ["app"]
};

const i18nextApp = i18next.createInstance();
i18nextApp
  .use(ChainedBackend)
  // .use(XHRBackend)
  .init(
    Object.assign(
      { instanceName: "i18nextApp", variableName: "_appLanguage" },
      options
    ),
    err => {
      if (err) {
        console.error(err);
      }
    }
  );

const i18nextCustomer = i18next.createInstance();
i18nextCustomer
  .use(ChainedBackend)
  // .use(XHRBackend)
  .init(
    Object.assign(
      { instanceName: "i18nextCustomer", variableName: "_customerLanguage" },
      options
    ),
    err => {
      if (err) {
        console.error(err);
      }
    }
  );

export { i18nextApp, i18nextCustomer };
