import Input from "./Input"

const EditProfile = ({user}) => {
    return (
        <>
        <h1 className="text-[#00df9a] text-2xl italic uppercase font-bold w-full text-center">Edit Profile</h1>
        <form className="mt-2" >
            <Input labelName={"First Name"} defaultValue={user.firstName}/>
            <Input labelName={"Last Name"} defaultValue={user.lastName}/>
            <Input labelName={"Email"} defaultValue={user.email}/>
            <Input labelName={"Country"} defaultValue={user.country}/>
            <Input labelName={"State"} defaultValue={user.state}/>
            <Input labelName={"City"} defaultValue={user.city}/>
            <Input labelName={"Zip Code"} defaultValue={user.zipCode}/>
            <Input labelName={"Country"} defaultValue={user.country}/>
            <Input labelName={"Street"} defaultValue={user.street}/>
            <Input labelName={"Unit Number"} defaultValue={user.unitNumber}/>
            <Input labelName={"Phone Number"} defaultValue={user.phoneNumber}/>
            <div className="flex justify-center">
                <button className="mt-4 mb-4 py-2 px-16 rounded-lg bg-[#00df9a] text-white italic font-bold text-xl hover:bg-green-300 ease-in-out duration-500" >Submit</button>
            </div>
        </form>
        </>
    )
}


export default EditProfile;