import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgBoxRegular(props: SvgProps) {
  return <Svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M342.4 80H248v80h140.4L357 89.5c-2.6-5.8-8.3-9.5-14.6-9.5zM400 208H48v208c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16V208zM59.6 160H200V80h-94.4c-6.3 0-12.1 3.7-14.6 9.5L59.6 160zM342.4 32c25.3 0 48.2 14.9 58.5 38l41.6 93.6c3.6 8.2 5.5 17 5.5 26V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V189.6c0-9 1.9-17.8 5.5-26L47.1 70c10.3-23.1 33.2-38 58.5-38h236.8z" />
  </Svg>
}
export default SvgBoxRegular;
