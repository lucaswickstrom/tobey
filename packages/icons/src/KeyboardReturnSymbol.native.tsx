import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgKeyboardReturnSymbol(props: SvgProps) {
  return <Svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M18 36 6.05 24.05 18 12.1l2.15 2.15-8.35 8.35H39V14h3v11.55H11.85l8.3 8.3L18 36Z" />
  </Svg>
}
export default SvgKeyboardReturnSymbol;
