import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from "react";

export const metadata = {
  title: "VBD Hub demo", description: "This a VBD Hub demo.", icons: {
    icon: 'favicon.png' // from https://www.flaticon.com/free-icon/fly_1035984?term=insect&page=1&position=14&origin=search&related_id=1035984
  }
};

export default function RootLayout({children}) {
  return <>
    <html lang="en">
    <body>
    <AppRouterCacheProvider options={{enableCssLayer: true}}>
      <CssBaseline/>
      {children}
    </AppRouterCacheProvider>
    </body>
    </html>
  </>;
}
