
import React from "react";

const LazyImage = ({ src, alt }) => {
  return <img className="h-full w-full object-cover" src={src} alt={alt} loading="lazy" />;
};

export default LazyImage;