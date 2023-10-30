import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgShelvesRegular(props: SvgProps) {
  return <Svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M24 0c13.3 0 24 10.7 24 24v136h544V24c0-13.3 10.7-24 24-24s24 10.7 24 24v464c0 13.3-10.7 24-24 24s-24-10.7-24-24v-24H48v24c0 13.3-10.7 24-24 24S0 501.3 0 488V24C0 10.7 10.7 0 24 0zm24 416h544V208H48v208zM352 32c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32V32zM128 256h64c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32zm160 0h64c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32z" />
  </Svg>
}
export default SvgShelvesRegular;
