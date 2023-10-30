import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgChevronLeftRegular(props: SvgProps) {
  return <Svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z" />
  </Svg>
}
export default SvgChevronLeftRegular;
