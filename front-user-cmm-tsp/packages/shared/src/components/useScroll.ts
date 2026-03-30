import React, {useCallback, useEffect, useState} from "react";

export const useScroll = () => {
  const [isContraction, setContraction] = useState(false)
  const [scrollY, setScrollY] = useState(window.scrollY)

  const handlerScroll = useCallback(
    (e) => {
      if (window.scrollY > 1 && !isContraction) setContraction(true)
      else if (window.scrollY <= 1 && isContraction) setContraction(false)

      setScrollY(window.scrollY)
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
  }
}