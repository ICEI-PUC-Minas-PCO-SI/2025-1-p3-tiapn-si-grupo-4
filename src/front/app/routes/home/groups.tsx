import { useState, useEffect } from "react";
import DefaultButton from "~/components/DefaultButton";
import Title from "~/components/Title";
import SearchFuncionario from "~/components/SearchFuncionario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Edit from '@mui/icons-material/EditNoteOutlined';
import CreateEmpresaGrupo from "~/components/CreateEmpresaGrupo";
import CriarFuncionario from "~/components/CriarFuncionario";
import EditFuncionario, { type EditFuncionarioData } from "~/components/EditFuncionario";


interface GroupMember {
  nome: string;
  identificador: string;
}

interface MemberCategory {
  id: number;
  title: string;
  members: GroupMember[];
}

interface NovoFuncionario {
  nome: string;
  Empresa: string;
  cpf: string;
}

export default function GroupsPage() {
  const [memberCategories, setMemberCategories] = useState<MemberCategory[]>([]);
  const [selectedRole, setSelectedRole] = useState(""); // mostra todas por padrão
  const [searchText, setSearchText] = useState("");
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [criarFuncionarioOpen, setCriarFuncionarioOpen] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [editFuncionarioOpen, setEditFuncionarioOpen] = useState(false);
  const [editFuncionarioData, setEditFuncionarioData] = useState<EditFuncionarioData | null>(null);
  const [editFuncionarioCategory, setEditFuncionarioCategory] = useState<number | null>(null);
  const [editFuncionarioIndex, setEditFuncionarioIndex] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchFuncionariosPorEmpresa = async (empresaId: number): Promise<GroupMember[]> => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/empresa/${empresaId}/funcionarios`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      if (!res.ok) {
        console.error(`Erro ao buscar funcionários da empresa ${empresaId}`, await res.text());
        setLoading(false);
        return [];
      }
      const funcionarios = await res.json();

      setLoading(false);
      return funcionarios.map((f: any) => ({
        nome: f.nome,
        ocupacao: "",
        identificador: f.cpf,
      }));
    } catch (error) {
      setLoading(false);
      console.error("Erro na requisição de funcionários:", error);
      return [];
    }
  };

  const fetchEmpresas = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/empresa`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });
      if (!res.ok) {
        console.error("Erro ao buscar empresas:", await res.text());
        setLoading(false);
        return;
      }
      const data = await res.json();

      // Para cada empresa, pegar os funcionários
      const empresasComFuncionarios = await Promise.all(
        data.map(async (empresa: any) => {
          const funcionarios = await fetchFuncionariosPorEmpresa(empresa.id);
          return {
            id: empresa.id,
            title: empresa.nome,
            members: funcionarios,
          } as MemberCategory;
        })
      );

      setMemberCategories(empresasComFuncionarios);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro de rede ao buscar empresas:", error);
    }
  };

  const handleCreateGroup = () => {
    fetchEmpresas();
    setCreateGroupModalOpen(false);
  };

  const handleCreateFuncionario = async (novoFuncionario: NovoFuncionario) => {
    if (selectedCategoryIndex === null) return;
    const empresa = memberCategories[selectedCategoryIndex];
    const empresaId = empresa?.id;
    if (!empresaId) return;
    try {
      setLoading(true);  
      // Busca todos usuários para encontrar o id pelo cpf
      const resUsers = await fetch(`${baseUrl}/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      });

      if (!resUsers.ok) throw new Error("Erro ao buscar usuários");
      const users = await resUsers.json();

      const usuario = users.find((u: any) => u.cpf === novoFuncionario.cpf);
      if (!usuario) {
        alert("Usuário com este CPF não encontrado.");
        setLoading(false);
        return;
      }

      const payload = {
        usuarioId: usuario.id,
        empresaId: empresaId,
        nome: novoFuncionario.nome,
        cpf: novoFuncionario.cpf,
        nivelAcesso: 1,
      };

      const res = await fetch(`${baseUrl}/empresa/${empresaId}/funcionarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Atualiza a lista de empresas e funcionários
        await fetchEmpresas();

        setCriarFuncionarioOpen(false);
        setSuccessMessage("Usuário cadastrado com sucesso!");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const errorText = await res.text();
        console.error("Erro ao cadastrar funcionário:", errorText);
        alert("Erro ao cadastrar funcionário: " + errorText);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Erro na criação de funcionário:", error);
      alert("Erro inesperado na criação do funcionário.");
    }
  };

  const handleEditFuncionarioClick = (catIdx: number, memberIdx: number) => {
    const member = memberCategories[catIdx].members[memberIdx];
    setEditFuncionarioData({
      nome: member.nome,
      cpf: member.identificador,
      empresa: memberCategories[catIdx].title,
    });
    setEditFuncionarioCategory(catIdx);
    setEditFuncionarioIndex(memberIdx);
    setEditFuncionarioOpen(true);
  };


  const handleEditFuncionario = (func: EditFuncionarioData) => {
    if (editFuncionarioCategory === null || editFuncionarioIndex === null) return;
    setMemberCategories(prev =>
      prev.map((cat, catIdx) =>
        catIdx === editFuncionarioCategory
          ? {
            ...cat,
            members: cat.members.map((m, mIdx) =>
              mIdx === editFuncionarioIndex
                ? {
                  nome: func.nome,
                  identificador: func.cpf,
                }
                : m
            ),
          }
          : cat
      )
    );
    setEditFuncionarioOpen(false);
  };


  useEffect(() => {
    fetchEmpresas();
  }, []);

  return (
    <div className="flex flex-col p-8 bg-gray-200 h-screen">
      <div className="mb-5">
        <div className="flex justify-between items-center mb-6">
          <Title>Empresas</Title>
          <DefaultButton onClick={() => setCreateGroupModalOpen(true)}>+ ADICIONAR EMPRESA</DefaultButton>
          <CreateEmpresaGrupo
            openModal={createGroupModalOpen}
            closeModal={() => setCreateGroupModalOpen(false)}
            onCreate={handleCreateGroup}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-6 gap-4 max-h-[75vh] overflow-y-auto">
          <div className="col-span-1 sm:col-span-4">
            <SearchFuncionario
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Pesquisar funcionário..."
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="h-11 w-full px-4 rounded border border-gray-300 shadow-sm bg-white"
            >
              <option value="">Todas as empresas</option>
              {memberCategories.map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mensagem de sucesso */}
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      <div className="mb-5 pb-8 flex flex-col gap-6 w-full mx-auto overflow-y-auto hide-scrollbar">
        {memberCategories
          .filter((category) => !selectedRole || category.title === selectedRole)
          .map((category, index) => {
            const filteredMembers = category.members.filter(
              (member) =>
                member.nome.toLowerCase().includes(searchText.toLowerCase()) ||
                member.identificador.toLowerCase().includes(searchText.toLowerCase())
            );

            return (
              <section
                key={category.id}
                className="bg-white rounded-lg p-6 shadow-md transition-all duration-300"
              >
                <h2 className="text-xl font-bold mb-4 pb-2">{category.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredMembers.map((member, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 rounded-lg p-4 shadow-xl border border-gray-300 flex flex-col justify-between items-start"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-800 py-2">{member.nome}</h3>
                        {/* <p className="text-sm text-gray-600 py-2">{member.ocupacao}</p> Remover */}
                      </div>
                      <div className="mt-4 flex justify-between w-full">
                        <p className="text-xs text-gray-500">{member.identificador}</p>
                        <Edit
                          className="text-gray-700 hover:text-black cursor-pointer"
                          onClick={() => handleEditFuncionarioClick(index, i)}
                        />
                      </div>
                    </div>
                  ))}

                  <div
                    className="bg-gray-200 rounded-lg p-4 flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-colors h-full"
                    onClick={() => {
                      setSelectedCategoryIndex(index);
                      setCriarFuncionarioOpen(true);
                    }}
                  >
                    <span className="text-4xl text-gray-500">
                      <AddRoundedIcon style={{ fontSize: "128px" }} />
                    </span>
                  </div>
                </div>
              </section>
            );
          })}
      </div>

      <CriarFuncionario
        openModal={criarFuncionarioOpen}
        closeModal={() => setCriarFuncionarioOpen(false)}
        onCreate={handleCreateFuncionario}
        result={undefined}
        empresas={memberCategories.map((cat) => cat.title)}
      />

      <EditFuncionario
        openModal={editFuncionarioOpen}
        closeModal={() => setEditFuncionarioOpen(false)}
        onEdit={handleEditFuncionario}
        funcionario={editFuncionarioData}
        empresas={memberCategories.map((cat) => cat.title)}
      />
    </div>
  );
}
