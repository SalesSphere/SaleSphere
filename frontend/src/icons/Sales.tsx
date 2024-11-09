import * as React from "react";

function Sales(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" {...props}>
      <path
        d="M7.5 6.67c-1.066 0-2.08-.12-3-.334-.96-.225-2 .466-2 1.473v11.008c0 .809 0 1.213.194 1.63.11.238.363.561.565.724.354.287.65.356 1.241.494.92.216 1.934.335 3 .335 1.917 0 3.668-.386 5-1.022 1.332-.636 3.083-1.022 5-1.022 1.066 0 2.08.12 3 .335.96.224 2-.467 2-1.474V7.81c0-.809 0-1.213-.194-1.63a2.412 2.412 0 00-.565-.724C20.5 4.439 18.5 5.442 18.5 5.442"
        stroke="#292D32"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M15 13.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        stroke="#292D32"
        strokeOpacity={0.7}
        strokeWidth={1.5}
      />
      <path
        d="M6 14.5v.009M19 12.492v.01"
        stroke="#292D32"
        strokeOpacity={0.7}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 4.5c.492-.506 1.8-2.5 2.5-2.5M15 4.5c-.492-.506-1.8-2.5-2.5-2.5m0 0v6"
        stroke="#292D32"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSales = React.memo(Sales);
export default MemoSales;
