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
    }
}
export const orderEnd = {

    'order' : {
        'url' : '/order/placeorder/:userid',
        'method': 'POST'
    }
}