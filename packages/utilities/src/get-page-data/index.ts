import { getAPIData } from "../get-api-data";

export const getPageData = async (
  page: {
    id?: string | undefined;
  },
  config?: {
    searchParams?: URLSearchParams;
    customOptions?: RequestInit;
  }
) => {
  if (page && page.id) {
    return getAPIData(`/pages/${page.id}`, config).then(
      response => response.json(),
      error => console.error(error)
    );
  } else {
    console.error("No page id attribute supplied");
  }
};
