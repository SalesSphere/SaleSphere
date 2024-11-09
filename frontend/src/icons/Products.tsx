import * as React from "react";

function Products(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2 2h1.74c1.08 0 1.93.93 1.84 2l-.83 9.96a2.796 2.796 0 002.79 3.03h10.65c1.44 0 2.7-1.18 2.81-2.61l.54-7.5c.12-1.66-1.14-3.01-2.81-3.01H5.82M9 8h12m-3.5 12.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zm-8 0a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
        stroke="#292D32"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoProducts = React.memo(Products);
export default MemoProducts;
