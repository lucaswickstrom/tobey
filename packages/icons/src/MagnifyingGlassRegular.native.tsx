import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgMagnifyingGlassRegular(props: SvgProps) {
  return <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M368 208a160 160 0 1 0-320 0 160 160 0 1 0 320 0zm-30.9 163.1C301.7 399.2 256.8 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-134-133.8z" />
  </Svg>
}
export default SvgMagnifyingGlassRegular;
