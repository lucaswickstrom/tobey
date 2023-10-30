import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgCircleInfoRegular(props: SvgProps) {
  return <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm-40-176c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8v-88c0-13.3-10.7-24-24-24h-48c-13.3 0-24 10.7-24 24s10.7 24 24 24h24v64h-24zm40-144a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
  </Svg>
}
export default SvgCircleInfoRegular;
