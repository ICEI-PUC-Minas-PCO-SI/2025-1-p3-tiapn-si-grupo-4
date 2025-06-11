import React from "react";
import { useState } from "react";

export default function CardRotinaDescricao() {
    const [nomeRotina, setNomeCargo] = useState("AUDITORIA INTERNA");
    const [nomeTarefa, setNomeTarefa] = useState("Notas fiscais");
    const [descricaoTarefa, setDescricaoTarefa] = useState("Pegar notas fiscais das datas informadas");

    return (
        <div className="flex flex-col w-6/7 p-3  mt-5 bg-white rounded-lg shadow-md">
            <label className="md:text-2xl font-bold justify-start">{nomeRotina}</label>
            <label className="md:text-xl mt-1 justify-start">{nomeTarefa}</label>
            <label className="md:text-l mt-1 justify-start">{descricaoTarefa}</label>
        </div>
    )
}