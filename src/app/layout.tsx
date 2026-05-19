import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import LogoIntro from "@/components/LogoIntro";
import ContentReveal from "@/components/ContentReveal";
export const metadata: Metadata = {
  title: "Mann Fleet Partners — Premium Car Rental",
  description: "Drive in style with Mann Fleet Partners. Premium vehicles for every journey.",
};

const themeScript = `(function(){try{var s=localStorage.getItem('mannfleet-theme');if(s!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

const hydrationFixScript = `(function(){if(typeof window==='undefined')return;function c(n){if(!n||n.nodeType!==1)return;if(n.hasAttribute('bis_skin_checked'))n.removeAttribute('bis_skin_checked');if(n.hasAttribute('bis_register'))n.removeAttribute('bis_register');if(n.attributes){var r=[];for(var i=0;i<n.attributes.length;i++){var a=n.attributes[i].name;if(a.indexOf('__processed_')===0)r.push(a);}for(var j=0;j<r.length;j++)n.removeAttribute(r[j]);}}var els=document.getElementsByTagName('*');for(var i=0;i<els.length;i++)c(els[i]);var obs=new MutationObserver(function(muts){for(var i=0;i<muts.length;i++){var m=muts[i];if(m.type==='attributes'){var name=m.attributeName;if(name==='bis_skin_checked'||name==='bis_register'||(name&&name.indexOf('__processed_')===0))c(m.target);}else if(m.type==='childList'){for(var j=0;j<m.addedNodes.length;j++){var added=m.addedNodes[j];if(added.nodeType===1){c(added);var kids=added.getElementsByTagName('*');for(var k=0;k<kids.length;k++)c(kids[k]);}}}}});obs.observe(document.documentElement,{attributes:true,childList:true,subtree:true});})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: hydrationFixScript }} suppressHydrationWarning />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LogoIntro />
        <ContentReveal>
          <ThemeProvider>{children}</ThemeProvider>
        </ContentReveal>
      </body>
    </html>
  );
}
