const DesktopCard = ({
    titleName,
    services
}) => {
    console.log(services)
    return (
        <ul className="hidden md:block text-white px-6 py-4 mt-4 w-full hover:cursor-pointer hover:text-[#00df9a] lg:text-center">{titleName}
            {services.map((x) => <li  className="text-gray-400 text-sm hover:cursor-pointer hover:text-green-200">{x}</li>
            )}
        </ul>
    )
}
export default DesktopCard;