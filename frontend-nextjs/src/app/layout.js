import '@/app/global.css'
import Providers from './redux/Provider'
import 'react-toastify/dist/ReactToastify.css';
import ToastContainerWrapper from '@/provider/toast';


export const metadata = {
    title: 'Laravel',
}
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            
            <Providers>
        
            <body className="antialiased">{children}
            <ToastContainerWrapper>
            </ToastContainerWrapper>
            </body>
          
            </Providers>
           
        </html>
    )
}

export default RootLayout
