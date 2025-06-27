import { useEffect, useState } from "react"
import Bg1 from "@assets/bg-01.png";
import Bg2 from "@assets/bg-02.png";
import Bg3 from "@assets/bg-03.png";
import Bg4 from "@assets/bg-04.png";
import Login from "../components/LoginComponent";
import Signup from "../components/SignUpComponent";
import { useNavigate } from "react-router-dom";
import Loading from "~/components/Loading";

export default function () {
    const [isLogon, setLogon] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toggleLogon = (e: Event) => {
        e.preventDefault();
        setLogon(prev => !prev);
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/create');
        }
    }, [navigate]);

    return (
        <main className="flex w-full flex-row h-screen overflow-hidden relative bg-[#D9D9D9]">
            <div className="absolute w-full h-full">
                <img src={Bg1} alt="Audit" className="absolute bottom-10 left-0 scale-150 border-[#0A2C35] z-10" />
                <img src={Bg2} alt="Audit" className="absolute bottom-10 right-1/2 -translate-x-14 scale-130 border-[#0A2C35] z-10" />
                <img src={Bg3} alt="Audit" className="absolute bottom-10 left-1/2 translate-x-5 scale-120 border-[#0A2C35] z-20" />
                <img src={Bg4} alt="Audit" className="absolute bottom-10 right-0 scale-120 translate-x-10 border-solid border-[#0A2C35] z-20" />

                <div className="absolute right-32 top-1/4 -translate-y-1/2 z-30 transition-opacity duration-700 ease-in-out">
                    <h1 className="text-4xl font-bold text-[#0A2C35] max-w-md mb-6">
                        GERENCIE ROTINAS E TAREFAS DA SUA EMPRESA
                    </h1>
                    <p className="text-xl text-[#0A2C35] opacity-80 max-w-sm leading-relaxed">
                        Crie e tenha <span className="font-bold">controle</span> de suas rotinas,
                        <span className="font-bold"> gerencie</span> insumos,
                        <span className="font-bold"> otimize</span> processos e muito mais.
                    </p>
                </div>

                <div className="absolute left-32 top-1/4 -translate-y-1/2 z-30 transition-opacity duration-700 ease-in-out">
                    <h1 className="text-4xl font-bold text-[#0A2C35] max-w-md mb-6">
                        SISTEMA INTELIGENTE
                    </h1>
                    <p className="text-xl text-[#0A2C35] opacity-80 max-w-sm leading-relaxed">
                        Elimine processos manuais e aumente a eficiência.
                    </p>
                </div>
            </div>
            <div className="flex w-full h-full relative z-50">
                <div className={`flex w-1/2 h-full bg-gray-200 transition-all duration-700 ease-in-out ${isLogon ? 'translate-x-full' : 'translate-x-0'
                    }`}>
                    {loading ? (
                        <Loading/>
                    ) : (
                        !isLogon
                            ? <Login toggle={toggleLogon} setLoading={setLoading} />
                            : <Signup toggle={() => toggleLogon(new MouseEvent('click'))} />
                    )}
                </div>
            </div>
        </main>
    )
}
