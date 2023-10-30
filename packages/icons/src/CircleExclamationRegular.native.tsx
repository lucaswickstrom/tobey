import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgCircleExclamationRegular(props: SvgProps) {
  return <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm0-384c-13.3 0-24 10.7-24 24v112c0 13.3 10.7 24 24 24s24-10.7 24-24V152c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0-64 0 32 32 0 1 0 64 0z" />
  </Svg>
}
export default SvgCircleExclamationRegular;