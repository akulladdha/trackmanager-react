import { useEffect } from "react";

export default function WeatherWidget() {
  useEffect(() => {
    if (window.__weatherwidget_init) {
      window.__weatherwidget_init(); // reinitialize after component mounts
    }
  }, []);

  return (
    
    <a
        className="weatherwidget-io"
        href="https://forecast7.com/en/40d38n74d53/south-brunswick-township/?unit=us"
        data-label_1="SOUTH BRUNSWICK"
        data-theme="original"
        data-basecolor="#1a1a1d"
        data-accent="rgba(0, 200, 150, 0.2)"
        data-highcolor="#00C896"
        data-suncolor="#00C896"
        data-snowcolor="#FFFFF"
        >
    SOUTH BRUNSWICK
    </a>
    
    
  );
}
