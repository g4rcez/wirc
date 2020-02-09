import { useEffect, useRef } from "react";

const useBlockScroll = (visible: boolean) => {
  const domRef = useRef({ overflowY: document.body.style.overflowY });

  useEffect(() => {
    if (visible) {
      document.body.style.overflowY = "hidden";
      document.documentElement.style.overflowY = "hidden";
    } else {
      domRef.current.overflowY = document.body.style.overflowY;
      document.body.style.overflowY = domRef.current.overflowY;
      document.documentElement.style.overflowY = domRef.current.overflowY;
    }
    return () => {
      document.body.style.overflowY = domRef.current.overflowY;
      document.documentElement.style.overflowY = domRef.current.overflowY;
    };
  }, [visible]);
};

export default useBlockScroll;
