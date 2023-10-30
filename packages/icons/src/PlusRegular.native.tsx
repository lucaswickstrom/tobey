import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgPlusRegular(props: SvgProps) {
  return <Svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24v160H40c-13.3 0-24 10.7-24 24s10.7 24 24 24h160v160c0 13.3 10.7 24 24 24s24-10.7 24-24V280h160c13.3 0 24-10.7 24-24s-10.7-24-24-24H248V72z" />
  </Svg>
}
export default SvgPlusRegular;
