const product = require('../productdb.js')
const {v4 : uuidv4} = require('uuid')
const allProduct = product.getProductdata ()


const searchProductbybrand = (brand) => {
    var noBrand = true; 
    const result = [];
    for(let proDUCT of allProduct){ 
        if(proDUCT.brand.toLowerCase() === brand.toLowerCase ()){ 
            result.push(proDUCT);
            noBrand = false;  
        }
    }
    if(noBrand){
        return ("no data found"); 
    }
     return result;
    }

console.log(searchProductbybrand("dell"))

//console.log(searchProductbybrand("samsung"))
  


//const allProduct = {}
const addProduct = (name, price ,brand ,rating) => {

allProduct.push({ product_id: uuidv4(), Category : name , price: price , brand : brand , rating : rating})
if(product.getProductdataUpdate(allProduct)){
    console.log("item added")
}else{
    console.log("error")
}
}
addProduct("Telivision" , 8000 , "Dell", "5")


const removeProduct = (productid) =>{
        if(productid in allProduct){
            delete allProduct[productid] 
            if(product.getProductdataUpdate(allProduct)){
                    console.log("removed successfully");
            }else{
                console.log("error occur while saving on database");
            }
        }else{
            console.log("no product on this id");
        }
    }
//removeProduct("50060f6e-5c77-41ff-b8c1-4746dd50a7c6")



const updateProduct = (Productnumber, Productinfo) =>{
     if(Productnumber in allProduct ){
        for(let property in Productinfo){
        allProduct[Productnumber][property] = Productinfo[property]
        }
        if(product.getProductdataUpdate(allProduct)){
            console.log("Data updated");
        }else{
            console.log("error occured while updating");
        }
     }else{
        console.log("no product found for this id :"  + Productnumber)
     }
    
     }

const pro = {name: "Mobile" , price:9000 , brand:"samsung"}
//updateProduct("50060e-5c77-41ff-b8c1-4746dd50a7c4" , pro)
