import type { SVGProps } from "react";

function SvgKeySkeletonRegular(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M304 48a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240c79.5 0 144-64.5 144-144S383.5 0 304 0 160 64.5 160 144c0 31.1 9.9 59.9 26.6 83.4L7 407c-9.4 9.4-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47L88 393.9l47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 98.6-98.6c23.6 16.7 52.4 26.6 83.5 26.6z" />
  </svg>
}
export default SvgKeySkeletonRegular;
