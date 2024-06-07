import axios, { AxiosInstance } from 'axios'
import { parseCookies } from 'nookies'


export default function instance(){
    const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL })
    setInterceptor(instance)
    return instance
}

export const setInterceptor = (inputInstance:AxiosInstance)=>{
    inputInstance.interceptors.request.use(
        (config)=>{
            console.log('Axios interceptor에서 쿠키에서 토큰을 추출함')
            config.headers['Content-Type'] = "application/json"
            config.headers['Authorization'] = `Bearer ${parseCookies().accessToken}`
            return config
        },
        (error)=>{
            console.log('Axois interceptor 에서 발생된 error '+error)
            return Promise.reject(error)
        }
    )

    inputInstance.interceptors.response.use(
        (response)=>{
            if(response.status === 404){
                console.log('Axios interceptor respose에서 발생한 404 error / 토큰이 없어서 404로 넘어감')
            }
            return response
        }
    )

    return inputInstance
}


