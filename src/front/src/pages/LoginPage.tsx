import { useState } from "react"

export default function LoginPage() {
    const [isLogon, setLogon] = useState(false);

    return (
        <main className="flex w-full h-screen overflow-hidden relative">
            <div className={`absolute w-full transition-transform duration-300 ease-in-out ${
            isLogon ? 'translate-x-[-100%]' : 'translate-x-0'
            }`}>
            <Login />
            </div>
            <div className={`absolute w-full transition-transform duration-300 ease-in-out ${
            isLogon ? 'translate-x-0' : 'translate-x-[100%]'
            }`}>
            <Logon />
            </div>
        </main>
    )
}

const Logon = () => {
    return (
        <div>
            Logon
        </div>
    )
}

const Login = () => {
    return (

        <div>
            login
        </div>
    )
}