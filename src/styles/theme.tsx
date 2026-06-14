import { type ReactNode } from 'react'
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FAF9F1',
      paper: '#FAF9F1',
    },
    text: {
      primary: '#2a2a2a',
      secondary: 'rgb(110, 123, 147)',
    },
  },
  typography: {
    fontFamily: ["Archivo Normal", "sans-serif"].join(','),
    h1: {
        fontFamily:["Archivo Black", "sans-serif"].join(','),
        fontWeight: 700,
        fontSize: "48px"
    },
    h2: {
        fontFamily:["Archivo Black", "sans-serif"].join(','),
        fontWeight: 900,
        fontSize: "30px"
    },
    body1: {
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: 1,
    },
    body2: {
        fontSize: '20px',
        fontWeight: 500,
    },
  },
})

interface ThemeProviderProps {
  children: ReactNode
}

export function AppThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default theme
