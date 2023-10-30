import type { SvgProps} from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SvgPhoneRegular(props: SvgProps) {
  return <Svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="m480.3 320.3-98.2-42.1c-21.41-9.281-46.64-3.109-61.2 14.95l-27.44 33.5c-44.78-25.75-82.29-63.25-108-107.1l33.55-27.48c17.91-14.62 24.09-39.7 15.02-61.05L191.7 31.53c-10.16-23.2-35.34-35.86-59.87-30.19L40.58 22.4C16.7 27.86 0 48.83 0 73.39c0 241.9 196.7 438.6 438.6 438.6 24.56 0 45.53-16.69 50.1-40.53l21.06-91.34c6.64-24.62-6.16-49.82-29.46-59.82zm-16.4 49-21.09 91.41c-.469 1.1-2.109 3.281-4.219 3.281-215.4 0-390.6-175.2-390.6-390.6 0-2.094 1.297-3.734 3.344-4.203l91.34-21.08c.312-.078.64-.11.953-.11 1.734 0 3.36 1.048 4.047 2.61l42.14 98.33a4.353 4.353 0 0 1-1.25 5.062L139.8 193.1c-8.625 7.062-11.25 19.14-6.344 29.14 33.01 67.23 88.26 122.5 155.5 155.5 9.1 4.906 22.09 2.281 29.16-6.344l40.01-48.87c1.109-1.406 3.187-1.938 4.922-1.125l98.26 42.09c1.892 1.709 2.992 3.809 2.592 5.809z" />
  </Svg>
}
export default SvgPhoneRegular;
