import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgRectangleVerticalHistoryRegular(props: SvgProps) {
  return <Svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M192 64c0-35.35 28.7-64 64-64h256c35.3 0 64 28.65 64 64v384c0 35.3-28.7 64-64 64H256c-35.3 0-64-28.7-64-64V64zm48 0v384c0 8.8 7.2 16 16 16h256c8.8 0 16-7.2 16-16V64c0-8.84-7.2-16-16-16H256c-8.8 0-16 7.16-16 16zM96 72c0-13.25 10.7-24 24-24s24 10.75 24 24v368c0 13.3-10.7 24-24 24s-24-10.7-24-24V72zM0 120c0-13.3 10.75-24 24-24s24 10.7 24 24v272c0 13.3-10.75 24-24 24S0 405.3 0 392V120z" />
  </Svg>
}
export default SvgRectangleVerticalHistoryRegular;
