export function sortByKey(key, type, productsList) {
  if (type === "asc")
    return productsList.sort((a, b) =>
      a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    );

  return productsList.sort((a, b) =>
    a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0
  );
}

export function sortFromSearchFilter(productsList, searchInp) {
  return productsList.filter((product) =>
    product.name.toLowerCase().includes(searchInp.toLowerCase())
  );
}

export function sortFromCategoryFilter(productsList, category) {
  return productsList.filter((product) => product.category === category);
}

export function sortFromCompanyFilter(productsList, company) {
  return productsList.filter((product) => product.company === company);
}

export function sortFromColorFilter(productsList, color) {
  const colorNameToHex = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
    black: "#000",
    yellow: "#ffb900",
  };
  color = colorNameToHex[color];
  return productsList.filter((product) => product.colors.includes(color));
}

export function sortFromPriceFilter(productsList, price) {
  return productsList.filter((product) => product.price <= price);
}

export function sortFromFreeShippingFilter(productsList) {
  return productsList.filter((product) => product.freeShipping);
}
