import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DefaultButton from "./DefaultButton";
import apiClient from "~/services/client";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export interface NovaRotina {
    nome: string;
    prioridade?: string;
    descricao?: string;
}

interface ModalProps extends PropsWithChildren {
    openModal: boolean;
    closeModal: () => void;
    onCreate: (item: NovaRotina) => void;
    actions?: React.ReactElement[];
    result: NovaRotina | undefined;
}

function CreateRoutine(props: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescRotina] = useState('');
    const [prioridade, setPrioridade] = useState('1');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async () => {
        if (!props) return null;
        if (nome.trim() === "") return;

        setLoading(true);

        const empresaIdRaw = localStorage.getItem("empresaId");
        const idEmpresa = empresaIdRaw ? Number(empresaIdRaw) : 0;

        const novaRotina: NovaRotina = {
            nome: nome.trim(),
            prioridade: prioridade,
            descricao: descricao,
        };

        try {
            const response = await apiClient.post(`/RotinaTemplate`, {
                nome: novaRotina.nome,
                prioridade: Number(novaRotina.prioridade) || 0,
                descricao: novaRotina.descricao || '',
                idEmpresa: idEmpresa,
                ativo: true,
            });

            if (response.status != 200) {
                const errorText = await response.statusText;
                console.error("Erro ao criar rotina:", errorText);
                return;
            }

            setNome('');
            setPrioridade('1');
            setDescRotina('');
            props.closeModal();
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError("Erro Ao Cadastrar Rotina");
            console.error("Erro na requisição:", error);
        }
    };


    useEffect(() => {
        if (props.openModal) {
            ref.current?.showModal();

            const fetchEmpresa = async () => {
                const userDataRaw = localStorage.getItem("userData");
                const userId = userDataRaw ? JSON.parse(userDataRaw).id : null;

                if (userId) {
                    const empresaRes = await fetch(`${baseUrl}/user/${userId}/empresa`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    });

                    if (empresaRes.ok) {
                        const empresaData = await empresaRes.json();
                        localStorage.setItem("empresaId", empresaData.empresaId.toString());
                    } else {
                        console.error("Erro ao buscar empresa do usuário:", await empresaRes.text());
                    }
                } else {
                    console.warn("ID do usuário não encontrado no localStorage");
                }
            };

            fetchEmpresa();

        } else {
            ref.current?.close();
        }
    }, [props.openModal]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                props.closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [props.closeModal]);

    return (
        <dialog
            ref={ref}
            onCancel={props.closeModal}
            onClick={(e) => {
                if (e.target === ref.current) {
                    props.closeModal();
                }
            }}
            className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
        >
            <div className="bg-white p-4 m-4 rounded-lg w-md overflow-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}>
                <div className="flex-1 flex items-center justify-center">
                    {props.children}
                </div>
                <h2 className="text-xl font-bold mb-4">CADASTRAR ROTINA</h2>

                <div className="pt-4 grid grid-cols-5 gap-4">
                    <div className="col-span-4 mb-4">
                        <label className="block font-medium mb-1">Nome da rotina</label>
                        <input
                            type="text"
                            placeholder="Digite o nome da rotina"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">Prioridade</label>
                        <select
                            value={prioridade}
                            onChange={e => setPrioridade(e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="col-span-5 mb-4">
                        <label className="block font-medium mb-1">Descrição da rotina</label>
                        <textarea
                            maxLength={255}
                            rows={4}
                            placeholder="Digite a descrição do insumo"
                            value={descricao}
                            onChange={e => setDescRotina(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                {
                    loading ? <Loading /> : (<div className="flex w-full p-4 justify-center gap-2">
                        <DefaultButton onClick={handleSubmit}>
                            CRIAR
                        </DefaultButton>
                    </div>)
                }
                {
                    error == "" ? <></> : <ErrorMessage message={error} ></ErrorMessage>
                }

            </div>

        </dialog>
    );
}

export default CreateRoutine;
