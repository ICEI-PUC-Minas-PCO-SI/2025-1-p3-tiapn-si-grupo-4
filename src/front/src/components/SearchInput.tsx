import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ViewRoutineModal from './ViewRoutineModal';
interface Rotina {
  nome: string;
  tarefas: number;
  insumos: number;
}

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  rotinas?: Rotina[];
}

export default function SearchInput({
  value,
  onChange,
  placeholder,
  rotinas = []
}: SearchInputProps) {
  const [filtradas, setFiltradas] = useState<Rotina[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRotina, setSelectedRotina] = useState<Rotina | null>(null);

  useEffect(() => {
    const resultado = rotinas.filter((r) =>
      r.nome.toLowerCase().includes(value.toLowerCase())
    );
    setFiltradas(resultado);
  }, [value, rotinas]);

  return (
    <div className="w-full">
      {/* Campo de busca */}
      <div className="relative w-full mb-4">
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          aria-label="Pesquisar"
          type="button"
          tabIndex={-1}
        >
          <SearchIcon />
        </button>

        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // pequeno delay evita sumir se clicar em item
          placeholder={placeholder || "Pesquisar..."}
          className="w-full pl-12 pr-4 py-2 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>
      <ViewRoutineModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        rotina={selectedRotina}
      />

      {/* Lista filtrada visível apenas se focado */}
      {isFocused && (
        <div className="flex flex-col gap-2">
          {filtradas.length > 0 ? (
            filtradas.map((r, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedRotina(r);
                  setModalOpen(true);
                }}
                className="p-3 border rounded shadow-sm bg-white cursor-pointer hover:bg-gray-100"
              >
                <strong>{r.nome}</strong><br />
                {r.tarefas} tarefas • {r.insumos} insumos
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic">Nenhuma rotina encontrada.</div>
          )}
        </div>
      )}
    </div>
  );
}
