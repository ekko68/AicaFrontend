import create from "zustand";
import {ModalParam} from "shared/components/ModalComponents";

interface State {
  isDesktop: boolean,
  isTopOpacity: boolean,
  device: 'mobile' | 'pc'
  setScreenMode: (isDesktop: boolean) => void
  setTopOpacity: (isTopOpacity: boolean) => void
  setDevice: (device: 'mobile' | 'pc') => void
}

export const useGlobalConfigStore = create<State>(set => ({
  isDesktop: window.innerWidth > 768,
  device: 'pc',
  isTopOpacity: true,
  setScreenMode: (isDesktop: boolean) => {
    set((state) => ({
      isDesktop: isDesktop
    }))
  },
  setTopOpacity: (isTopOpacity: boolean) => {
    set((state) => ({
      isTopOpacity: isTopOpacity
    }))
  },
  setDevice: (device: 'mobile' | 'pc') => {
    set((state) => ({
      device: device
    }))
  },
}))