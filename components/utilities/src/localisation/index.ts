import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend"; // primary use cache
import XHRBackend from "i18next-xhr-backend"; // fallback xhr load

// This element is connected to the Redux store.
// import { store } from "../redux/store";

// These are the actions needed by this element.
// import { updateDirectionality, updateLanguage } from "../redux/app/actions";

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

// export const localize = (...i18nextInstances: i18next.i18n[]) => superclass =>
//   class extends superclass {
//     public _shouldRender(props, changedProps, old) {
//       console.log("old", old);
//       // Also check active property used by PageViewElement
//       return changedProps && changedProps.active ? props.active : true;
//     }

//     connectedCallback() {
//       i18nextInstances.forEach(i18nextInstance => {
//         if (i18nextInstance.isInitialized !== true) {
//           i18nextInstance.on("initialized", () => {
//             this.requestUpdate();
//           });

//           i18nextInstance.on("languageChanged", language => {
//             // @ts-ignore: Property 'variableName' does not exist on type 'InitOptions'.
//             this[i18nextInstance.options.variableName] = language;

//             this.requestUpdate();

//             console.info(
//               `Language changed to ${language} on ${
//                 // @ts-ignore: Property 'instanceName' does not exist on type 'InitOptions'.
//                 i18nextInstance.options.instanceName
//               } instance`
//             );
//           });
//         }
//       });

//       if (super.connectedCallback) {
//         super.connectedCallback();
//       }
//     }
//   };
