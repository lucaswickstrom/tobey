import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgTruckArrowRightRegular(props: SvgProps) {
  return <Svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M64 48c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h12.8c16.6-28.7 47.6-48 83.2-48s66.6 19.3 83.2 48H352c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zm416 464c-53 0-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0h288c35.3 0 64 28.7 64 64v32h42.7c14.9 0 29.1 5.9 39.6 16.4l93.3 93.3c10.5 10.5 16.4 24.7 16.4 39.6V368h8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-40c0 53-43 96-96 96zm78-272c-.1-.1-.2-.3-.4-.4l-93.3-93.3c-1.5-1.5-3.5-2.3-5.7-2.3H416v96h142zM160 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm368-48a48 48 0 1 0-96 0 48 48 0 1 0 96 0zM241 95l80 80c9.4 9.4 9.4 24.6 0 33.9l-80 80c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l39-39H112c-13.3 0-24-10.7-24-24s10.7-24 24-24h134.1l-39-39c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
  </Svg>
}
export default SvgTruckArrowRightRegular;
