const Register = () => {
    return(
        <div className="bg-[#FAF9F6] h-full rounded-3xl mt-6 w-full shadow-lg flex-row">
            <h1 className="text-[#ffe0bd] text-2xl italic uppercase font-bold w-full text-center mt-8">Register</h1>
            {/* {messages 
            ? messages.map((message) => <ValidationMessage message={message}/>)
            : null
            } */}
            <form>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="firstName" className="">First Name:</label>
                <input type="input" name="firstName" id="firstName" className="ml-6"/>
            </div>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="lastName" className=" ">Last Name:</label>
                <input type="input" name="lastName" id="lastName" className="ml-6" />
            </div>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="email" className="">Email:</label>
                <input type="input" name="email" id="email" className="ml-[72px]" />
            </div>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="country" className="">Country:</label>
                <input type="input" name="country" id="country" className="ml-12" />
            </div>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="city" className="mr-2">City:</label>
                <input type="input" name="city" id="city" className="ml-20" />
            </div>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="city" className="">Street Adress:</label>
                <input type="input" name="city" id="city" className="" />
            </div>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="password" className="">Password:</label>
                <input type="password" name="password" id="password" className="ml-8" />
            </div>
            <div className="flex mt-4 justify-center items-align">
                <label htmlFor="re-password" className="">Re-Password:</label>
                <input type="password" name="re-password" id="re-password" className="" />
            </div>
            <div className="flex justify-center mt-4">
                <button type="submit" className="py-2 px-10 rounded-md text-white bg-[#d9b99b] font-bold">Submit</button>
            </div>
            </form>
        </div>
    )
}
export default Register;