import * as React from "react";

function Medal1(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 25" fill="none" {...props}>
      <path d="M0 24.18h24v-24H0v24z" fill="#292D32" />
    </svg>
  );
}

const MemoMedal1 = React.memo(Medal1);
export default MemoMedal1;
