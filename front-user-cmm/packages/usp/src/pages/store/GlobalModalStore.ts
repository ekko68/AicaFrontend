import create from 'zustand';
import {
  ModalParam,
  SnackbarParam,
} from '../../components/SharedModalComponents';
import { RouteType } from '~/models/RouteType';
import { TermCdType } from '~/models/Model';
import {useCallback, useEffect, useState} from 'react';

interface State {
  modal: ModalParam[];
  addModal: (addParam: ModalParam) => void;
  closeModal: (closeModal: ModalParam) => void;
}
interface StateSnac {
  modal: SnackbarParam[];
  addSnackbar: (addParam: SnackbarParam) => void;
  closeSnackbar: (closeModal: SnackbarParam) => void;
}

interface SnsState {
  snsBox: SnsConf;
  setSns: (addParam: SnsConf) => void;
}

export type SnsConf = {
  isNaver: boolean;
  isKakao: boolean;
  isGoogle: boolean;
};

// export type SnsTokenType = {
//   naverToken: string
//   kakaoToken: string
//   googleToken: string
// };

interface OneState {
  one: One;
  setOne: (addParam: One) => void;
}

interface HeaderCssEvent {
  cssVars: string;
  changeCss: (addParam: string) => void;
}
export type One = {
  data: any;
  timeList: any;
  date: string;
};

export type SnsCallbackConf = {
  isConf: boolean;
  isDel: boolean;
};

//전역 스토어 생성
type routeType = {
  routes: RouteType[];
  type: string;
};

type niceType = {
  type: string;
  viewId: string;
  mobileNo: string;
  memberType: string;
  sesionId: string;
  joinKey: string;
  setSesionId: (sesionId: any) => void;
  setJoinKey: (joinKey: any) => void;
  setType: (setType: any) => void;
  setViewId: (setViewId: any) => void;
  setMobileNo: (setMobileNo: any) => void;
  setMemberType: (setMemberType: any) => void;
};

// 공통 모델창 스토어
export const useHeaderCssEvent = create<HeaderCssEvent>((set) => ({
  cssVars: '',
  changeCss: (addParam: string) => {
    set((state) => ({
      cssVars: addParam,
    }));
  },
}));

// 공통 모델창 스토어
export const useGlobalModalStore = create<State>((set) => ({
  modal: [],
  addModal: (addParam: ModalParam) => {
    set((state) => ({
      modal: [...state.modal, addParam],
    }));
  },
  closeModal: (closeModal: ModalParam) => {
    set((state) => ({
      modal: state.modal.filter((f) => f != closeModal),
    }));
  },
}));

// 공통 모델창 스넵바
export const useGlobalSnackbarStore = create<StateSnac>((set) => ({
  modal: [],
  addSnackbar: (addParam: SnackbarParam) => {
    set((state) => ({
      modal: [...state.modal, addParam],
    }));
  },
  closeSnackbar: (closeModal: SnackbarParam) => {
    set((state) => ({
      modal: state.modal.filter((f) => f != closeModal),
    }));
  },
}));

// 공통 모델창 스넵바
export const useGlobalSnsStore = create<SnsState>((set) => ({
  snsBox: {
    isNaver: false,
    isKakao: false,
    isGoogle: false,
  },
  setSns: (setParam: SnsConf) => {
    set((state) => ({
      snsBox: {
        ...state.snsBox,
        isNaver: setParam.isNaver,
        isKakao: setParam.isKakao,
        isGoogle: setParam.isGoogle,
      },
    }));
  },
}));

// 공통 모델창 스넵바
export const useGlobalOne = create<OneState>((set) => ({
  one: {
    data: [],
    timeList: [],
    date: '',
  },
  setOne: (setParam: One) => {
    set((state) => ({
      one: {
        ...state.one,
        data: setParam.data,
        timeList: setParam.timeList,
        date: setParam.date,
      },
    }));
  },
}));

// 공통 스크롤 이벤트 스토어
export const useGlobalScroll = create((set) => ({
  scrollActive: false,
  setScroll: (setParam: boolean) => {
    set((state: any) => (state.scrollActive = setParam));
  },
}));

export const useScroll = () => {
  const [isContraction, setContraction] = useState(false)
  const [scrollY, setScrollY] = useState(window.scrollY)
  const [lastScrollY, setLastScrollY] = useState<number>(0)
  const [direction,setDirection] = useState(false)
  const handlerScroll = useCallback(
    (e) => {

      if (window.scrollY > 1 && !isContraction) setContraction(true)
      else if (window.scrollY <= 1 && isContraction) setContraction(false)
      setScrollY(window.scrollY)

      const scrollY = window.scrollY;
  
      // 이전의 스크롤 위치와 비교하기
      if(scrollY > lastScrollY){
        setDirection(true) // Scroll Down
      } else {
        setDirection(false) // Scroll Down
      }
      
      // 현재의 스크롤 값을 저장
      setLastScrollY(scrollY);
      
    }, [scrollY])

  useEffect(() => {
    setScrollY(window.scrollY);
    window.addEventListener('scroll', handlerScroll);
    return () => {
      window.removeEventListener('scroll', handlerScroll);
    }
  }, [handlerScroll])

  return {
    scrollY,
    isContraction,
    direction
  }
}

export const useRoutesStore = create<routeType>(() => ({
  routes: [],
  type: '',
}));
export const useConfigStore = create<TermCdType>((set) => ({
  possessTermCd: '',
}));
// 본인인증 서비스 결과 저장
export const useNiceStore = create<niceType>((set) => ({
  sesionId: '',
  joinKey: '',
  type: '',
  viewId: '',
  mobileNo: '',
  memberType: '',
  setSesionId: (sesionId: string) => {
    set((state) => ({
      sesionId: sesionId,
    }));
  },
  setJoinKey: (joinKey: string) => {
    set((state) => ({
      joinKey: joinKey,
    }));
  },
  setType: (type: string) => {
    set((state) => ({
      type: type,
    }));
  },
  setViewId: (viewId: string) => {
    set((state) => ({
      viewId: viewId,
    }));
  },
  setMobileNo: (mobileNo: string) => {
    set((state) => ({
      mobileNo: mobileNo,
    }));
  },
  setMemberType: (memberType: string) => {
    set((state) => ({
      memberType: memberType,
    }));
  },
}));
