import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgIdBadgeRegular(props: SvgProps) {
  return <Svg viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M256 48v16c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16v384c0 8.8 7.2 16 16 16h256c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16h-64zM0 64C0 28.7 28.7 0 64 0h256c35.3 0 64 28.7 64 64v384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm160 256h64c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1-128 0z" />
  </Svg>
}
export default SvgIdBadgeRegular;