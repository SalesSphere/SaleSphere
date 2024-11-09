import * as React from "react";

function ArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 14 15" fill="none" {...props}>
      <path d="M7 12.4l5.6-9.8H1.4L7 12.4z" fill="#FF1900" />
    </svg>
  );
}

const MemoArrowDown = React.memo(ArrowDown);
export default MemoArrowDown;
