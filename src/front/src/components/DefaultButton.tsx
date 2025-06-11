import type { PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren {
    onClick?: () => void
    buttonType?: ButtonTypes
}

export enum ButtonTypes {
    PRIMARY = 'primary',
    ACTION = 'action',
    SECONDARY = 'secondary',
    ERROR = 'error'
}

export default function DefaultButton({ buttonType: type, onClick, children, ...props }: ButtonProps & Record<string, any>) {
    const buttonType = type || ButtonTypes.PRIMARY;

    return (
        <div className="">
            <button 
                {...props}
                className={
                    `${buttonType == ButtonTypes.PRIMARY ? `bg-[#0A2C35]` :
                    buttonType == ButtonTypes.SECONDARY ? `bg-amber-50` :
                    buttonType == ButtonTypes.ACTION ? `bg-[#00161C]` :
                        `bg-red-500`}
                    ${buttonType == ButtonTypes.SECONDARY ? 'text-slate-800' : 
                    buttonType == ButtonTypes.ACTION ? 'text-[#F5F5F5]' : 'text-white'} 
                    ${buttonType == ButtonTypes.ACTION ? 'w-64 px-4 py-2' : 'h-16 w-48'} 
                    text-xl font-bold rounded-lg
                    transition-colors
                    ${buttonType == ButtonTypes.PRIMARY ? `hover:bg-amber-50` :
                    buttonType == ButtonTypes.SECONDARY ? `hover:bg-[#0A2C35] hover:text-white` :
                    buttonType == ButtonTypes.ACTION ? `hover:bg-gray-300` :
                        `hover:bg-red-700`} 
                    hover:text-slate-800
                    px-4 py-4 shadow-md
                    ${children === 'CRIAR' ? 'px-15 w-35' : 'w-fit'}
                    ${children === 'DELETAR' ? 'px-11 bg-red-600 hover:bg-red-700' : 'w-fit'}
                    ${children === 'CANCELAR' ? 'px-9 bg-gray-400 hover:bg-gray-300' : 'w-fit'}
                    shadow-md
                    `}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}