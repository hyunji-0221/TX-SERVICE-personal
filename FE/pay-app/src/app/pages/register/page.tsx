'use client'
import { NextPage } from "next";
import { PG } from "../../../../redux/common/enums/PG";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../../../redux/common/enums/API";
import { useRouter } from "next/navigation";

const RegisterPage: NextPage = () => {

    const router = useRouter();

    type Inputs = {
        userName: string,
        password: string,
        email: string,
        name: string
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log('생성 버튼 클릭');
        axios.post(`${API.SERVER}/auth/register`, data)
            .then(response => {
                console.log('응답: ', response);
                if (response.data.message === 'SUCCESS') {
                    alert('회원가입 되셨습니다.');
                    router.push(`${PG.LOGIN}`);
                } else if (response.data.message === 'FAILURE') {
                    alert('회원가입에 실패했습니다.');
                    window.location.reload();
                }
            })
            .catch(error => console.log('회원가입 중 에러 발생 : ', error));
    };

    return (
        <div className="font-[sans-serif] bg-white text-[#333] md:h-screen">
            <div className="flex items-center p-6 h-full w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full mx-auto">
                    <div className="mb-12">
                        <h3 className="text-blue-500 md:text-3xl text-2xl font-extrabold max-md:text-center">계정 생성</h3>
                    </div>
                    <div>
                        <label className="text-xs block mb-2">아이디</label>
                        <div className="relative flex items-center">
                            <input {...register("userName",{required: true})} type="text" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="ID" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 24 24">
                                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-10">
                        <label className="text-xs block mb-2">비밀번호</label>
                        <div className="relative flex items-center">
                            <input {...register("password",{required: true})} type="password" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Password" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2 cursor-pointer" viewBox="0 0 128 128">
                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-10">
                        <label className="text-xs block mb-2">이메일</label>
                        <div className="relative flex items-center">
                            <input {...register("email",{required: true})}  type="text" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Email" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-10">
                        <label className="text-xs block mb-2">이름</label>
                        <div className="relative flex items-center">
                            <input {...register("name",{required: true})}  type="text" required className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none" placeholder="Name" />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                                <defs>
                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                    </clipPath>
                                </defs>
                                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="mt-12">
                        <button type="submit" className="w-full py-2.5 px-8 text-sm font-semibold rounded bg-blue-500 hover:bg-blue-600 text-white border focus:outline-none">
                            계정 생성
                        </button>
                        <p className="text-sm mt-8">이미 계정이 있으신가요? <a href={`${PG.LOGIN}`} className="text-blue-500 font-semibold hover:underline ml-1">로그인</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default RegisterPage;