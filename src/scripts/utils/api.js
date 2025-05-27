class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

getAppInfo(){
  return Promise.all([this.getInitialCards()]);
}

  getUserInfo() {
    return fetch()
  }

getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
  })
  .then((res) => {
         if (res.ok) {
         return res.json();
       }
       // if the server returns an error, reject the promise
       return Promise.reject(`Error: ${res.status}`);
     });
     }
}

export default Api;
