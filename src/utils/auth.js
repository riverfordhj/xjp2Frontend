import Cookies from 'js-cookie'

const TokenKey = 'xjp_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return Cookies.set(TokenKey, token, {secure: true})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
