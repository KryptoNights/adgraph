import { useEffect, useState } from "react";
import { useMemo } from "react";

const useDetectDevice = () => {
  const [windowSize, setWindowSize]: any = useState({
    width: 1200,
    height: 1200,
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Don't forget to remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deviceInfo = useMemo(() => {
    return {
      isMobile: windowSize?.width <= 550 ? true : false,
      isTabSmall: windowSize?.width <= 750 ? true : false,
      isTabLarge: windowSize?.width <= 1200 ? true : false,
    };
  }, [windowSize]);

  return deviceInfo;
};

export default useDetectDevice;
