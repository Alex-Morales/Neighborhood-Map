class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const keys = {
      client_id: 'E22IMWWHGOPZNXEYXHLXUKSQMIVTBSEJXAAYPKWCOUFKHJJY',
      client_secret: 'GX5BKLN0HOVEE5I55UXFTBSW0GUCBJPUFIZTPAXEPX3JYTJK',
      v: '20181010'
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
      Accept: "application/json",
      headers: Helper.headers()
    };
  }
  static simpleFetch(endPoint, method, urlParams) {
    let requestData = {
      method
    };
    return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
      urlParams
    )}`,
    requestData
  ).then(response => response.json());
  }
}

export default class FoursquareAPI {
  static search(urlParams) {
    return Helper.simpleFetch("/venues/search", "GET", urlParams);
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
