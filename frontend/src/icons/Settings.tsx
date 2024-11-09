import * as React from "react";

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 25 24" fill="none" {...props}>
      <path
        d="M3.5 9.11v5.77c0 2.12 0 2.12 2 3.47l5.5 3.18c.83.48 2.18.48 3 0l5.5-3.18c2-1.35 2-1.35 2-3.46V9.11c0-2.11 0-2.11-2-3.46L14 2.47c-.82-.48-2.17-.48-3 0L5.5 5.65C3.5 7 3.5 7 3.5 9.11z"
        stroke="#292D32"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="#292D32"
        strokeOpacity={0.7}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoSettings = React.memo(Settings);
export default MemoSettings;
