import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle
} from 'react-native';

type ChildElement = React.ReactText | React.ReactElement<RNTextProps>;

const FONT_REG = {
  EXTRA_LIGHT: 'Poppins-ExtraLight',
  LIGHT: 'Poppins-Light',
  THIN: 'Poppins-Thin',
  REGULAR: 'Poppins-Regular',
  MEDIUM: 'Poppins-Medium',
  SEMI_BOLD: 'Poppins-SemiBold',
  BOLD: 'Poppins-Bold',
  EXTRA_BOLD: 'Poppins-ExtraBold',
  BLACK: 'Poppins-Black'
};

const FONT_ITA = {
  EXTRA_LIGHT_ITALIC: 'Poppins-ExtraLightItalic',
  LIGHT_ITALIC: 'Poppins-LightItalic',
  THIN_ITALIC: 'Poppins-ThinItalic',
  ITALIC: 'Poppins-Italic',
  MEDIUM_ITALIC: 'Poppins-MediumItalic',
  SEMI_BOLD_ITALIC: 'Poppins-SemiBoldItalic',
  BOLD_ITALIC: 'Poppins-BoldItalic',
  EXTRA_BOLD_ITALIC: 'Poppins-ExtraBoldItalic',
  BLACK_ITALIC: 'Poppins-BlackItalic'
};

interface TextProps extends RNTextProps {
  children?: ChildElement | ChildElement[] | any;
}

export function Text({ children, ...props }: TextProps) {
  let fontFamily = FONT_REG.REGULAR;
  const style = props.style as TextStyle;

  let styleObject = {};
  const oldStyle = props.style;
  if (style?.fontStyle === 'italic') {
    switch (style?.fontWeight) {
      case '100':
        fontFamily = FONT_ITA.EXTRA_LIGHT_ITALIC;
        break;
      case '200':
        fontFamily = FONT_ITA.LIGHT_ITALIC;
        break;
      case '300':
        fontFamily = FONT_ITA.THIN_ITALIC;
        break;
      case '400':
        fontFamily = FONT_ITA.LIGHT_ITALIC;
        break;
      case '500':
        fontFamily = FONT_ITA.MEDIUM_ITALIC;
        break;
      case '600':
        fontFamily = FONT_ITA.SEMI_BOLD_ITALIC;
        break;
      case '700':
        fontFamily = FONT_ITA.BOLD_ITALIC;
        break;
      case '800':
        fontFamily = FONT_ITA.EXTRA_BOLD_ITALIC;
        break;
      case '900':
        fontFamily = FONT_ITA.BLACK_ITALIC;
        break;
      case 'normal':
        fontFamily = FONT_ITA.ITALIC;
        break;
      case 'bold':
        fontFamily = FONT_ITA.BOLD_ITALIC;
        break;
      default:
        fontFamily = FONT_ITA.ITALIC;
    }
  } else {
    switch (style?.fontWeight) {
      case '100':
        fontFamily = FONT_REG.EXTRA_LIGHT;
        break;
      case '200':
        fontFamily = FONT_REG.EXTRA_LIGHT;
        break;
      case '300':
        fontFamily = FONT_REG.THIN;
        break;
      case '400':
        fontFamily = FONT_REG.LIGHT;
        break;
      case '500':
        fontFamily = FONT_REG.MEDIUM;
        break;
      case '600':
        fontFamily = FONT_REG.SEMI_BOLD;
        break;
      case '700':
        fontFamily = FONT_REG.BOLD;
        break;
      case '800':
        fontFamily = FONT_REG.EXTRA_BOLD;
        break;
      case '900':
        fontFamily = FONT_REG.BLACK;
        break;
      case 'normal':
        fontFamily = FONT_REG.REGULAR;
        break;
      case 'bold':
        fontFamily = FONT_REG.BOLD;
        break;
      default:
        fontFamily = FONT_REG.REGULAR;
    }
  }

  // delete props.style;
  styleObject = Object.assign({}, oldStyle, {
    fontWeight: undefined,
    fontFamily
  });

  return (
    <RNText style={[styleObject]} {...props}>
      {children}
    </RNText>
  );
}
