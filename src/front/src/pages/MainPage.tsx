import Title from "../components/Title";

interface MainPageProps  extends React.PropsWithChildren {
    title: string;
    header?: React.Component

}

export default function MainPage(props: MainPageProps) {

    return (
        <div className='flex flex-row m-5 p-4 mb-16'>
            <div className='flex-1 bg-gray-100'>
                <div className="flex flex-row justify-between items-center">
                    <Title>{props.title}</Title>
                </div>
                <div className="bg-white w-full min-h-[90vh] mt-4 rounded-lg shadow-md">
                    {props.children}
                </div>
            </div>
        </div>
    )
}