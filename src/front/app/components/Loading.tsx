export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0A2C35]"></div>
            <span className="ml-4 text-xl text-[#0A2C35]">Processando...</span>
        </div>
    )
}