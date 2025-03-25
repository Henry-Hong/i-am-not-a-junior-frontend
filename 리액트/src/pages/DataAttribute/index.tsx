import { useEffect } from "react";

export default function DataAttributePage() {
  return <AddUser />;
}

function AddUser() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-icon-name="AddUser"
    >
      <path
        d="M22 11C22 13.7614 19.7614 16 17 16C14.2386 16 12 13.7614 12 11C12 8.23858 14.2386 6 17 6C19.7614 6 22 8.23858 22 11Z"
        fill="currentColor"
      />
      <path
        d="M17 18C10.9249 18 6 20.149 6 22.8V26H28V22.8C28 20.149 23.0751 18 17 18Z"
        fill="currentColor"
      />
      <path
        d="M6 12H8V14H10V16H8C8 17.1046 7.10457 18 6 18V16H4V14H6V12Z"
        fill="currentColor"
      />
    </svg>
  );
}
