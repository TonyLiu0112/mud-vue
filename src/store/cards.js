import _content from '../../static/content'
import _fetch from '../../static/fetch.helper'
import _router from '../../src/router'

const state = {
  all: {}
}

const storeOps = {
  add: function (productId, count) {
    this._store(productId, count, 1)
  },
  sub: function (productId) {
    this._store(productId, 1, 2)
  },
  remove: function (productId) {
    const reqBody = {productId: productId}
    const uri = _content.API_PATH.URI + 'shoppingcard/shoppingcards'
    fetch(uri, _fetch.options.delete(reqBody))
      .then(response => {
        const status = response.status
        if (status === 204) {
          return response.json()
        }
        if (status === 404) {
          console.log('未找到删除的资源')
        }
        if (status === 500) {
          console.error('内部服务错误')
        }
        throw Error(response.statusText)
      })
      .then(json => {
        _router.push('/shoppingcard/list')
      })
      .catch(error => console.error(error))
  },
  _store: function (productId, count, ops) {
    const reqBody = {productId: productId, amount: count, opsType: ops}
    const uri = _content.API_PATH.URI + 'shoppingcard/shoppingcards'
    fetch(uri, _fetch.options.post(reqBody))
      .then(response => {
        const status = response.status
        if (status === 201) {
          return response.json()
        }
        if (status === 404) {
          console.log('未找到请求')
        }
        if (status === 500) {
          console.error('内部服务错误')
        }
        throw Error(response.statusText)
      })
      .then(json => {
        _router.push('/shoppingcard/list')
      })
      .catch(error => console.error(error))
  }
}

const action = {
  addProduct: function (state, product) {
    if (state.all.hasOwnProperty(product.id)) {
      state.all[product.id].count++
    }
    state.all[product.id] = {info: product, count: 1}
    storeOps.add(product.id, 1)
  },
  subCount: function (state, productId) {
    state.all[productId].count--
    storeOps.sub(productId)
  },
  removeProduct: function (state, productId) {
    delete state.all[productId]
    storeOps.remove(productId)
  }
}

const mutations = {}

const getters = {
  getAll: function (state) {
    return {
      cards: state.all
    }
  },
  getCount: function (state) {
    let count = 0
    for (const key in state.cards) {
      if (state.cards.hasOwnProperty(key)) {
        const p = state.cards[key]
        count += p.count
      }
    }
    return count
  }
}

export default {
  state, action, mutations, getters
}
