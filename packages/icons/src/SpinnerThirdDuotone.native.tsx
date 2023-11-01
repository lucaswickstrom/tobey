import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgSpinnerThirdDuotone(props: SvgProps) {
  return <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      className="spinner-third-duotone_svg__fa-primary"
      d="M224 32c0-17.7 14.3-32 32-32 141.4 0 256 114.6 256 256 0 46.6-12.5 90.4-34.3 128-8.8 15.3-28.4 20.5-43.7 11.7s-20.5-28.4-11.7-43.7c16.3-28.2 25.7-61 25.7-96 0-106-86-192-192-192-17.7 0-32-14.3-32-32z"
    />
    <Path
      d="M256 64C150 64 64 150 64 256s86 192 192 192c70.1 0 131.3-37.5 164.9-93.6l.1.1c-6.9 14.9-1.5 32.8 13 41.2 15.3 8.9 34.9 3.6 43.7-11.7.2-.3.4-.6.5-.9C434.1 460.1 351.1 512 256 512 114.6 512 0 397.4 0 256S114.6 0 256 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
      style={{
        opacity: 0.4,
      }}
    />
  </Svg>
}
export default SvgSpinnerThirdDuotone;
