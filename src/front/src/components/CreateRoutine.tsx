import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import DefaultButton from "./DefaultButton";

export type NovaRotina = {
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
    const [prioridade, setPrioridade] = useState('');

    const handleSubmit = () => {
        if (!props) return null;
        if (nome.trim() === "") return;

        const novaRotina: NovaRotina = {
            nome: nome.trim(),
            prioridade: prioridade,
            descricao: descricao,
        };
        localStorage.setItem("rotinaExtra", JSON.stringify(novaRotina));
        props.onCreate(novaRotina);
        setNome('');
        setPrioridade('1');
        setDescRotina('');
        props.closeModal();
    }

    useEffect(() => {
        if (props.openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openModal]);

    // Listener para fechar ao pressionar "Esc"
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
            <div className="bg-white p-4 m-4 rounded-lg w-md w-full overflow-auto max-h-[90vh]"
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

                <div className="flex w-full p-4 justify-center gap-2">
                    <DefaultButton onClick={handleSubmit}>
                        CRIAR
                    </DefaultButton>
                </div>

            </div>

        </dialog>
    );
}

export default CreateRoutine;