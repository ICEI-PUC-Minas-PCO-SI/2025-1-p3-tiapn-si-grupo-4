import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import DefaultButton from "./DefaultButton";
import Loading from "./Loading";

export interface NovoFuncionario {
  nome: string;
  Empresa: string;
  cpf: string;
}

interface ModalProps extends PropsWithChildren {
  openModal: boolean;
  closeModal: () => void;
  onCreate: (item: NovoFuncionario) => void;
  actions?: React.ReactElement[];
  result: NovoFuncionario | undefined;
  empresas?: string[];
  loading?: boolean;
}

function CriarFuncionario(props: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cpf, setCpf] = useState("");

  const handleSubmit = () => {
    if (
      nome.trim() === "" ||
      empresa.trim() === "" ||
      cpf.trim() === ""
    ) return;

    const novoFuncionario: NovoFuncionario = {
      nome: nome.trim(),
      Empresa: empresa.trim(),
      cpf: cpf.trim(),
    };

    props.onCreate(novoFuncionario);
    setNome("");
    setEmpresa("");
    setCpf("");
    props.closeModal();
  };

  useEffect(() => {
    if (props.openModal) {
      ref.current?.showModal();
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
      <div
        className="bg-white p-4 m-4 rounded-lg w-md overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center">
          {props.children}
        </div>
        <h2 className="text-xl font-bold mb-4">CADASTRAR FUNCIONÁRIO</h2>

        <div className="pt-4 grid grid-cols-5 gap-4">
          <div className="col-span-5 mb-4">
            <label className="block font-medium mb-1">Nome do funcionário</label>
            <input
              type="text"
              placeholder="Digite o nome do funcionário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="col-span-5 mb-4">
            <label className="block font-medium mb-1">Empresa</label>
            <select
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Selecione a empresa</option>
              {props.empresas?.map((nome, idx) => (
                <option key={idx} value={nome}>{nome}</option>
              ))}
            </select>
          </div>
          <div className="col-span-5 mb-4">
            <label className="block font-medium mb-1">CPF</label>
            <input
              type="text"
              placeholder="Digite o CPF do funcionário"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {props.loading ?
           <Loading/> :
        ( <div className="flex w-full p-4 justify-center gap-2">
          <DefaultButton onClick={handleSubmit}>
            CRIAR
          </DefaultButton>
        </div> )}
      </div>
    </dialog>
  );
}

export default CriarFuncionario;
