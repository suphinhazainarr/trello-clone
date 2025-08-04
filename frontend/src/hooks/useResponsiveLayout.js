import { useState, useEffect } from "react";

export function useResponsiveLayout(breakpoint = 768) {
  const [layout, setLayout] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < breakpoint ? "mobile" : "desktop"
  );

  useEffect(() => {
    function handleResize() {
      setLayout(window.innerWidth < breakpoint ? "mobile" : "desktop");
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return layout;
}