import _token from './token.helper'

const options = {
  get: function (method) {
    return {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + _token.token.get()
      }
    }
  },
  post: function (method, reqBody) {
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
