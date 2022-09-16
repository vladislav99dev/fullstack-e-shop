
const requester = (service,data) => {
    let url ='';
    let options = {};
    if(service === 'login'){
        url = `http://localhost:3030/users/login`
        Object.assign(options,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
    }
    if(service === 'register'){
        url = `http://localhost:3030/users/register`
        Object.assign(options,{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                firstName:data.firstName,
                lastName:data.lastName,
                email: data.email,
                country:data.country,
                state:data.state,
                city:data.city,
                zipCode:data.zipCode,
                street:data.street,
                unitNumber:data.unitNumber,
                phoneNumber:data.phoneNumber,
                password: data.password,
            })
        })
    }
    if(service === 'logout'){
        url = `http://localhost:3030/users/logout`
        Object.assign(options, {
            method: "POST"
        })
    }
    return fetch(url,options)
}


export const login = requester.bind(null,'login')
export const register = requester.bind(null,'register')
export const logout = requester.bind(null,'logout')

