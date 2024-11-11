import * as React from "react";

function Card(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2 12c0-3.537 0-5.306 1.053-6.487.168-.189.354-.364.554-.522C4.862 4 6.741 4 10.5 4h3c3.759 0 5.638 0 6.892.99.201.16.387.334.555.523C22 6.693 22 8.463 22 12s0 5.306-1.053 6.487a4.376 4.376 0 01-.555.522C19.138 20 17.26 20 13.5 20h-3c-3.759 0-5.638 0-6.893-.99a4.377 4.377 0 01-.554-.523C2 17.307 2 15.537 2 12z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 16h1.5M14.5 16H18"
        stroke="#fff"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9h20"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoCard = React.memo(Card);
export default MemoCard;
