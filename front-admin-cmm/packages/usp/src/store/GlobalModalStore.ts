import create from "zustand";
import {ModalParam, SnackbarParam} from "../../../shared/src/components/SharedModalComponents";
import { RouteType } from "~/models/Model";

interface State {
  modal: ModalParam[],
  addModal: (addParam:ModalParam) => void
  closeModal: (closeModal:ModalParam) => void
}
interface StateSnac {
  modal: SnackbarParam[],
  addSnackbar: (addParam:SnackbarParam) => void
  closeSnackbar: (closeModal:SnackbarParam) => void
}

interface SnsState {
  snsBox: SnsConf,
  setSns: (addParam:SnsConf) => void
}

export type SnsConf = {
  isNaver:boolean,
  isKakao:boolean,
  isGoogle:boolean
}

interface OneState {
  one : One,
  setOne: (addParam:One) => void
}

export type One = {
  data:any,
  timeList:any,
  date:string
}

export type SnsCallbackConf = {
  isConf:boolean,
  isDel:boolean,
}

//전역 스토어 생성
type routeType= {
  routes:RouteType[],
  type:string
}

// 공통 모델창 스토어
export const useGlobalModalStore = create<State>(set => ({
  modal: [],
  addModal: (addParam:ModalParam) => {
    set((state) => ({
      modal: [...state.modal, addParam]
    }))
  },
  closeModal: (closeModal: ModalParam) => {
    set((state) => ({
      modal: state.modal.filter(f => f != closeModal)
    }))
  },
}))

// 공통 모델창 스넵바
export const useGlobalSnackbarStore = create<StateSnac>(set => ({
  modal: [],
  addSnackbar: (addParam:SnackbarParam) => {
    set((state) => ({
      modal: [...state.modal, addParam]
    }))
  },
  closeSnackbar: (closeModal: SnackbarParam) => {
    set((state) => ({
      modal: state.modal.filter(f => f != closeModal)
    }))
  },
}))

// 공통 모델창 스넵바
export const useGlobalSnsStore = create<SnsState>(set => ({
  snsBox: {
    isNaver:false,
    isKakao:false,
    isGoogle:false
  },
  setSns: (setParam:SnsConf) => {
    set((state) => ({
      snsBox: {
        ...state.snsBox,
        isNaver:setParam.isNaver,
        isKakao:setParam.isKakao,
        isGoogle:setParam.isGoogle
      }
    }))
  }
}))

// 공통 모델창 스넵바
export const useGlobalOne = create<OneState>(
  set => ({
  one: {
    data:[],
    timeList:[],
    date:""
  },
  setOne: (setParam:One) => {
    set((state) => ({
      one: {
        ...state.one,
        data:setParam.data,
        timeList:setParam.timeList,
        date:setParam.date
      }
    }))
  }
}))

// 공통 스크롤 이벤트 스토어
export const useGlobalScroll = create(
  set => ({
    scrollActive: false,
    setScroll: (setParam:boolean) => {
      set((state:any) => (
        state.scrollActive = setParam
      ))
    }
}))

export const useRoutesStore = create<routeType>( () => ({routes:[],type:''}))