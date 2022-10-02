const DesktopCard = ({
    titleName,
    services
}) => {
    console.log(services)
    return (
        <ul className="text-white px-6 py-4 mt-6">{titleName}
            {services.map((x) => <li  className="text-gray-400 text-sm">{x}</li>
            )}
        </ul>
    )
}
export default DesktopCard;