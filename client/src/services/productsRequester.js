import {url} from '../constants.js'

const productsRequester = (method,data,token,id) => {
    let fetchUrl =`${url}/admin/products`;

    let options ={
        method:method,
        headers:{
            'content-type':'application/json',
            'Authorization': token
        }
    };

    if (method === "POST") {
        fetchUrl = `${fetchUrl}/create`
    }
    if(method === "PUT"){
        fetchUrl = `${url}/admin/products/${id}/edit`
    }
    if(method === "GET"){
        fetchUrl = `${url}/admin/products/${id}`
    }
    if(method === "DELETE") {
        fetchUrl = `${url}/admin/products/${id}/delete`
    }

    if(method === "POST" || method === "PUT"){
        options.body = JSON.stringify({
            type:data.type,
            category:data.category,
            name:data.name,
            gender:data.gender,
            brand:data.brand,
            imageUrl:data.imageUrl,
            color:data.color,
            price:data.price,
            sizes:data.sizes
        })
    }
    return fetch(fetchUrl,options)
}

export const create = productsRequester.bind(null,"POST");
export const edit = productsRequester.bind(null,"PUT");
export const getOne = productsRequester.bind(null,"GET");
export const deleteOne = productsRequester.bind(null,"DELETE");


