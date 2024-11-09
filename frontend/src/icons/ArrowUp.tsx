import * as React from "react";

function ArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 15 15" fill="none" {...props}>
      <path d="M7.333 2.6l5.6 9.8h-11.2l5.6-9.8z" fill="#00D103" />
    </svg>
  );
}

const MemoArrowUp = React.memo(ArrowUp);
export default MemoArrowUp;
