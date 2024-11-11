import * as React from "react";

function Filter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.965 2a2.965 2.965 0 00-2.429 4.665l5.463 7.805c.213.304.327.666.327 1.037v1.998c0 1.852 1.95 3.057 3.606 2.229a3.286 3.286 0 001.816-2.94v-1.287c0-.371.115-.733.327-1.037l5.463-7.805A2.965 2.965 0 0017.11 2H4.965zm6.976 14.795c0 .56-.316 1.072-.817 1.322a.684.684 0 01-.99-.612v-1.998c0-.742-.229-1.466-.654-2.073L4.017 5.629a1.158 1.158 0 01.948-1.822H17.11a1.158 1.158 0 01.949 1.822l-5.464 7.805a3.615 3.615 0 00-.653 2.073v1.288z"
        fill="#292D32"
        fillOpacity={0.5}
      />
    </svg>
  );
}

const MemoFilter = React.memo(Filter);
export default MemoFilter;
