import { useEffect } from "react";

export default function ChatIcon() {
  useEffect(() => {
    // Create and inject the Botpress scripts dynamically
    const injectScript = (src, id) => {
      if (!document.getElementById(id)) {
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;
        document.body.appendChild(script);
      }
    };

    injectScript("https://cdn.botpress.cloud/webchat/v2.4/inject.js", "botpress-inject");
    injectScript("https://files.bpcontent.cloud/2025/06/03/07/20250603072711-5J4MA5LS.js", "botpress-config");

    return () => {
      // Optional: cleanup scripts if needed
      const script1 = document.getElementById("botpress-inject");
      const script2 = document.getElementById("botpress-config");
      script1?.remove();
      script2?.remove();
    };
  }, []);

  return null; // No UI needed
}
