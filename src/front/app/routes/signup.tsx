import { useEffect, useState, type FormEvent } from 'react';
import { Form, redirect, useActionData, useLocation, useNavigate } from 'react-router-dom';
import type { ActionFunctionArgs } from 'react-router-dom';
import ErrorMessage from '~/components/ErrorMessage';
import Header from '~/components/header';
import Loading from '~/components/Loading';
import { loginUser, signupUser } from '~/services/auth';

interface CompleteSignUpActionData {
    error?: string;
    fieldErrors?: {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        cpf?: string;
    };
}

function maskCPF(value: string): string {
    const cleanValue = value.replace(/\D/g, "");

    let maskedValue = cleanValue;
    if (maskedValue.length > 3) {
        maskedValue = maskedValue.replace(/(\d{3})(\d)/, "$1.$2");
    }
    if (maskedValue.length > 7) {
        maskedValue = maskedValue.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    }
    if (maskedValue.length > 11) {
        maskedValue = maskedValue.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
    }

    return maskedValue.slice(0, 14);
}
function validateCPF(cpf: string): boolean {
    const cleanCpf = cpf.replace(/\D/g, "");
    return cleanCpf.length === 11 && /^\d+$/.test(cleanCpf);
}

export async function completeSignUpAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const password = formData.get('password') as string | null;
    const confirmPassword = formData.get('confirmPassword') as string | null;
    const cpf = formData.get('cpf') as string | null;


    const fieldErrors: CompleteSignUpActionData['fieldErrors'] = {};

    if (!name) fieldErrors.name = 'Nome é obrigatório.';
    if (!email) {
        fieldErrors.email = 'Email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        fieldErrors.email = 'Formato de email inválido.';
    }
    if (!password) fieldErrors.password = 'Senha é obrigatória.';
    if (!confirmPassword) fieldErrors.confirmPassword = 'Confirmação de senha é obrigatória.';
    if (password && confirmPassword && password !== confirmPassword) {
        fieldErrors.confirmPassword = 'As senhas não coincidem.';
    }
    if (!cpf) {
        fieldErrors.cpf = 'CPF é obrigatório.';
    }

    if (Object.keys(fieldErrors).length > 0) {
        return { fieldErrors } as CompleteSignUpActionData;
    }

    return redirect('/');
}

const CompleteSignUpFormComponent = () => {
    const actionData = useActionData() as CompleteSignUpActionData | undefined;
    const [cpf, setCpf] = useState('');
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const { email: stateEmail, name: stateName } = location.state || {};
    const navigate = useNavigate();
    const [errorKey, setErrorKey] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(stateName)
        setPassword("")
        setCpf("")
        setConfirmPassword("")
        setEmail(stateEmail)
    }, [navigate])



    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stateEmail || !stateName || !password || !confirmPassword || !cpf || !name) {

            setError('Por favor, preencha todos os campos');
            setErrorKey(prevKey => prevKey + 1);
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            setErrorKey(prevKey => prevKey + 1);
            return;
        }

        if (!validateCPF(cpf)) {
            setError('CPF inválido');
            setErrorKey(prevKey => prevKey + 1);
            return;
        }

        if (Object.keys(actionData?.fieldErrors || {}).length > 0) {
            setError('Por favor, corrija os erros antes de continuar');
            setErrorKey(prevKey => prevKey + 1);
            return;
        }


        try {
            setLoading(true);
            const result = await signupUser({
                nome: name,
                email: email,
                cpf: cpf,
                celular: '',
                password: password,
            });
            setLoading(false);
            if (!result.token) {
                setError('Falha no login. Tente novamente.');
                setErrorKey(prevKey => prevKey + 1);
                return;
            }
            navigate('/create');
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Falha no login. Tente novamente.';
            setError(errorMessage);
            setErrorKey(prevKey => prevKey + 1);
            console.error(err);
        }
    };

    useEffect(() => {
        if (actionData?.error) {
            alert(actionData.error);
        }
    }, [actionData]);

    return (
        <div className="min-h-screen bg-[#D9D9D9] flex flex-col">
            <Header />

            <main className="flex flex-grow items-center justify-center p-4">
                <div className="bg-[#D9D9D9] p-8 rounded-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                        Completar cadastro
                    </h2>
                    <Form method="post" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                className="mt-1 bg-white block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
                            />
                            {actionData?.fieldErrors?.name && (
                                <p className="text-red-500 text-xs mt-1">{actionData.fieldErrors.name}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                autoComplete='off'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                className="mt-1 bg-white block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
                            />
                            {actionData?.fieldErrors?.email && (
                                <p className="text-red-500 text-xs mt-1">{actionData.fieldErrors.email}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete='off'

                                required
                                className="mt-1 bg-white block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
                            />
                            {actionData?.fieldErrors?.password && (
                                <p className="text-red-500 text-xs mt-1">{actionData.fieldErrors.password}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirmar senha"
                                autoComplete='off'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                                className="mt-1 bg-white block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
                            />
                            {actionData?.fieldErrors?.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{actionData.fieldErrors.confirmPassword}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                name="cpf"
                                placeholder="CPF"
                                onChange={(e) => setCpf(maskCPF(e.target.value))}

                                maxLength={14}
                                value={cpf}
                                required
                                className="mt-1 bg-white block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
                            />
                            {actionData?.fieldErrors?.cpf && (
                                <p className="text-red-500 text-xs mt-1">{actionData.fieldErrors.cpf}</p>
                            )}
                        </div>

                        {loading ? (
                            <Loading />
                        ) : <div>
                                <button
                                    type="submit"
                                    className="w-full  flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0A2C35] hover:bg-[#00161C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00161C] transition-colors duration-300"
                                >
                                    FINALIZAR
                                </button>
                            </div>
                        }



                        <ErrorMessage message={error} key={errorKey}>
                        </ErrorMessage>
                    </Form>
                </div>
            </main>
        </div>
    );
};

export default CompleteSignUpFormComponent; 