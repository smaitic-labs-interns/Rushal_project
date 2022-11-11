export const userEnd = {
    'login' : {
        'url' : '/user/signin',
        'method': 'POST',
           
    },

    'signup' : {
        'url' : '/user/adduser',
        'method': 'POST',
    }
}
export const productEnd = {

    'search' : {
        'url' : '/product/searchproduct/:keyword',
        'method': 'GET'
    },

    'allProduct' : {
        'url' : '/product',
        'method' : 'GET'
    },

    'updateProduct' : {
        'url' : '/product/updateproduct/:id',
        'method' : 'PUT'
    },
    'removeProduct' : {
        'url' : '/product/removeproduct/:id',
        'method' : 'DELETE'
    }
}
export const cartEnd = {

    'addCart' : {
        'url' : '/cart/addcart/:userid',
        'method': 'POST'
    }
}

export const orderEnd = {

    'order' : {
        'url' : '/order/placeorder/:userid',
        'method': 'POST'
    }
}