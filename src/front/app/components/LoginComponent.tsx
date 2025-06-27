import { useState, type FormEvent } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router";
import ErrorMessage from "./ErrorMessage";

interface LoginProps {
    toggle: (e: any) => void;
    setLoading: (loading: boolean) => void;
}

const Login = ({ toggle, setLoading }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [errorKey, setErrorKey] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true); // Inicia o loading

        try {
            await loginUser({ login: email, senha: password });
            setLoading(false); // Finaliza o loading em caso de sucesso
            navigate('/create');
        } catch (err: any) {
            setLoading(false); // Finaliza o loading em caso de erro
            const errorMessage = err.response?.data?.message || 'Falha no login. Tente novamente.';
            setError(errorMessage);
            setErrorKey(prevKey => prevKey + 1);
            console.error(err);
        }
    };

    return (
        <div className="flex w-full h-full bg-[#0A2C35]">
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-left">
                    <h1 className="text-4xl font-bold text-white mb-6">Entrar</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value ?? "")}
                        className="mb-4 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value ?? "")}
                        className="mb-8 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#00161C] text-[#F5F5F5] text-xl font-bold w-64 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                        ENTRAR
                    </button>
                    <button
                        type="button"
                        onClick={toggle}
                        className="bg-[#F5F5F5] mt-4 text-[#0A2C35] px-4 py-2 text-xl font-bold w-64 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                        CADASTRAR
                    </button>

                    <a href="#" className="text-[#F5F5F5] text-sm text-center mt-6 hover:underline">
                        esqueceu a senha?
                    </a>

                    <ErrorMessage key={errorKey} message={error} />

                </div>
            </form>
        </div>
    );
};

export default Login;