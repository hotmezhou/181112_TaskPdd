/*
ajax请求函数模块
返回值: promise对象(异步返回的数据是: response.data)
 */
import axios from 'axios'
import router from '../router'

export default function ajax(url, data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        // 执行异步ajax请求
        let promise
        if (type === 'GET') {
            // 准备url query参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url)
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }
        promise.then(function (response) {
            // 成功了调用resolve()
            resolve(response.data)
        }).catch(function (error) {
            //失败了调用reject()
            reject(error)
        })
    })
}

// //http request 请求拦截器
// axios.interceptors.request.use(config => {
//     const token = localStorage.getItem('token')
//     if (token) {
//         config.headers.Authorization = token
//     }
//     // if (!token) {
//     //     router.replace({
//     //         path: 'login',
//     //         query: {redirect:router.currentRoute.fullPath}
//     //     })
//     // }
//     return config;
// })

//http response 相应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === -1){
            router.replace({
                path: 'login',
                query:{redirect:router.currentRoute.fullPath}
            })
        }
        return response
    }
)
/*
const response = await ajax()
const result = response.data
const resule = await ajax()
 */
