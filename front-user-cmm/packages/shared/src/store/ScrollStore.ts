import create from "zustand";

interface State {
  isContraction: boolean,
  isLocking: boolean,
  scrollDirection: 'down' | 'up',
  setContraction: (isContraction: boolean) => void
  setScrollDirection: (direction: 'down' | 'up') => void
  setLocking: (isLock: boolean) => void
}

export const useScrollStore = create<State>(set => ({
  isContraction: false,
  scrollDirection: 'up',
  isLocking: false,
  setContraction: (isContraction: boolean) => {
    set((state) => ({
      isContraction: isContraction
    }))
  },
  setScrollDirection: (direction: 'down' | 'up') => {
    set((state) => ({
      scrollDirection: direction
    }))
  },
  setLocking: (isLock: boolean) => {
    set((state) => ({
      isLocking: isLock,
    }))
  }
}))