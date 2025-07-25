import { useEffect, useRef } from "react";
import DefaultButton from "./DefaultButton";

interface DeleteProps {
  openModal: boolean;
  closeModal: () => void;
  onDelete: () => void;
  nomeTarefa?: string;
}

export default function DeleteTarefaPage({ openModal, closeModal, onDelete, nomeTarefa }: DeleteProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
    >
      <div
        className="bg-white p-4 m-4 rounded-lg overflow-auto max-h-[90vh] max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="justify-between flex items-center">
          <h2 className="text-xl font-bold mb-4">DELETAR TAREFA</h2>
        </div>
        <p className="pt-5 mb-6 text-center">
          Tem certeza que deseja excluir a tarefa <span className="font-semibold">{nomeTarefa || "selecionada"}</span>?
          <br />
          Esta ação não poderá ser desfeita.
        </p>
        <div className="flex w-full justify-center gap-4">
          <DefaultButton onClick={onDelete}>
            DELETAR
          </DefaultButton>
        </div>
      </div>
    </dialog>
  );
}