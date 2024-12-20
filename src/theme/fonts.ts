import MontserratFont from '../assets/fonts/Montserrat-Regular.ttf';
import MontserratSemiBoldFont from '../assets/fonts/Montserrat-SemiBold.ttf';
import MontserratBoldFont from '../assets/fonts/Montserrat-Bold.ttf';

export const Montserrat = `@font-face {
  font-family: "Montserrat";
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src:local('Montserrat'), local('Montserrat-Regular'), url(${MontserratFont}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}`;

export const MontserratSemiBold = `@font-face {
  font-family: "Montserrat"';
  font-style: normal;
  font-display: swap;
  font-weight: 600;
  src:local('Montserrat'), local('Montserrat-Semi-Bold'), url(${MontserratSemiBoldFont}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}`;

export const MontserratBold = `@font-face {
  font-family: "Montserrat"';
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src:local('Montserrat'), local('Montserrat-Bold'), url(${MontserratBoldFont}) format('truetype');
  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
}`;
