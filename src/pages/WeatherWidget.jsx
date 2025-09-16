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
        href="https://forecast7.com/en/30d27n97d74/austin/?unit=us"
        data-label_1="AUSTIN"
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
