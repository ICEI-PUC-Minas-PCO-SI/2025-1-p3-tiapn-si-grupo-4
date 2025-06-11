import { useState, useEffect } from "react";
import DefaultButton from "../components/DefaultButton";
import Title from "../components/Title";
import SearchInput from "../components/SearchInput";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface GroupMember {
    nome: string;
    ocupacao: string;
    identificador: string; // Pode ser CPF, ID, etc.
}

interface MemberCategory {
    title: string;
    members: GroupMember[];
}

export default function GroupsPage() {
    const [memberCategories, setMemberCategories] = useState<MemberCategory[]>([]);
    const [selectedRole, setSelectedRole] = useState("CARGO");
    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
    const [deleteMemberOpen, setDeleteMemberOpen] = useState(false);
    const [searchText, setSearchText] = useState(""); // Estado para a barra de pesquisa

    // Mock de dados
    const handleSetMockGroupData = () => {
        const mockData: MemberCategory[] = [
            {
                title: "GESTOR",
                members: [
                    { nome: "Maria dos Santos Silvia", ocupacao: "Supervisor de manutenção de veículos", identificador: "244.234.213-54" },
                    { nome: "João Oliveira Souza", ocupacao: "Coordenador de Equipe", identificador: "123.456.789-00" },
                    { nome: "Ana Paula Costa", ocupacao: "Líder de Produção", identificador: "987.654.321-00" },
                ],
            },
            {
                title: "FUNCIONÁRIO",
                members: [
                    { nome: "Pedro Lima Almeida", ocupacao: "Técnico de Manutenção", identificador: "111.222.333-44" },
                    { nome: "Carla Ribeiro Dias", ocupacao: "Operador de Máquinas", identificador: "555.666.777-88" },
                    { nome: "Fernando Gomes Rocha", ocupacao: "Montador", identificador: "000.999.888-77" },
                    { nome: "Beatriz Nogueira Santos", ocupacao: "Auxiliar Administrativo", identificador: "444.333.222-11" },
                    { nome: "Roberto Mendes Vieira", ocupacao: "Eletricista Industrial", identificador: "777.888.999-00" },
                ],
            },
        ];
        setMemberCategories(mockData);
    };

    useEffect(() => {
        handleSetMockGroupData();
    }, []);

    return (
        <div className="flex flex-col p-8 bg-gray-200 min-h-screen">
            <div className="mb-6">
                <div className="flex justify-between items-center mb-6">
                    <Title>Grupos</Title>
                    {/*onClick={() => setModal(true)}*/}
                    <DefaultButton>+ CRIAR GRUPO</DefaultButton>
                    {/* <DefaultModal closeModal={() => setModal(false)} openModal={createModal} onCreate={handleRotinaRegister} result={resultadoModalRegistroRotina} /> */}
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-6 gap-4">
                    <div className="col-span-1 sm:col-span-4">
                        <SearchInput
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Pesquisar grupo..."
                           />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="h-11 w-full px-4 rounded border border-gray-300 shadow-sm bg-white"
                        >
                            <option value="GESTOR">Gestor</option>
                            <option value="FUNCIONÁRIO">Funcionário</option>
                            <option value="ESTAGIÁRIO">Estagiário</option>
                            <option value="ALMOXERIFADO">Almoxerifado</option>
                            <option value="OUTROS">Outros</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="flex flex-col gap-6 w-full mx-auto">
                {memberCategories.map((category, index) => (
                    <section key={index} className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-4 pb-2">
                            {category.title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {category.members.map((member, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-200 rounded-lg p-4 shadow-xl border border-gray-300 flex flex-col justify-between items-start"
                                >
                                    <div>
                                        <h3 className="font-semibold text-gray-800 py-2">{member.nome}</h3>
                                        <p className="text-sm text-gray-600 py-2">{member.ocupacao}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4 self-start">{member.identificador}</p>

                                </div>
                            ))}
                            {/* Cartão "Adicionar" */}
                            <div
                                className="bg-gray-200 rounded-lg p-4
                flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-colors"
                                onClick={() => setCreateGroupModalOpen(true)}
                            >
                                <span className="text-4xl text-gray-500"><AddRoundedIcon style={{ fontSize: "128px" }} /></span>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Modais (placeholder para implementação futura) */}
            {/* <CreateGroupModal
        openModal={createGroupModalOpen}
        closeModal={() => setCreateGroupModalOpen(false)}
        onCreateGroup={() => {}}
      /> */}
            {/* <DeleteMemberModal
        openModal={deleteMemberOpen}
        closeModal={() => setDeleteMemberOpen(false)}
        onDelete={() => {}}
      /> */}
        </div >
    );
}