import { createGlobalStyle } from 'styled-components'
import { primaryDark } from '@Main/styles/colors'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700&display=swap');
  
  body {
    font-family: 'Lato', sans-serif;
    color: ${primaryDark};
    font-size: 16px;
    line-height: 20px;
    font-weight: normal;
  }
  
  a {
    text-decoration: none;
  
    &:hover {
      text-decoration: none;
    }
  }
`

export default GlobalStyle
