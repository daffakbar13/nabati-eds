const CreateColors = (
  lightest: string,
  lighter: string,
  light: string,
  regular: string,
  dark: string,
  darker: string,
  darkest: string,
) => ({ lightest, lighter, light, regular, dark, darker, darkest })

export const colors = {
  blue: CreateColors('#F4FBFC', '#D5FAFD', '#AAE5EA', '#2BBECB', '#1E858E', '#1A727A', '#165F66'),
  pink: CreateColors('#FDE6F3', '#F799D1', '#FF34AC', '#EB008B', '#BC006F', '#760046', '#47002A'),
  cheese: CreateColors('#B78101', '#FFB400', '#FFD41F', '#FFE12E', '#FFE12E', '#FFF3AA', '#FFFBDF'),
  green: CreateColors('#E2FFF3', '#ABFFDC', '#39FFAC', '#02EF8B', '#00C572', '#01A862', '#01874E'),
  red: CreateColors('#FFE4E5', '#FFA3A6', '#FF4D53', '#ED1C24', '#C81A19', '#B40E0E', '#A50706'),
  black: {
    regular: '#000000',
    darker: '#444444',
    dark: '#666666',
  },
  grey: {
    regular: '#888888',
    light: '#AAAAAA',
    lighter: '#DDDDDD',
    lightest: '#F4F4F4',
  },
  white: '#FFFFFF',
}
