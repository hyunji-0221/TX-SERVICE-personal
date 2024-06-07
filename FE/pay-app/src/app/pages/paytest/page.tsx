// import React from 'react';

// declare global {
//   interface Window {
//     IMP: any;
//   }
// }

// const Payment: React.FC = () => {
//   const onPayment = () => {
//     console.log('결제하기 버튼 클릭'+window.IMP);
//     if (!window.IMP) return;
//     const { IMP } = window;
//     IMP.init('YOUR_IMP_CODE'); // 아임포트 코드로 초기화

//     IMP.request_pay({
//       pg: 'html5_inicis', // PG사 선택
//       pay_method: 'card', // 결제수단
//       merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
//       name: '테스트 결제', // 상품명
//       amount: 1000, // 결제 금액
//       buyer_email: 'example@example.com', // 구매자 이메일
//       buyer_name: '홍길동', // 구매자 이름
//       buyer_tel: '010-1234-5678', // 구매자 전화번호
//       buyer_addr: '서울특별시 강남구 삼성동', // 구매자 주소
//       buyer_postcode: '123-456', // 구매자 우편번호
//     }, (rsp: any) => {
//       if (rsp.success) {
//         alert('결제가 완료되었습니다.');
//       } else {
//         alert(`결제에 실패하였습니다. 에러내용: ${rsp.error_msg}`);
//       }
//     });
//   };

//   return (
//     <button className="bg-blue-500 text-white p-2 rounded" onClick={onPayment}>
//       결제하기
//     </button>
//   );
// };

// export default Payment;

'use client'
import React, { useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    IMP: any;
  }
}

const Payment: React.FC = () => {
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = () => {
    const { IMP } = window;
    IMP.init('imp05080136');

    IMP.request_pay(
      {
        pg: 'kakaopay',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        name: '테스트 상품',
        amount: 1004,
        buyer_email: 'test@naver.com',
        buyer_name: '코드쿡',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시',
        buyer_postcode: '123-456',
      },
      async (rsp: any) => {
        if (rsp.success) {
          try {
            const { data } = await axios.post(`/api/payment/verifyIamport/${rsp.imp_uid}`); // 프록시 사용
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
          // 결제 실패
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  };

  return (
    <div>
      <button
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-black outline-none bg-transparent hover:bg-black text-black hover:text-white transition-all duration-300"
        onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default Payment;
