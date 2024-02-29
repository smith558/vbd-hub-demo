'use client'

import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import getTheme from "@/getTheme";
import {createContext} from "react";
import {useDarkMode} from "usehooks-ts";

const metadata = {
  title: "VBD Hub", description: "This a VBD Hub.", icons: {
    icon: 'favicon.png' // from https://www.flaticon.com/free-icon/fly_1035984?term=insect&page=1&position=14&origin=search&related_id=1035984
  }
};

export const LayoutContext = createContext({
  isDarkMode: false,
  toggle: () => {}
});

export default function RootLayout({children}) {
  const {isDarkMode, toggle, enable, disable} = useDarkMode();
  const theme = createTheme(getTheme(isDarkMode ? 'dark' : 'light'));

  return <>
    <html lang="en">
    <head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="initial-scale=1, width=device-width"/>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description}/>
      <link rel="icon" href={metadata.icons.icon}/>
    </head>
    <body>
    <LayoutContext.Provider value={{isDarkMode, toggle}}>
      <AppRouterCacheProvider options={{enableCssLayer: true}}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </LayoutContext.Provider>
    </body>
    </html>
  </>;
}
