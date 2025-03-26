import * as React from "react";

const Wave = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={1600} height={198} {...props}>
    <defs>
      <linearGradient id="a" x1="50%" x2="50%" y1="-10.959%" y2="100%">
        <stop stopColor="#B7E8EB" stopOpacity={0.5} offset="0%" />
        <stop stopColor="#fff" offset="100%" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
      transform="matrix(-1 0 0 1 1600 0)"
    />
  </svg>
);

export default Wave;