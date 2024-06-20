'use client';
import axios from "axios";
import { useState } from "react";
import { API } from "../../../../redux/common/enums/API";
import { parseCookies } from "nookies";

declare global {
    interface Window {
        IMP: any;
    }
}

export default function Navbar() {

    interface productFiled {
        atcNm: string; //빌딩명
        rletTpNm: string; //빌딩유형
        tradToNm?: string;  //거래유형
        flrInfo: string; //층정보
        prc: string; //가격 / 월세는 보증금으로 사용됨
        // children?: MenuItem[];
    }

    const [fee, setFee] = useState<number>(0);


    const [billingKey, setBillingKey] = useState<string>('');

    const loadScript = (src: any) => {
        return new Promise((resolve: any, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    };

    const hadleSubmit = async () => {
        console.log('handel submit function 내부')

        await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
        await loadScript('https://cdn.iamport.kr/js/iamport.payment-1.1.7.js');

        // const PORTONE_API_SECRET = 'show19RFlbVGhUDoGOKYb8WbrpoEnJaYFaKwGR4kx4IuOuLIAohAwG34Vurk4Yfxcb69jB3MeevMR95R'

        // const issueResponse = await fetch("https://api.portone.io/billing-keys", {
        //     method: "POST",
        //     headers: {
        //         Authorization: '6d43d72e278ccd51f67a62476427436fb371850e',
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         channelKey: 'channel-key-2f60e88a-c64a-4c21-9346-6298ddeb50ab',
        //         customer: {
        //             id: 'customerId',
        //         },
        //         method: {
        //             card: {
        //                 credential: {
        //                     number: '4481-2581-3819-6112',
        //                     expiryYear: '2029',
        //                     expiryMonth: '01',
        //                     birthOrBusinessRegistrationNumber: '000221',
        //                     passwordTwoDigits: '36',
        //                 },
        //             },
        //         },
        //     }),
        // });
        // if (!issueResponse.ok) {
        //     const errorText = await issueResponse.text();
        //     throw new Error(`issueResponse error: ${errorText}`);
        // }

        // const { billingKeyInfo } = await issueResponse.json();
        // const { billingKey } = billingKeyInfo;

        // console.log(`Billing Key: ${billingKey}`);

        const { IMP } = window;
            IMP.init('imp05080136');

            const merchant_uid = new Date().getTime();

            IMP.request_pay(
                {
                    pg: 'kakaopay',
                    // pg: 'html5_inicis',
                    merchant_uid: `mid-${merchant_uid}`,
                    name: '최초 결제 테스트',
                    amount: 1000,
                    customer_uid:  `cuid-${merchant_uid}`,
                    // custom_data: '',
                    buyer_email: 'buyer@email.com',
                    buyer_name: 'buyerName',
                    buyer_tel: '010-1234-5678',
                },
                async (rsp: any) => {
                    console.log('결제 후 rsp', rsp);
                    if (rsp.success) {
                        try {
                            alert('결제 성공');
                            const { data } = await axios.post(`${API.SERVER}/tx/add/${rsp.imp_uid}`, {}, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    // 'Authorization': `Bearer ${parseCookies().accessToken}`,
                                    'Authorization': `Bearer 6c07b36db4c3b5371441d84a53679d65274c40a5`,
                                },
                            }); // 프록시 사용
                            console.log(data.response.amount);
                            if (rsp.paid_amount === data.response.amount) {
                                alert('결제 성공');
                            } else {
                                alert('결제 실패: 금액 불일치');
                            }
                        } catch (error) {
                            console.error('결제 검증 실패:', error);
                            alert('결제 검증 실패');
                        }
                    } else {
                        alert(`결제 실패: ${rsp.error_msg}`);
                    }
                }
            );

    }


    return (
        <>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">빌딩 이름</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">빌딩 타입</label>
                        <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <div>
                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">거래 유형</label>
                        <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">층 정보</label>
                        <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    <div>
                        <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">가격 / 월세는 보증금 입력</label>
                        <input type="url" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" required />
                    </div>
                    {/* <div>
                        <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unique visitors (per month)</label>
                        <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </div> */}
                </div>
                {!billingKey && <div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                </div>}
                <button onClick={hadleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </>
    );
}

//-----------------------------------------------------아래 코드는 1차스프린트 코드------------------------------------------------

// 'use client'
// import React, { useEffect } from 'react';
// import axios from 'axios';

// declare global {
//   interface Window {
//     IMP: any;
//   }
// }

// const Payment: React.FC = () => {
//   useEffect(() => {
//     const jquery = document.createElement('script');
//     jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
//     const iamport = document.createElement('script');
//     iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
//     document.head.appendChild(jquery);
//     document.head.appendChild(iamport);
//     return () => {
//       document.head.removeChild(jquery);
//       document.head.removeChild(iamport);
//     };
//   }, []);

//   const requestPay = () => {
//     const { IMP } = window;
//     IMP.init('imp05080136');

//     IMP.request_pay(
//       {
//         pg: 'kakaopay',
//         pay_method: 'card',
//         merchant_uid: `mid_${new Date().getTime()}`,
//         name: '테스트 상품',
//         amount: 1004,
//         buyer_email: 'test@naver.com',
//         buyer_name: '코드쿡',
//         buyer_tel: '010-1234-5678',
//         buyer_addr: '서울특별시',
//         buyer_postcode: '123-456',
//       },
//       async (rsp: any) => {
//         if (rsp.success) {
//           try {
//             const { data } = await axios.post(`/api/payment/verifyIamport/${rsp.imp_uid}`); // 프록시 사용
//             console.log(data.response.amount);
//             if (rsp.paid_amount === data.response.amount) {
//               alert('결제 성공');
//             } else {
//               alert('결제 실패: 금액 불일치');
//             }
//           } catch (error) {
//             console.error('결제 검증 실패:', error);
//             alert('결제 검증 실패');
//           }
//         } else {
//           // 결제 실패
//           alert(`결제 실패: ${rsp.error_msg}`);
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <button
//         type="button"
//         className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-black outline-none bg-transparent hover:bg-black text-black hover:text-white transition-all duration-300"
//         onClick={requestPay}>결제하기</button>
//     </div>
//   );
// };

// export default Payment;
