import { BiPlus, BiMinus } from "react-icons/bi";

const MobileToggle = ({togglesState, clickHandler, titleName, services,state}) => {
  return (
    <div
      onClick={clickHandler}
      className="flex justify-between cursor-pointer bg-[#00df9a] hover:bg-green-300 ease-in-out duration-200 md:hidden"
    >
      <ul className="text-white px-6 py-4 font-semibold text-sm">
        {titleName}
        {togglesState[state] ? (
          <>
            <li className="py-[0.25rem] text-sm mt-4 text-green-100">
              Order Status
            </li>
            <li className="py-[0.25rem] text-sm text-green-100">
              Shipping and Delivery
            </li>
            <li className="py-[0.25rem] text-sm text-green-100">Reteurns</li>
            <li className="py-[0.25rem] text-sm text-green-100">
              Payment Options
            </li>
            <li className="py-[0.25rem] text-sm text-green-100">Contact us</li>
          </>
        ) : null}
      </ul>
      {togglesState[state] ? (
        <BiMinus className="mt-4 mr-4" color={"white"} size={30} />
      ) : (
        <BiPlus className="mt-4 mr-4" color={"white"} size={30} />
      )}
    </div>
  );
};

export default MobileToggle;
