const ValidationMessage = ({
    message
}) => {
    return (
        <p key={message} className="text-center italic text-[#ae0001] font-bold">{message}</p>
    )
}
export default ValidationMessage