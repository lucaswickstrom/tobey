import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgTableRegular(props: SvgProps) {
  return <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M48 264V160h184v104H48zm0 48h184v120H64c-8.8 0-16-7.2-16-16V312zm232 120V312h184v104c0 8.8-7.2 16-16 16H280zm184-168H280V160h184v104zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
  </Svg>
}
export default SvgTableRegular;
