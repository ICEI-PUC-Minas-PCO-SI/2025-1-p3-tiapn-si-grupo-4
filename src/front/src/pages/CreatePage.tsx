import DefaultButton from "../components/DefaultButton";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import DefaultModal from "../components/CreateRoutine";
import SearchIcon from "../components/SearchInput"
import ItemRegisterModal from "../components/ItemRegister";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; //icone de lixeira
import DeleteRotina from "../components/DeleteRotinaPage";
import type { NovoItem } from "../components/ItemRegister";
import apiClient from "../services/client";

interface Rotina {
  nome: string;
  tarefas: number;
  insumos: number;
}

interface Item {
  nome: string;
  concluido: boolean;
}

export default function RoutinesPage() {
  const [rotinas, setRotinas] = useState<Rotina[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [createModal, setModal] = useState(false)
  const [searchText, setSearchText] = useState("")

  const handleItemRegister = (item: NovoItem) => {
    setResultadoModalRegistroItem(item);
    console.log("Item para enviar ao backend:", item);
  };

  const handleSetRotinas = () => {
    const mockData = [
      { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
      { nome: "Controle de inventário", tarefas: 4, insumos: 1 },
      { nome: "Gerenciar recursos", tarefas: 3, insumos: 5 },
      { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
    ];
    const extra = localStorage.getItem("rotinaExtra")
    console.log("Definindo rotinas mockadas:", mockData);
    setRotinas(mockData);
  };

  const handleSetItens = () => {
    const mockData = [
      { nome: "Auditoria Interna", concluido: true },
      { nome: "Controle de inventário", concluido: false },
      { nome: "Gerenciar recursos", concluido: false },
      { nome: "Auditoria Interna", concluido: false },
    ];
    console.log("Definindo rotinas mockadas:", mockData);
    setItens(mockData);
  };

  const tarefas = new Array(7).fill("Coletar dados");
  const [itemRegisterOpen, setItemRegisterOpen] = useState(false);
  const [deleteRotinaOpen, setDeleteRotinaOpen] = useState(false);
  const [resultadoModalRegistroItem, setResultadoModalRegistroItem] = useState<NovoItem>();

  useEffect(() => {
    //somente está setado para rotinas, falta insumos e tarefas
    handleSetRotinas();
    handleSetItens();
    apiClient.get("http://localhost:3000/rotinas")
      .then(response => {
        setRotinas(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar rotinas:", error);
      });
  }, []);

  return (
    <div className="flex flex-col p-8 bg-gray-200 min-h-screen">
      {/* Título e botão de criar rotina */}
      <div className="flex justify-between items-center mb-6">
        <Title>Minhas Rotinas</Title>
        <DefaultButton onClick={() => setModal(true)}>+ CRIAR ROTINA</DefaultButton>
        <DefaultModal closeModal={() => setModal(false)} openModal={createModal} />
      </div>

      {/* Campo de busca */}
      <SearchIcon value={searchText} onChange={(e) => setSearchText(e.target.value)} rotinas={rotinas} />
      {/* Conteúdo principal */}
      <div className="flex flex-row p-4 gap-6 w-full max-w-[1200px] mx-auto">
        {/* Lista de Rotinas */}
        <div className="flex flex-col gap-4 flex-1 max-h-[75vh] overflow-y-auto pr-2">
          {rotinas.map((rotina, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg p-4 shadow-md hover:bg-gray-100 ${i === 0 ? "bg-blue-100" : ""
                }`}
            >
              <h2 className="font-semibold">{rotina.nome}</h2>
              <p className="text-sm text-gray-600">
                {rotina.tarefas} tarefas • {rotina.insumos} insumos
              </p>
            </div>
          ))}
        </div>

        {/* Detalhes da Rotina */}
        <div className="bg-white flex-1 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">Auditoria Interna</h2>
            <button onClick={() => setDeleteRotinaOpen(true)} className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100">
              <DeleteOutlineIcon />
            </button>
            <DeleteRotina
              openModal={deleteRotinaOpen}
              closeModal={() => setDeleteRotinaOpen(false)}
              onDelete={() => { }}
            //   nomeRotina="Auditoria Interna"
            />
          </div>


          <DefaultButton onClick={() => setItemRegisterOpen(true)}>ADICIONAR TAREFA</DefaultButton>
          <ItemRegisterModal
            closeModal={() => setItemRegisterOpen(false)}
            openModal={itemRegisterOpen}
            onCreate={handleItemRegister}
            result={resultadoModalRegistroItem}
          />

          <ul className="mt-6 space-y-3">
            {itens.map((tarefa, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>{tarefa.nome}</span>
                </div>
                <span>⚙️</span> {/* Vai deixar essa engrenagem mesmo? */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
