import { AccessTime, AddCircleOutlineRounded, ArrowBackIosRounded, Person, PunchClock, TableBarRounded, ViewKanban, ViewKanbanOutlined } from '@mui/icons-material';
import { useState } from "react";
import { Pannels } from "../App";
import { Link } from "react-router";

interface props {
    activePannel: string;
    setActivePannel: (pannel: string) => void;
}

export default function SidePannel(props: props) {

    if (props.activePannel == undefined) {
        props.activePannel = 'create';
    }


    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);

    }


    return (<>
        <div className={`${open ? 'w-1/5' : 'w-16'} bg-[#1A4855] min-h-screen max-h-screen h-screen flex flex-col transition-all duration-300  `} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} >
            <div className={`flex flex-row items-center ${open ? `justify-end` : `justify-center`} m-5`}>
                <span className='rounded-full m-5'
                    onClick={handleClick}
                >
                    <ArrowBackIosRounded className={`text-[#F5F5F5] transform ${open ? '' : 'rotate-180'} transition-transform duration-300`} />

                </span>
            </div>


            <SidePannelRow icon={AddCircleOutlineRounded} open={open} text="Criar" pannel={Pannels.CREATE} active={props.activePannel == Pannels.CREATE} setActivePannel={props.setActivePannel} />
            <SidePannelRow icon={ViewKanbanOutlined} open={open} text="Rotinas" pannel={Pannels.ROUTINES} active={props.activePannel == 'routines'} setActivePannel={props.setActivePannel} />
            <SidePannelRow icon={AccessTime} open={open} text="Historico" pannel={Pannels.HISTORIC} active={props.activePannel == 'historic'} setActivePannel={props.setActivePannel} />
            <SidePannelRow icon={Person} open={open} text="Grupos" pannel={Pannels.GROUPS} active={props.activePannel == 'groups'} setActivePannel={props.setActivePannel} />

        </div>
    </>)
}

interface SidePannelRowProps {
    open: boolean;
    text: string;
    icon: any;
    pannel: string;
    active: boolean;
    setActivePannel: (pannel: string) => void;
}

function SidePannelRow(
    props: SidePannelRowProps
) {

    return (
        <Link to={"/" + props.pannel} onClick={() => { props.setActivePannel(props.pannel) }} className={`flex flex-row items-center ${props.open ? `justify-start` : `justify-center`} m-5 p-3 ${props.open && props.active ? 'border border-[#235563]  rounded-lg bg-[#235563]' : ''}`}>
            <span className={`${!open && 'mx-auto'}`}>
                < span color="#0A2C35" className="bg-[#F5F5F5] p-2 rounded-[100px] "  >
                    <props.icon className="fontSizeLarge"/></span>
            </span>
            <span className={`text-white text-xl p-3 ${props.open ? 'block' : 'hidden'}`}>{props.text[0].toUpperCase() + props.text.substring(1)}</span>
        </Link>
    )
}