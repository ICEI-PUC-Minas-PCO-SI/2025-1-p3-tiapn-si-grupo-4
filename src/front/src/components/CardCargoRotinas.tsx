import React from "react";
import { useState } from "react";
import CardRotinaDescricao from "./CardRotinaDescricao";

export default function CardCargoRotinas() {
    const [nomeCargo, setNomeCargo] = useState("TESTE");
    return (
        <div className="flex flex-col w-110 h-200 p-5">
            <label className="md:text-5xl mb-4 font-bold justify-start">{nomeCargo}</label>
            <div className="bg-gray-200 flex flex-col items-center rounded-lg w-4/5 h-4/5 shadow-md">
                <CardRotinaDescricao />
            </div>

        </div>
    )
}