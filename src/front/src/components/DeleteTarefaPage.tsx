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
        className="bg-white p-4 m-4 rounded-lg w-md w-full overflow-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >

        <h2 className="text-xl font-bold mb-4">DELETAR TAREFA</h2>

        <p className="pt-5 mb-6 text-center"> {/* Tem que por um get do nome da tarefa*/}
          Tem certeza que deseja excluir a tarefa <span className="font-semibold">{nomeTarefa || "selecionada"}</span>?
          <br />
          Esta ação não poderá ser desfeita.
        </p>
        <div className="justify-between flex items-center">
          <div className="flex w-full justify-center gap-4">
            <DefaultButton onClick={closeModal}>
              CANCELAR
            </DefaultButton>
          </div>
          <div className="flex w-full justify-center gap-4">
            <DefaultButton onClick={onDelete}>
              DELETAR
            </DefaultButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}