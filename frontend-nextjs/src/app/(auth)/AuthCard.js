const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>{logo}</div>

        <div className=" bg-red-500 h-16 "></div>
        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-red overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
