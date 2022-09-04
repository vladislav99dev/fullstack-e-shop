import {url} from '../constants.js'

const productsRequester = (method,data,token,id) => {
    let fetchUrl =`${url}/admin/products`;
    if (method === 'POST') {
        fetchUrl = `${fetchUrl}/create`
    }
    return fetch(fetchUrl,{
        method:method,
        headers:{
            'content-type':'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            type:data.type,
            category:data.category,
            gender:data.gender,
            brand:data.brand,
            imageUrl:data.imageUrl,
            color:data.color,
            price:data.price,
            sizes:data.sizes
        })
    })
}

export const create = productsRequester.bind(null,"POST");