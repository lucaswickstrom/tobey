import type { ReactElement, SVGProps } from "react";
import type { Svg, SvgProps } from "react-native-svg";

function SvgMessageQuestionRegular(
  _: SvgProps | SVGProps<SVGSVGElement>
): ReactElement<Svg | SVGProps<SVGSVGElement>> {
  // @ts-expect-error: comment
  return null;
}
export default SvgMessageQuestionRegular;
