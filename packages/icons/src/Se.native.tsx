import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgSe(props: SvgProps) {
  return <Svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M0 0h640v480H0z" fill="#005293" />
    <Path
      d="M176 0v192H0v96h176v192h96V288h368v-96H272V0h-96z"
      fill="#fecb00"
    />
  </Svg>
}
export default SvgSe;
