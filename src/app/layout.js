import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {AppContextProvider} from "@/context/AppContext";
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: " DeepSeek",
  description: "Clone of the Actual DeepSeek",
};

export default function RootLayout({
  children,
}) {
  return (
    <ClerkProvider>
      <AppContextProvider>
      <html lang="en">
      <body className="font-inder antialiased">
     <Toaster toastOptions={
      {
        success:{style:{background:'black',color:'white'}},
        error:{style:{background:'red',color:'white'}}
      }
     }/>
        {children}
      </body>
    </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
