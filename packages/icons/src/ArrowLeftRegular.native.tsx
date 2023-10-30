import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgArrowLeftRegular(props: SvgProps) {
  return <Svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M447.1 256c0 13.25-10.76 24.01-24.01 24.01H83.9l132.7 126.6c9.625 9.156 9.969 24.41.812 33.94-9.156 9.594-24.34 9.938-33.94.813l-176-168C2.695 268.9.008 262.6.008 256s2.687-12.8 7.437-17.4l176-168c9.555-9.09 24.755-8.75 33.955.85 9.156 9.5 8.812 24.75-.813 33.94l-132.7 126.6h340.1C437.2 232 447.1 242.8 447.1 256z" />
  </Svg>
}
export default SvgArrowLeftRegular;
