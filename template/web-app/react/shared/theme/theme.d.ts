// import original module declarations
import 'styled-components'
import { themeType } from './theme.styles'

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme extends themeType {}
}
