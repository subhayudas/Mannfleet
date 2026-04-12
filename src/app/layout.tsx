import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import LogoIntro from "@/components/LogoIntro";
import ContentReveal from "@/components/ContentReveal";
import Ribbons from "@/components/Ribbons";

export const metadata: Metadata = {
  title: "MANN — Premium Car Rental",
  description: "Drive in style with MANN. Premium vehicles for every journey.",
};

const themeScript = `(function(){try{var s=localStorage.getItem('mannfleet-theme');if(s!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div
          className="ribbons-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <Ribbons
            colors={['#ff2020', '#ff5a5a', '#ff0000']}
            baseSpring={0.03}
            baseFriction={0.9}
            baseThickness={30}
            offsetFactor={0.05}
            maxAge={500}
            pointCount={50}
            speedMultiplier={0.6}
            enableFade={true}
            backgroundColor={[0, 0, 0, 0]}
          />
        </div>
        <LogoIntro />
        <ContentReveal>
          <ThemeProvider>{children}</ThemeProvider>
        </ContentReveal>
      </body>
    </html>
  );
}
