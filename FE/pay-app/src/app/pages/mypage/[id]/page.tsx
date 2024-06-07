'use client'
import { OrderProductModel } from "@/api/order/model/orderProduct";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { API } from "../../../../../redux/common/enums/API";
import { parseCookies } from "nookies";

const MyPage: NextPage = (props:any) => {
  const [orderList, setOrderList] = useState('');

  const [orders, setOrders] = useState<OrderProductModel[]>([]);

  useEffect(() => {
    fetch(`${API.SERVER}/order/list`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${parseCookies().accessToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const fetchOrder: OrderProductModel[] = data.map((item: any) => (
          {
            orderId: item.orderId,
            merchantUid: item.merchantUid,
            orderDate: item.orderDate,
            amount: item.amount,
            buildingType: item.buildingType,
            contractType: item.contractType,
            address: item.address,
          }
        ));
        setOrders(fetchOrder)
      })
      .catch((error) => console.error('Error:', error))
  }, [])

  return (
    <div>
      {orders.length === 0 && <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl font-bold text-gray-700">
        주문 내역이 없습니다.
      </div>
    </div>}
      {orders.map((order) => (
        <div key={order.orderId} className="bg-white px-6 py-8 shadow-[0_2px_12px_-6px_rgba(0,0,0,0.2)] w-full max-w-3xl rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 flex">
        <div className="w-full md:w-2/3">
          <h3 className="text-[#333] text-lg font-semibold mb-4">주문번호 : {order.merchantUid}</h3>
          <div className="flex flex-col">
            <div className="text-lg text-[#333] mb-2">빌딩 타입 : {order.buildingType} / {order.contractType}</div>
            <div className="text-lg text-[#333] mb-2">주소 : {order.address}</div>
            <div className="text-lg text-[#333] mb-2">가격 : {order.amount}</div>
            <div className="text-lg text-[#333] mb-2">결제일 : {order.orderDate}</div>
          </div>
        </div>
        <div className="w-1/3 flex justify-end">
          <img src="https://readymadeui.com/cardImg.webp" className="w-32 h-32 rounded-lg" />
        </div>
      </div>
      

      ))}


    </div>
  );
}

export default MyPage;