import * as React from "react";

function CartCheck(_props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.5 1C1.94772 1 1.5 1.44772 1.5 2C1.5 2.55228 1.94772 3 2.5 3C3.30847 3 4.00052 3.57985 4.14205 4.37584L4.86838 8.46078L5.27924 10.8415C5.53674 12.3337 5.74235 13.5252 6.00232 14.4717C6.2701 15.4467 6.61794 16.2529 7.21254 16.9368C7.6206 17.4061 8.09915 17.8091 8.63104 18.1314C9.40607 18.6011 10.2597 18.8067 11.266 18.9048C12.2429 19 13.452 19 14.9661 19H15.4352C16.1078 19 16.6675 19 17.1298 18.9652C17.6136 18.9287 18.0597 18.8504 18.4938 18.6585C19.1219 18.3809 19.6679 17.9462 20.0794 17.3964C20.3637 17.0163 20.54 16.5991 20.684 16.1359C20.8217 15.6932 20.9472 15.1476 21.098 14.4922L21.117 14.4097C21.3463 13.4132 21.5336 12.5993 21.6243 11.9347C21.7175 11.2515 21.7278 10.6093 21.5154 9.98941C21.2167 9.11739 20.626 8.37531 19.8432 7.88865C19.2867 7.54271 18.6586 7.4087 17.9718 7.34634C17.3038 7.28569 16.4686 7.2857 15.4461 7.28571H6.69082L6.11117 4.02571C5.79991 2.27519 4.27798 1 2.5 1ZM7.24132 10.4505L7.0403 9.28572H15.3983C16.4803 9.28572 17.2242 9.28668 17.7909 9.33814C18.3491 9.38883 18.6163 9.48092 18.7872 9.58718C19.1786 9.83051 19.474 10.2016 19.6234 10.6376C19.6886 10.828 19.7184 11.109 19.6426 11.6643C19.5657 12.2282 19.3998 12.9534 19.1572 14.0078C18.996 14.7084 18.8868 15.18 18.7742 15.542C18.6655 15.8916 18.5732 16.071 18.478 16.1982C18.2723 16.4731 17.9992 16.6904 17.6852 16.8293C17.5399 16.8935 17.3443 16.9433 16.9793 16.9708C16.6012 16.9993 16.1171 17 15.3983 17H15.0179C13.4403 17 12.3286 16.9989 11.46 16.9142C10.6096 16.8314 10.087 16.6751 9.66751 16.421C9.31291 16.2061 8.99388 15.9374 8.72184 15.6245C8.40003 15.2544 8.1572 14.766 7.9309 13.942C7.69976 13.1004 7.50962 12.0052 7.24132 10.4505Z"
        fill="white"
      />
      <path
        d="M9.25 22C9.94036 22 10.5 21.4404 10.5 20.75C10.5 20.0596 9.94036 19.5 9.25 19.5C8.55964 19.5 8 20.0596 8 20.75C8 21.4404 8.55964 22 9.25 22Z"
        fill="white"
      />
      <path
        d="M19.5 20.75C19.5 21.4404 18.9404 22 18.25 22C17.5596 22 17 21.4404 17 20.75C17 20.0596 17.5596 19.5 18.25 19.5C18.9404 19.5 19.5 20.0596 19.5 20.75Z"
        fill="white"
      />
      <path
        d="M22.3419 3.70711C22.7325 3.31658 22.7325 2.68342 22.3419 2.29289C21.9514 1.90237 21.3183 1.90237 20.9277 2.29289L18.989 4.23163L18.7071 3.94974C18.3166 3.55922 17.6834 3.55922 17.2929 3.94974C16.9024 4.34027 16.9024 4.97343 17.2929 5.36395L18.2819 6.35295C18.6724 6.74347 19.3056 6.74347 19.6961 6.35295L22.3419 3.70711Z"
        fill="white"
      />
    </svg>
  );
}

const MemoCartCheck = React.memo(CartCheck);
export default MemoCartCheck;
