import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgHelmetSafetyRegular(props: SvgProps) {
  return <Svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M264 80h48c4.4 0 8 3.6 8 8v208c0 13.3 10.7 24 24 24s24-10.7 24-24V88c0-30.9-25.1-56-56-56h-48c-30.9 0-56 25.1-56 56v208c0 13.3 10.7 24 24 24s24-10.7 24-24V88c0-4.4 3.6-8 8-8zm295.4 304H16.6C7.4 384 0 391.4 0 400.6c0 4.7 2 9.2 5.8 11.9C27.5 428.4 111.8 480 288 480s260.5-51.6 282.2-67.5c3.8-2.8 5.8-7.2 5.8-11.9 0-9.2-7.4-16.6-16.6-16.6zM32 288v64h48v-64c0-68.4 39-127.7 96-156.8V78.7C91.8 110.9 32 192.5 32 288zm464-2.2V352h48v-66.4c-1-94.5-60.5-174.9-144-206.9v52.5c56.4 28.8 95.2 87.2 96 154.6z" />
  </Svg>
}
export default SvgHelmetSafetyRegular;
