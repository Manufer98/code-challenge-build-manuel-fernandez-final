import LoginLinks from '@/app/LoginLinks'


export const metadata = {
    title: 'Laravel',
}

const Home = () => {
    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />
                
                <div>

                    <h2 className='text-xl font-bold' >Code Challenge Build Online - Manuel Fernandez</h2>
                </div>

                
                    
            </div>
        </>
    )
}

export default Home
