
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
    return fetch(url,options)
}


export const login = requester.bind(null,'login')