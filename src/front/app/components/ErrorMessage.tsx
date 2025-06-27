import { useState, type Key } from "react"

const ErrorMessage = (props: { message: string | null, key?: Key }) => {

    const [bounce, setBounce] = useState(true)

    setInterval(() => {
        setBounce(false)
    }, 500)

    return (<>
        {props.message && (
            <div
                key={props.key}
                className={`mt-4 text-red-500 text-sm text-center ${bounce ? 'animate-wiggle' : ''}`}
            >
                {props.message}
            </div>
        )}
    </>
    )
}

export default ErrorMessage;