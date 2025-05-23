import DefaultButton from "../components/DefaultButton";
import Title from "../components/Title";

export default function RoutinesPage(props: any) {

    return (
        <div className='flex flex-row m-5 p-4 mb-16'>
            <div className='flex-1 bg-gray-100'>
                <div className="flex flex-row justify-between items-center">
                    <Title>Rotinas em Andamento</Title>
                    <div className="flex justify-end h-16">
                        <DefaultButton>
                            INICIAR ROTINA
                        </DefaultButton>
                    </div>
                </div>

                <div className="bg-white w-full min-h-[90vh] mt-4 rounded-lg shadow-md">

                </div>
            </div>
        </div>
    )
}