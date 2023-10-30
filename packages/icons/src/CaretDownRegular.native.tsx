import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgCaretDownRegular(props: SvgProps) {
  return <Svg viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="m160 329.4 89.4-89.4H70.6l89.4 89.4zm22.6 45.3c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9S19 192 32 192h256c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
  </Svg>
}
export default SvgCaretDownRegular;
