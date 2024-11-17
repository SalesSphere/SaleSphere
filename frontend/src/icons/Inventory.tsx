import * as React from "react";

function Inventory(_props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 9.5V8.3C19.492 5.49713 19.4051 4.0112 18.467 3.05442C17.4332 2 15.7694 2 12.4416 2L10.5592 2C7.23147 2 5.5676 2 4.5338 3.05442C3.5 4.10883 3.5 5.80589 3.5 9.2L3.5 13.8C3.5 17.1941 3.5 18.8912 4.5338 19.9456C5.45155 20.8816 6.86586 20.9867 9.5 20.9985"
        stroke="#292D32"
        stroke-opacity="0.7"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M19.1753 19.6886L21.5 22M20.5 16.5C20.5 14.0147 18.4853 12 16 12C13.5147 12 11.5 14.0147 11.5 16.5C11.5 18.9853 13.5147 21 16 21C18.4853 21 20.5 18.9853 20.5 16.5Z"
        stroke="#292D32"
        stroke-opacity="0.7"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 7H15.5"
        stroke="#292D32"
        stroke-opacity="0.7"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M7.5 11H10.5"
        stroke="#292D32"
        stroke-opacity="0.7"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
}

const MemoInventory = React.memo(Inventory);
export default MemoInventory;
