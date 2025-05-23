import type { PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren {
    onClick?: () => void 
}


export default function DefaultButton(props: ButtonProps) {


    return (
        <div className=" mx-auto flex bg-[#0A2C35] w-36 h-16 rounded-md text-amber-50 text-center text-xl font-bold transition-colors hover:bg-amber-50 hover:text-slate-800  ">
            <button className="mx-auto my-auto" onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
}