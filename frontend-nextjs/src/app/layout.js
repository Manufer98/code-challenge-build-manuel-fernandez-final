import '@/app/global.css'
import Providers from './redux/Provider'

export const metadata = {
    title: 'Laravel',
}
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <Providers>
            <body className="antialiased">{children}</body>
            </Providers>
        </html>
    )
}

export default RootLayout
