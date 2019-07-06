export const getCookies = () =>
  document.cookie.split(";").reduce((cookies, item) => {
    const [name, value] = item.split("=");
    cookies[name] = value;
    return cookies;
  }, {});
