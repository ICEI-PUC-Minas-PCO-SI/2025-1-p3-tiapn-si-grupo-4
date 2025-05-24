import { useState } from "react";
import Title from "../components/Title";
import DefaultModal from "../components/DefaultModal";
import DefaultButton from "../components/DefaultButton";

export default function CreatePage() {
    const [createModal, setModal] = useState(false)

    return (
        <div className='flex flex-row m-5 p-4'>
            <div className='flex-1 bg-[#F5F5F5]'>
                <div className="flex flex-row justify-between items-center ">
                    <Title>Minhas Rotinas</Title>
                    <DefaultButton onClick={() => setModal(true)}>
                        + CRIAR ROTINA
                    </DefaultButton>
                    <DefaultModal closeModal={() => setModal(false)} openModal={createModal} />
                </div>

                <div className="bg-[#ffff] w-full h-9/11">
                    
                </div>
            </div>
        </div>
    )
}