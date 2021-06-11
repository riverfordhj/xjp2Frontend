import request from '@/utils/request'

export function login(data) {
  // debugger
  return request({
    url: '/auth/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/auth/GetUserInfo', // /user/info
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

export function UpdatePassword(formData){
	return request({
    url: '/auth/UpdatePassword', 
    method: 'post',
    data: formData
  })
}

export function getUsersData() {
  return request({
    url: '/auth/getUsersData', 
    method: 'get'
  })
}

export function resetUserPassword(FormList) {
  return request({
    url: '/auth/ResetPassword', 
		method: 'post',
    data: FormList
  })
}