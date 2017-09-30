import _content from '../../static/content'
import _fetch from '../../static/fetch.helper'
import _router from '../../src/router'

/*
* Data format:
* {
*   productId: {
*     info: product,
*     count: 1
*   }
* }
*/
const state = {
  all: {}
}

const storeOps = {
  add: function (productId, count) {
    this._store(productId, count, 1)
  },
  sub: function (productId) {
    this._store(productId, -1, 2)
  },
  remove: function (productId) {
    const reqBody = {productId: productId}
    const uri = _content.API_PATH.URI + 'shoppingcard/shoppingcards'
    fetch(uri, _fetch.options.delete(reqBody))
      .then(response => {
        const status = response.status
        if (status === 204) {
          console.log('删除成功')
        } else if (status === 404) {
          console.log('未找到删除的资源')
        } else if (status === 500) {
          console.error('内部服务错误')
        } else {
          throw Error(response.statusText)
        }
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
        if (status === 401) {
          _router.push('/security/login')
          throw new Error('认证信息过期')
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

const actions = {
  addProduct: function (_state, product) {
    if (state.all.hasOwnProperty(product.id)) {
      state.all[product.id].count++
    } else {
      state.all[product.id] = {info: product, count: 1}
    }
    storeOps.add(product.id, 1)
  },
  subCount: function (_state, productId) {
    state.all[productId].count--
    storeOps.sub(productId)
  },
  removeProduct: function (_state, productId) {
    delete state.all[productId]
    storeOps.remove(productId)
  },
  initCards: function () {
    const uri = _content.API_PATH.URI + 'shoppingcard/shoppingcards'
    fetch(uri, _fetch.options.get())
      .then(response => {
        const status = response.status
        if (status === 200) {
          return response.json()
        }
        if (status === 401) {
          this.$router.push('/security/login')
          throw new Error('认证信息过期')
        }
        if (status === 404) {
          this.emptyList('未找到购物车信息!')
        }
        if (status === 500) {
          this.emptyList('内部服务错误!')
        }
        throw Error(response.statusText)
      })
      .then(json => {
        const shoppingcards = json.data
        shoppingcards.forEach(card => {
          state.all[card.productId] = {info: card.product, count: card.amount}
        })
      })
      .catch(error => console.error(error))
  }
}

const mutations = {}

const getters = {
  getAll: function () {
    return {
      cards: state.all
    }
  },
  shoppingcardAmount: function () {
    let count = 0
    for (const key in state.all) {
      if (state.all.hasOwnProperty(key)) {
        const p = state.all[key]
        count += p.count
      }
    }
    return count
  }
}

export default {
  state, actions, mutations, getters
}
