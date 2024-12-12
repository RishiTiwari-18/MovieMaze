
import React from "react";

const LazyIframe = ({ src, allow, allowFullScreen }) => {
  return (
    <iframe
      width="100%"
      height="100%"
      src={src}
      allow={allow}
      allowFullScreen={allowFullScreen}
      loading="lazy"
    ></iframe>
  );
};

export default LazyIframe;