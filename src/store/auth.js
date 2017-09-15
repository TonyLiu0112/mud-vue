const state = {
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwib3JnYW5pemF0aW9uIjoiYWNtZWV2U2kiLCJleHAiOjE1MDU0OTY5NjksInVzZXIiOnsiaWQiOjEsImxvZ2luTmFtZSI6ImFkbWluIiwibmlja25hbWUiOiLotoXnuqfnrqHnkIblkZgiLCJwaG9uZSI6IjE4NzIxNzkwNzM1IiwiZW1haWwiOiJ0b255LmxpdTAxMTJAZ21haWwuY29tIiwic2V4IjoxLCJyb2xlcyI6bnVsbH0sImp0aSI6ImIzZWIxYmEyLWRjMjctNGNiZC04MjZjLWY0NWM2MTM4ZTkzNSIsImNsaWVudF9pZCI6ImFjbWUifQ.eCri_ElaUlhDGHrz_VFDZrLfbxAIdp3-JZnoY5KpYkO-RIbl5EC0f-4ZVhVrsQ8fl7tuUjQEKr7KVSwzxmnuBkQdFhKbmY6tghk3X7NHwEzwbYwAWqZEpeOsp40bN2aD4LnBFFux7HrwO7dMkB6eLbaNvCXArI317ugFXFwsztQALBz3YAPWK4EKrTJGJJ-80JKyZwG9GBasib4WOQz24OoZgRKIelWgQcSDVuQmQ7v8B-jlzJR0d6kfzlLRRP7fDVoOX2xkmQOEA0zWY1DcQl8QHF18F2AFtozwaMc9e5XRsXLPeRaS12EduOwkaUVgUBbLSnPpasNowQLH-7bBiA'
}

const action = {}

const mutations = {}

const getters = {
  token (state) {
    return state.token
  },
  fetchOptions (state) {
    return {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + state.token
      }
    }
  }
}

export default {
  state,
  action,
  mutations,
  getters
}
