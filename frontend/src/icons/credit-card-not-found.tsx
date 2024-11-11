import * as React from "react";

function CreditCardNotFound(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4.463 4.5c-.318.128-.6.289-.856.49-.2.16-.386.334-.554.523C2 6.693 2 8.463 2 12s0 5.306 1.053 6.487c.168.189.354.364.554.522C4.862 20 6.741 20 10.5 20h3c2.992 0 4.757 0 6-.5M8 4.016C8.728 4 9.554 4 10.5 4h3c3.759 0 5.638 0 6.892.99.201.16.387.334.555.523C22 6.693 22 8.463 22 12c0 2.313 0 3.87-.294 5"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 2l20 20"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M2.5 9H9M21.5 9h-8"
        stroke="#292D32"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoCreditCardNotFound = React.memo(CreditCardNotFound);
export default MemoCreditCardNotFound;
