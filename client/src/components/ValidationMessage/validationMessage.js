const ValidationMessage = ({
    message
}) => {
    return (
        <p key={message} className="text-center italic text-[#ae0001] font-bold mt-2">{message}</p>
    )
}
export default ValidationMessage