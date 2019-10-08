import { of, from } from "rxjs";
// import { fromFetch } from "rxjs/fetch";
import { catchError, switchMap } from "rxjs/operators";
// import { store } from "../redux/store";

import { getCookies, getErrorResponse } from "@the-assemblage/utilities";

const cookies = getCookies();

const headers = new Headers();

headers.append("Accept-Language", "en-GB");

if (cookies["xsrfToken"]) {
  headers.append("X-XSRF-TOKEN", cookies["xsrfToken"]);
}

const base: {
  options: RequestInit;
} = {
  options: {
    cache: "force-cache",
    // credentials: "same-origin",
    credentials: "include",
    headers,
    method: "GET",
    mode: "cors"
  }
};

export const getAPIData$ = (
  path: string,
  config?: {
    searchParams?: URLSearchParams;
    options?: RequestInit;
  }
) => {
  const sanitisedPath = path.replace(/^\/+/, "");

  // const state: {
  //   app?: {
  //     apiUrl?: string;
  //   };
  // } = store.getState();

  // const apiUrl = state!.app!.apiUrl;

  const apiUrl = localStorage.getItem("apiUrl");

  const url = new URL(`${apiUrl}/${sanitisedPath}`);

  if (config && config.searchParams) {
    url.search = config.searchParams.toString();
  }

  const options =
    config && config.options
      ? {
          ...base.options,
          ...config.options
        }
      : base.options;
  console.log("headers", headers);

  // return fromFetch("https://api.github.com/users?per_page=5", options);

  return from(fetch(url.toString(), options)).pipe(
    switchMap((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of(getErrorResponse(response));
      }
    }),
    catchError(error => {
      // Network or other error, handle appropriately
      console.error(error);
      return of(getErrorResponse(error));
    })
  );
};
