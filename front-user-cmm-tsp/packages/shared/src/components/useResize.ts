import {useCallback, useEffect, useState} from "react";

export const useResize = () => {
  const [size, setSize] = useState<{ width: number, height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handlerResize = useCallback((e) => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [size])

  useEffect(() => {
    window.addEventListener("resize", handlerResize)
    return () => {
      window.removeEventListener("resize", handlerResize)
    }
  }, [handlerResize])

  return size
}

