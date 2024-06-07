'use client'
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { API } from "../../../../redux/common/enums/API";
import { PG } from "../../../../redux/common/enums/PG";
import AxiosConfig from "../../../../redux/common/configs/axios-config";
import { useForm, SubmitHandler } from "react-hook-form"
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { parseCookies, setCookie } from "nookies";

const LoginPage: NextPage = () => {

    const router = useRouter();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (e: any) => {
        setUsername(e.target.value)
    }
    const handlePW = (e: any) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data = { userName, password }

        axios.post(`${API.SERVER}/auth/login`, data )
            .then(res => {
                console.log(res.data)
                const message = res.data.message
                if (message === 'SUCCESS') {
                    setCookie(null, 'accessToken', res.data.accessToken, {
                        maxAge: 24 * 60 * 60, 
                        path: '/', 
                    });
                    router.push(`${PG.PRODUCT}`)
                } else if (message === 'FAILURE') {
                    alert("Fail")
                } else {
                    alert("지정되지 않은 값")
                }
            })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="space-y-4 font-[sans-serif] max-w-md">
                <input onChange={handleId} type="text" placeholder="Enter Email"
                    className="text-black px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded" />

                <input onChange={handlePW} type="password" placeholder="Enter Password"
                    className="text-black px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-transparent focus:border-blue-500 rounded" />

                <button type="submit" onClick={handleSubmit}
                    className="w-full px-4 py-2.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
            </form>
        </div>

    );
}

export default LoginPage