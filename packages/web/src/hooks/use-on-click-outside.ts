import React, { useEffect } from "react";

const useOnClickOutside = (
  ref: React.MutableRefObject<any>,
  handler: React.EventHandler<any>
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current === null || ref!.current!.contains(event.target)) {
        return;
      }
      return handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;