
import { useEffect, useRef, type PropsWithChildren } from "react";
import DefaultButton from "./DefaultButton";

interface ModalProps extends PropsWithChildren {
    openModal: boolean;
    closeModal: () => void;
    actions?: React.ReactElement[];
}

function DefaultModal(props: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openModal]);

    return (
        <dialog
            ref={ref}
            onCancel={props.closeModal}
            className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-4/5"
        >
            <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    {props.children}
                </div>
                <div className="flex w-full p-4 justify-center gap-2">
                    {props.actions && props.actions.map((action, index) => (
                        <div key={index}>{action}</div>
                    ))}
                    <DefaultButton onClick={props.closeModal}>
                        Fechar
                    </DefaultButton>
                </div>
            </div>

        </dialog>
    );
}

export default DefaultModal;