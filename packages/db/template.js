const template = (variables, { tpl }) => {
  return tpl`
import type { ReactElement, SVGProps } from 'react';
import type { Svg, SvgProps } from 'react-native-svg';

function ${variables.componentName}(_: SvgProps | SVGProps<SVGSVGElement>): ReactElement<Svg | SVGProps<SVGSVGElement>> {
  // @ts-expect-error: comment
  return null;
}

${variables.exports};
`;
};

module.exports = template;
