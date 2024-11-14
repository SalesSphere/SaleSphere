import * as React from "react";

function Inventory(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M19 9.5V8.3c-.008-2.803-.095-4.289-1.033-5.246C16.933 2 15.269 2 11.942 2h-1.883C6.731 2 5.068 2 4.034 3.054 3 4.11 3 5.806 3 9.2v4.6c0 3.394 0 5.091 1.034 6.146.918.936 2.332 1.04 4.966 1.052"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M18.675 19.689L21 22m-1-5.5a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7h8M7 11h3"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

const MemoInventory = React.memo(Inventory);
export default MemoInventory;
