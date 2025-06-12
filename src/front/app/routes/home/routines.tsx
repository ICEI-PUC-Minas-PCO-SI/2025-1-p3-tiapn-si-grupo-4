import { useState } from "react";
import DefaultButton from "../../components/DefaultButton";
import SearchInput from "../../components/SearchInput";
import Title from "../../components/Title";
import CardCargoRotinas from "../../components/CardCargoRotinas";

export default function RoutinesPage(props: any) {
    const [searchText, setSearchText] = useState("")
    const [categoria1, setCategoria1] = useState("");
    const [categoria2, setCategoria2] = useState("");

    return (
        <div className='flex flex-row m-5 p-4 mb-16'>
            <div className='flex-1 bg-gray-100'>
                <div className="flex flex-row justify-between items-center">
                    <Title>Rotinas em Andamento</Title>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <div className="justify-start flex flex-row items center">
                        <div className="w-130">
                            <SearchInput 
                                value={searchText} 
                                onChange={(e) => 
                                setSearchText(e.target.value)}
                            />
                        </div>
                        <select
                            value={categoria1}
                            onChange={e => setCategoria1(e.target.value)}
                            className="w-2/5 border ml-8 p-2 rounded"
                        >
                            <option value="Categoria">Categoria</option>
                        </select>
                        <select
                            value={categoria2}
                            onChange={e => setCategoria2(e.target.value)}
                            className="w-2/5 border ml-8 p-2 rounded"
                        >
                            <option value="Categoria">Categoria</option>
                        </select>
                    </div>

                    <div className="flex justify-end h-16">
                        <DefaultButton>
                            INICIAR ROTINA
                        </DefaultButton>
                    </div>
                </div>

                <div className="bg-white w-full min-h-[90vh] mt-4 rounded-lg shadow-md">
                    <div className="flex flex-column justify-between items-center">
                        <CardCargoRotinas />
                    </div>
                </div>
            </div>
        </div>
    )
}