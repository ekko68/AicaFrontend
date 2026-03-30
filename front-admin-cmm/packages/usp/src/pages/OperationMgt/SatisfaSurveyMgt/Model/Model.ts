import {WithCustomRowData} from "shared/components/TableComponents";
import {전문가정보리스트} from "~/pages/OperationMgt/ExpertMgt/Model/Model";

export interface SearchParam {
  포털구분?: string /*포털구분*/
  진행상태?: string /*진행상태*/
  시작일?: number /*시작일*/
  종료일?: number /*종료일*/
  설문자명?: string /*설문자명*/
}

export const 포털구분 = ['사용자지원포털', '실증지원포털', '안심구역포털', '데이터유통포털']
export const 진행상태 = ['대기', '진행중', '종료']

export interface 만족도조사리스트 {
  id: string
  진행상태: string
  설문지명: string
  포털구분: string
  시작일: number
  종료일: number
  사용: boolean
  중복응답: boolean
  등록일: number
}

export interface 설문지등록 {
  설문지명: string
  포털구분: string
  진행시작일자: number
  진행시종료일자: number
  사용여부: boolean
  중복응답: boolean
  설명: string
}

export interface 설문지기본정보 {
  등록일: number
  진행상태: string
  설문지경로: string
  설문지명: string
  포털구분: string
  진행시작일자: number
  진행시종료일자: number
  사용여부: boolean
  중복응답: boolean
  설명: string
}

export type 질문유형 = '주관식유형' | '라디오버튼형' | '체크박스형'
export interface 질문데이터 {
  id: string
  질문유형: 질문유형
  필수여부: boolean
  질문: string
  항목?: string[]
}
export interface 질문답변데이터{
  id: string
  데이터: 질문데이터
  응답자수: number
  항목선택수?: number[]
  답변?: string[]
}

export interface 응답자{
  id: string
  회원유형: string
  이름: string
  아이디: string
}

export const dummySurveyList:WithCustomRowData<만족도조사리스트>[] = [
  {
    key: '1',
    id: '1',
    진행상태: '대기',
    설문지명: '설문지명 출력',
    포털구분: '사용자지원포털',
    시작일: 1660815022610,
    종료일: 1660815022610,
    사용: true,
    중복응답: true,
    등록일: 1660815022610,
  },{
    key: '2',
    id: '2',
    진행상태: '진행중',
    설문지명: '설문지명 출력',
    포털구분: '사용자지원포털',
    시작일: 1660815022610,
    종료일: 1660815022610,
    사용: false,
    중복응답: true,
    등록일: 1660815022610,
  },{
    key: '3',
    id: '3',
    진행상태: '종료',
    설문지명: '설문지명 출력',
    포털구분: '실증지원포털',
    시작일: 1660815022610,
    종료일: 1660815022610,
    사용: true,
    중복응답: false,
    등록일: 1660815022610,
  }
]
export const dummyRespondentList:WithCustomRowData<응답자>[] = [
  {
    key: '1',
    id: '1',
    회원유형: '개인',
    이름: '홍길동',
    아이디: 'YellowLemon'
  },{
    key: '2',
    id: '2',
    회원유형: '개인',
    이름: '이미숙',
    아이디: 'BananaApple'
  },{
    key: '3',
    id: '3',
    회원유형: '법인사업자',
    이름: '(주)블루레몬',
    아이디: 'BlueLemon'
  },{
    key: '4',
    id: '4',
    회원유형: '대학',
    이름: '서울대학교',
    아이디: 'GreenApple'
  },
]
export const dummyResult:질문답변데이터[] = [
  {
    id: '1',
    데이터: {
      id: '1',
      질문유형: '체크박스형',
      질문: '다음 중 좋아하는 것을 모두 고르시오',
      항목: ['항목1', '항목2', '항목3', '항목4'],
      필수여부: true
    },
    응답자수: 4,
    항목선택수: [3, 1, 0, 5]
  },{
    id: '2',
    데이터: {
      id: '2',
      질문유형: '라디오버튼형',
      질문: '싫어하는 것을 하나만 고르시오',
      항목: ['항목1', '항목2', '항목3'],
      필수여부: true
    },
    응답자수: 10,
    항목선택수: [2, 6, 2]
  },{
    id: '3',
    데이터: {
      id: '3',
      질문유형: '주관식유형',
      질문: '아무말이나 적어주세요',
      필수여부: true
    },
    응답자수: 3,
    답변: ['좋은 정보 감사합니다', '잘 사용하고 있습니다. 수고하세요.', '데이터가 좀 더 많이 있으면 좋겠습니다.']
  },
]