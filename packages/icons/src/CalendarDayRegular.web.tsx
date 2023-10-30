import type { SVGProps } from "react";

function SvgCalendarDayRegular(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M128 0c13.3 0 24 10.7 24 24v40h144V24c0-13.3 10.7-24 24-24s24 10.7 24 24v40h40c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h40V24c0-13.3 10.7-24 24-24zm272 192H48v256c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V192zm-288 64h96c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16v-96c0-8.8 7.2-16 16-16z" />
  </svg>
}
export default SvgCalendarDayRegular;
