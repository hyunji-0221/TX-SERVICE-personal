'use client';

import { ProductModel } from "@/api/product/model/product";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../../redux/common/enums/API";
import { useRouter } from "next/navigation";
import { PG } from "../../../../redux/common/enums/PG";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";

declare global {
    interface Window {
        IMP: any;
    }
}

const ProductPage: NextPage = () => {

    const router = useRouter();

    const [userId, setUserId] = useState('');

    const [products, setProducts] = useState<ProductModel[]>([]);
    useEffect(() => { // 무상태 x -> service로 분리시킬것..

        if (parseCookies().accessToken === undefined) {
            router.push(`${PG.LOGIN}`)
        } else {
            const token = jwtDecode<any>(parseCookies().accessToken);
            setUserId(token.userId);
            fetch(`${API.SERVER}/product/list`, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    const fetchedProducts: ProductModel[] = data.map((item: any) => (
                        {
                            id: item.productId,
                            title: item.title,
                            amount: item.amount,
                            buildingType: item.buildingType,
                            contractType: item.contractType,
                            address: item.address,
                            sold: item.sold,
                        }
                    ));
                    setProducts(fetchedProducts);
                })
                .catch((error) => console.error('Error:', error))
        }
    }, [])

    const loadScript = (src: any) => {
        return new Promise((resolve: any, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.head.appendChild(script);
        });
    };



    const requestPay = async (product: ProductModel) => {
        console.log('결제하기 클릭 : ' + product.id);
        const userEmail = 'testUserEmail'
        try {
            // jQuery와 iamport 스크립트 로드
            await loadScript('https://code.jquery.com/jquery-1.12.4.min.js');
            await loadScript('https://cdn.iamport.kr/js/iamport.payment-1.1.7.js');

            const { IMP } = window;
            IMP.init('imp05080136');

            IMP.request_pay(
                {
                    pg: 'kakaopay',
                    pay_method: 'card',
                    merchant_uid: `mid_${new Date().getTime()}`,
                    name: product.title,
                    custom_data: product.id,
                    amount: product.amount,
                    buyer_email: userEmail,
                    buyer_name: userId,
                },
                async (rsp: any) => {
                    if (rsp.success) {
                        try {
                            const { data } = await axios.post(`${API.SERVER}/payment/verifyIamport/${rsp.imp_uid}`, {}, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${parseCookies().accessToken}`,
                                },
                            }); // 프록시 사용
                            console.log(data.response.amount);
                            if (rsp.paid_amount === data.response.amount) {
                                alert('결제 성공');
                                router.push(`${PG.MYPAGE}` + `/${userId}`);
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
        } catch (error) {
            console.error('Failed to load scripts:', error);
            alert('결제 모듈 로드 실패');
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <div key={product.id}
                    className="bg-white shadow-[0_8px_12px_-6px_rgba(0,0,0,0.2)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4" >
                    <img
                        src="https://readymadeui.com/cardImg.webp"
                        alt={product.title}
                        className="w-full rounded-lg"
                    />
                    <div className="px-4 my-6 text-center">
                        <h3 className="text-lg font-semibold text-black">{product.title}</h3>
                        <p className="mt-2 text-sm text-gray-400">
                            {product.amount}
                        </p>
                        {!(userId === undefined) && <button
                            type="button"
                            className="px-6 py-2 w-full mt-4 rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
                            onClick={() => requestPay(product)}>
                            결제하기
                        </button>}
                    </div>
                </div>
            ))}
        </div>

    );
}

export default ProductPage;