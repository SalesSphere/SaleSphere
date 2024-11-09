import * as React from "react";

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 40 40" fill="none" {...props}>
      <g clipPath="url(#prefix__clip0_41_30)">
        <path
          d="M27.6 29l-6.3-6.3a6.096 6.096 0 01-3.8 1.3c-1.817 0-3.354-.63-4.613-1.887C11.63 20.854 11 19.317 11 17.5c0-1.817.63-3.354 1.887-4.613C14.146 11.63 15.683 11 17.5 11c1.817 0 3.354.63 4.613 1.887C23.37 14.146 24 15.683 24 17.5a6.096 6.096 0 01-1.3 3.8l6.3 6.3-1.4 1.4zm-10.1-7c1.25 0 2.313-.438 3.188-1.313S22 18.75 22 17.5c0-1.25-.438-2.313-1.313-3.188C19.813 13.438 18.75 13 17.5 13c-1.25 0-2.313.438-3.188 1.313C13.438 15.187 13 16.25 13 17.5c0 1.25.438 2.313 1.313 3.188C15.187 21.563 16.25 22 17.5 22z"
          fill="#292D32"
          fillOpacity={0.7}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_41_30">
          <rect width={40} height={40} rx={20} fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoSearch = React.memo(Search);
export default MemoSearch;
