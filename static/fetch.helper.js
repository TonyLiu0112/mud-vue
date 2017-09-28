import _token from './token.helper'

const options = {
  get: function () {
    return {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + _token.token.get()
      }
    }
  },
  post: function (reqBody) {
    return this._cores('post', reqBody)
  },
  delete: function (reqBody) {
    return this._cores('delete', reqBody)
  },
  put: function (reqBody) {
    return this._cores('put', reqBody)
  },
  _cores: function (method, reqBody) {
    return {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + _token.token.get()
      },
      body: JSON.stringify(reqBody)
    }
  }
}

export default {
  options
}
