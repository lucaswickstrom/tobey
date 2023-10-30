import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgPin(props: SvgProps) {
  return <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M20.2 15.7c1.1-1.6 1.8-3.6 1.8-5.7 0-5.6-4.5-10-10-10S2 4.5 2 10c0 2 .6 3.9 1.6 5.4 0 .1.1.2.2.3 0 0 .1.1.1.2.2.3.4.6.7.9 2.6 3.1 7.4 7.6 7.4 7.6s4.8-4.5 7.4-7.5c.2-.3.5-.6.7-.9 0-.2.1-.2.1-.3Z"
      fill="inherit"
    />
    <Path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="currentColor" />
  </Svg>
}
export default SvgPin;
