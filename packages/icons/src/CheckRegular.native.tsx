import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgCheckRegular(props: SvgProps) {
  return <Svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M441 103c9.4 9.4 9.4 24.6 0 33.9L177 401c-9.4 9.4-24.6 9.4-33.9 0L7 265c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l119 119L407 103c9.4-9.4 24.6-9.4 33.9 0z" />
  </Svg>
}
export default SvgCheckRegular;
