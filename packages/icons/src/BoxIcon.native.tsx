import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgBoxIcon(props: SvgProps) {
  return <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M286 80v64h104V96c0-8.8-7.2-16-16-16h-88Zm-48 0h-88c-8.8 0-16 7.2-16 16v48h104V80ZM134 192v224c0 8.8 7.2 16 16 16h88V192H134Zm152 240h88c8.8 0 16-7.2 16-16V307H286v125Zm104-173v-67H286v67h104ZM86 96c0-35.3 28.7-64 64-64h224c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H150c-35.3 0-64-28.7-64-64V96Z" />
  </Svg>
}
export default SvgBoxIcon;
