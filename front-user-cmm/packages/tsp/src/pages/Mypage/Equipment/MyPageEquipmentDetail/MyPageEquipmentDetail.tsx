import React from "react";
import {useGlobalConfigStore} from "shared/store/GlobalConfigStore";
import {useParams} from "react-router-dom";
import {BeforeApproval} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/BeforeApproval";
import {AfterApproval} from "~/pages/Mypage/Equipment/MyPageEquipmentDetail/EquipmentDetailTabs/AfterApproval";

const MyPageEquipmentDetail = () => {
    const {isDesktop} = useGlobalConfigStore()
    const isMobile = !isDesktop;
    const params = useParams()
    return <>
        {
            params.id === '0' ?
            <BeforeApproval isMobile={isMobile} applyInfoProps={tempData}/> :
                <AfterApproval isMobile={isMobile} applyInfoProps={tempData}/>
        }
        </>
}

export interface ApplyInfoProps {
    applyNb: string; // 접수번호
    applyDt: string; // 신청일
    useSt: string; // 사용상태

    division: string; // 구분
    comNm: string; // 업체명
    name: string; // 이름
    spot: string; // 직위
    callNb: string; // 연락처
    email: string; // 이메일
    AI: string; // AI 집적단지 사업참여 여부

    equipKoNm: string; // 장비명 국문
    equipEgNm: string; // 장비명 영문
    modelNm: string; // 모델명
    equipNb: string; // 자산번호

    usePurpose: string; // 활용목적

    takeout: string; //반출여부
    takeoutDate: string; // 반출기간
    takeoutAddress: string; // 반출지 주소
    purpose: string; // 사유(용도)
    pledge: string; // 서약서
    carryExaminationResult: string // 반출심의 결과
    carryExaminationDetails: string // 반출심의 내용

    startDt: string; // 시작일
    endDt: string; // 종료일
    hourFare: string; // 1시간 사용료
    dayTime: string; // 1일 가용시간
    unit: string; // 수량 및 단위
    expectationFare: string // 예상 사용금액
    payment: string // 지불방법
    applyDiscount: string; // 할인적용
    discount: string; // 할인금액
    discountFare: string // 할인적용금액

    additionalAmounts: string // 추가금액
    reason: string // 청구사유

    carrySt: string // 반입상태
    completionDt: string // 처리상태

    file: string[] // 파일명
}

export interface ResultReport {
    processingSt: string; // 처리상태
    submitDt: string; // 제출일
    useField: string; // 활용분야
    equipKoNm: string; // 장비명 국문
    equipEgNm: string; // 장비명 영문
    modelNm: string; // 모델명
    equipNb: string; // 자산번호
    hourFare: string; // 1시간 사용료
    unit: string; // 수량 및 단위
    payment: string // 지불방법
    startDt: string; // 시작일
    endDt: string; // 종료일
    useTime: string; // 사용시간
    useFare: string; // 사용금액
    applyDiscount: string; // 할인적용
    discount: string; // 할인금액
    discountFare: string // 할인적용금액
    actualUseDt: string; // 실사용날짜
    actualUseTime: string; // 실사용시간
    actualUseFare: string; // 실사용금액
}

export interface PeriodExtensionDetailProps {
    id: string; // 번호
    useSt: string; // 사용상태
    extensionDt: string; //연장 신청기간
    useTime: string; //사용시간
    hourFare: string; //1시간 사용료
    useFare: string; //사용금액
    discountFare: string; //할인적용금액
    payment: string; //지불방법
}

export interface UsageChargeDetailProps {
    id: string; // 번호
    useDivision: string; // 사용구분
    division: string; // 구분 (날짜 및 청구사유 출력)
    fare: number; // 금액
}

export const usageTempData: UsageChargeDetailProps[] = [
    {
    id: '1',
    useDivision: '사용금액',
    division: '2021-11-01 ~ 2021-11-03',
    fare: 3000
    },
    {
        id: '2',
        useDivision: '기간연장',
        division: '2021-11-01 ~ 2021-11-03',
        fare: 1000
    },
    {
        id: '3',
        useDivision: '추가금액',
        division: '청구사유가 출력됩니다',
        fare: 1000
    }
    ]

export const periodTempData: PeriodExtensionDetailProps[] = [{
    id: '1',
    useSt: '신청',
    extensionDt: '2021-11-17 16시 25분 ~ 2021-11-20 18시 18분',
    useTime: '30',
    hourFare: '100',
    useFare: '1,000',
    discountFare: '2,100',
    payment: '선납'
},
    {
        id: '2',
        useSt: '신청',
        extensionDt: '2021-11-17 16시 25분 ~ 2021-11-20 18시 18분',
        useTime: '50',
        hourFare: '100',
        useFare: '2,000',
        discountFare: '1,100',
        payment: '선납'
    }]

export const resultTempData: ResultReport = {
    processingSt: '제출',
    submitDt: '2021-10-31',
    useField: '내용이 출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. 내용이 출력됩니다. ',
    equipKoNm: '자외선 및 IR 이미지 측정시스템',
    equipEgNm: 'UV @ IR image measurement system',
    modelNm: 'ABCDEDF',
    equipNb: '2021-1-20-32',
    hourFare: '100원',
    unit: '1',
    payment: '선납',
    startDt: '2021-11-16 09시 25분',
    endDt: '2021-11-19 18시 15분',
    useTime: '30시간',
    useFare: '3,000원',
    applyDiscount: '장비 활용이 공익성에 기여하는 경우 (30%)',
    discount: '900원',
    discountFare: '2,100원',
    actualUseDt: '2021-11-01 09시 ~ 2021-11-02 18시',
    actualUseTime: '35시간',
    actualUseFare: '2,500원'
}

export const tempData: ApplyInfoProps = {
    applyNb: '12345',
    applyDt: '2021-10-31',
    useSt: '신청',
    division: '법인사업자',
    comNm: '블루레몬',
    name: '홍길동',
    spot: '대리',
    callNb: '010-1111-2222',
    email: 'abc@gmail.com',
    AI: 'R&D',
    equipKoNm: '자외선 및 IR 이미지 측정시스템',
    equipEgNm: 'UV @ IR image measurement system',
    modelNm: 'ABCDEDF',
    equipNb: '2021-1-20-32',
    usePurpose: '활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적활용목적',
    takeout: '반출',
    takeoutDate: '2021-10-01 ~ 2021-10-01',
    takeoutAddress: '광주시 중구 1동',
    purpose: '직접 사용하기 위함 직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함직접 사용하기 위함',
    pledge: '서약서_홍길동.jpg',
    carryExaminationResult: '불가',
    carryExaminationDetails: '내용이 출력됩니다. 내용이 출력됩니다.',
    startDt: '2021-11-16 10시 15분',
    endDt: '2021-11-17 15시 25분',
    hourFare: '100원',
    dayTime: '8시간',
    unit: '1',
    expectationFare: '1,200원',
    payment: '선납',
    applyDiscount: '장비 활용이 공익성에 기여하는 경우 (30%)',
    discount: '300원',
    discountFare: '700원',
    additionalAmounts: '1,000원',
    reason: '사유가 출력됩니다',
    carrySt: '반입완료',
    completionDt: '2021-11-16 13:20',
    file: ['사업자 등록증.jpg', '등록증 사업자.pdf', '등록증 사업자.pdf', '등록증 사업자.pdf', '등록증 사업자.pdf', '등록증 사업자.pdf', '등록증 사업자.pdf'],
}



export default MyPageEquipmentDetail