import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// let webapiBaseURL = undefined;
// axios.get('/appsetting.json').then((res) => {
// 	webapiBaseURL = res.data[0].webapiBaseURL;
// });

// create an axios instance
const service = axios.create({
  //baseURL: 'http://112.17.184.211:19898/XjpBackend2/api', // process.env.VUE_APP_BASE_API, // url = base url + request url
	baseURL: '/api',
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
  // headers: { 'Content-Type': 'application/json' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // debugger
    // config.baseURL = webapiBaseURL; //在请求发起前，修改baseURL
    // do something before request is sent
    // config.headers['Content-Type'] = 'application/json'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()

      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // debugger
    if (response.status === 200) { return response.data }

    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
