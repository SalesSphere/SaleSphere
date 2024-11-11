import * as React from "react";

function Export2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M15.705 8.563c3.41.294 4.803 2.046 4.803 5.883v.123c0 4.235-1.695 5.931-5.93 5.931H8.41c-4.235 0-5.931-1.696-5.931-5.93v-.124c0-3.808 1.374-5.56 4.727-5.873m4.292 5.77V3.56m3.174 2.113L11.499 2.5 8.325 5.674"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoExport2 = React.memo(Export2);
export default MemoExport2;
