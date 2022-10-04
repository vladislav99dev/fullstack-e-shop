import Input from "./Input";

const ChangePassword = () => {
    return (
        <>
        <h1 className="text-[#00df9a] text-2xl italic uppercase font-bold w-full text-center">Change Password</h1>
        <form className="mt-2">
            <Input labelName={"Enter Old Password"}/>
            <Input labelName={"Enter New Password"}/>
            <Input labelName={"Repeat New Password"}/>
            <div className="flex justify-center">
                <button className="mt-4 mb-4 py-2 px-16 rounded-lg bg-[#00df9a] text-white italic font-bold text-xl hover:bg-green-300 ease-in-out duration-500" >Submit</button>
            </div>
        </form>
        </>
    )
}
export default ChangePassword;