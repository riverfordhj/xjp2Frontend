import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/GetUserInfo',///user/info
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
