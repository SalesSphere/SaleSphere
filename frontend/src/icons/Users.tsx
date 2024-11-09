import * as React from "react";

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 3a6 6 0 100 12 6 6 0 000-12zm-4 6a4 4 0 118 0 4 4 0 01-8 0z"
        fill="#292D32"
        fillOpacity={0.7}
      />
      <path
        d="M8.155 20.527a1 1 0 11-1.7-1.054C7.826 17.266 10.628 15 14 15s6.175 2.266 7.544 4.473a1 1 0 11-1.7 1.054C18.723 18.718 16.485 17 14 17c-2.484 0-4.722 1.718-5.845 3.527zM7.898 6.56a1 1 0 01-.458 1.338C6.532 8.343 6 9.152 6 10c0 .848.532 1.657 1.44 2.102a1 1 0 01-.88 1.796C5.083 13.174 4 11.733 4 10c0-1.734 1.083-3.174 2.56-3.898a1 1 0 011.338.458zM4.155 20.527a1 1 0 11-1.7-1.054c.58-.934 1.507-1.713 2.54-2.317a1 1 0 011.01 1.726c-.864.505-1.5 1.08-1.85 1.645z"
        fill="#292D32"
        fillOpacity={0.7}
      />
    </svg>
  );
}

const MemoUsers = React.memo(Users);
export default MemoUsers;
