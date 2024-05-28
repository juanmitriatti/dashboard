import './ui/global.css';
import  {monserrat} from './ui/fonts.ts';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monserrat.className} antialiased`} >
        <div style={{border : "1px #222 solid"}}>
        {children}
        </div>
        <footer className='flex justify-center items-center py-10'>
         Este es el footer.
        </footer>
        </body>
    </html>
  );
}
