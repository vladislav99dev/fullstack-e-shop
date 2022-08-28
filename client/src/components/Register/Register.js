const Register = () => {
    return(
        <div className="bg-[#FAF9F6] h-full rounded-3xl mt-6 w-full shadow-lg flex-row lg:w-full">
            <h1 className="text-[#ffe0bd] text-2xl italic uppercase font-bold w-full text-center mt-8">Register</h1>
            {/* {messages 
            ? messages.map((message) => <ValidationMessage message={message}/>)
            : null
            } */}
            <form>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="firstName" className="italic text-[#ffe0bd] font-bold text-xl ml-4 ">First Name:</label>
                <input type="input" name="firstName" id="firstName" className="max-w-xl rounded-md w-48 mr-4"/>
            </div>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="lastName" className="italic text-[#ffe0bd] font-bold text-xl ml-4 ">Last Name:</label>
                <input type="input" name="lastName" id="lastName" className="max-w-xl rounded-md w-48 mr-4" />
            </div>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="email" className="italic text-[#ffe0bd] font-bold text-xl ml-4 ">Email:</label>
                <input type="input" name="email" id="email" className="max-w-xl rounded-md w-48  mr-4" />
            </div>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="country" className="italic text-[#ffe0bd] font-bold text-xl ml-4 ">Country:</label>
                <input type="input" name="country" id="country" className="max-w-xl rounded-md w-48 mr-4" />
            </div>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="city" className="italic text-[#ffe0bd] font-bold text-xl ml-4 ">City:</label>
                <input type="input" name="city" id="city" className="max-w-xl rounded-md w-48 mr-4" />
            </div>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="city" className="italic text-[#ffe0bd] font-bold text-xl ml-4 ">Street Adress:</label>
                <input type="input" name="city" id="city" className="max-w-xl rounded-md w-48 mr-4" />
            </div>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="password" className="italic text-[#ffe0bd] font-bold text-xl  ml-4">Password:</label>
                <input type="password" name="password" id="password" className="max-w-xl rounded-md w-48 mr-4" />
            </div>
            <div className="flex mt-4 justify-between items-align">
                <label htmlFor="re-password" className="italic text-[#ffe0bd] font-bold text-xl ml-4 ">Re-Password:</label>
                <input type="password" name="re-password" id="re-password" className="max-w-xl rounded-md w-48 mr-4" />
            </div>
            <div className="flex justify-center mt-4">
                <button type="submit" className="py-2 px-10 rounded-md text-white bg-[#d9b99b] font-bold">Submit</button>
            </div>
            </form>
        </div>
    )
}
export default Register;