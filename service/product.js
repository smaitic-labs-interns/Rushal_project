const product = require('../database/productdb.js')

const things = product.getProductdata()


const searchProductbybrand = (brand) => {
  
    for( i = 0; i < things.length; i++){

        if(things[i].brand === brand){

       console.log(things[i])
    
        }  
    }
  

}
console.log(searchProductbybrand("detol"))