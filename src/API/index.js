class Helper {
  static baseURL() {
    return "https://api.yelp.com/v3";
  }
  static auth() {
    const keys = {
      // client_id: 'ne463RiSqUtiyUo45EVQzQ',
      Authorization: 'Bearer aBSyWhjqG-LjIJbCN2l-IbC_5lIizT6TVuyzBANqCH8tGgDGTnyo_P8WgVDXcXPE6bxiEyHNk12wKVSD8wG4hSJ2SgU8Ho1P0MXpuFktpCYczXqCtak-ERuisSG9W3Yx'
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }
  static urlBuilder(urlParams) {
    if(!urlParams) {
      return ""
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join("&")
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers(),
      mode: "no-cors" // no-cors
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.urlBuilder(
      urlParams
    )}`,
    requestData
  );
  }
}

export default class YelpAPI {
  static search(urlParams) {
    return Helper.simpleFetch("/businesses/search", "GET", urlParams);
  }
  static getVenueDetails(id) {
    return Helper.simpleFetch(`/businesses/${id}`, "GET");
  }
}
