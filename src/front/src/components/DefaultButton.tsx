import type { PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren {
    onClick?: () => void
    type?: ButtonTypes
}

export enum ButtonTypes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    ERROR = 'error'
}

export default function DefaultButton(props: ButtonProps) {
    const buttonType = props.type || ButtonTypes.PRIMARY;

    return (
        <div className="">
            <button className={
                `${buttonType == ButtonTypes.PRIMARY ? `bg-[#0A2C35]` :
                    buttonType == ButtonTypes.SECONDARY ? `bg-amber-50` :
                        `bg-red-500`}
                 ${buttonType == ButtonTypes.SECONDARY ? 'text-slate-800' : 'text-white'} rounded-lg 
                 h-16 w-48 text-xl font-bold 
                 transition-colors
                  ${buttonType == ButtonTypes.PRIMARY ? `hover:bg-amber-50` :
                    buttonType == ButtonTypes.SECONDARY ? `hover:bg-[#0A2C35] hover:text-white` :
                        `hover:bg-red-700`} 
                  hover:text-slate-800  `} 
                  onClick={props.onClick}>
                {props.children}
            </button>
        </div >
    )
}