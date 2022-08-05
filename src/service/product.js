const product = require('../database/productdb.js')
const {v4 : uuidv4} = require('uuid')



const searchProduct = async(keyword) => {
  try {
    const allProduct = await product.getProductdata ()
    const result = [];
    for (let products of allProduct) {
      for (key in products) {
        if(key === "Product_id" || key === "brand"){
          continue
        }else{
        if (typeof products[key] === "string" && typeof keyword === "string") {
          if (products[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            result.push(products);
            break;
          }
        }
      }
      }
    }
    if (result.length > 0) {
     console.log(result);
      return;
    }
    throw new Error("no result found");
  } catch (err) {
    console.log(err.message);
  }
};

//searchProduct("r");

const addProduct = async(category, name, price, brand, quantity) => {
  try {
    const allProduct = await product.getProductdata ()
    allProduct.push({
      product_id: uuidv4(),
      category: category,
      name: name,
      price: price,
      brand: brand,
      Quantity: quantity,
    });
    if (await product.updateProductData(allProduct)) {
      console.log("item added");
    } else {
      throw new Error("error while adding");
    }
  } catch (err) {
    console.log(err.message);
  }
};
//addProduct("Laptop","Legion Y 520" ,  400000, "Razor", 1);


const removeProduct = async(productid) => {
  try {
    const allProduct = await product.getProductdata ()
    var i = 0
    for (let Product of allProduct) {
      if (Product.product_id === productid) {
        const remainingProduct = allProduct.splice(i,1)
        if (product.updateProductData(remainingProduct)) {
          console.log("removed successfully");
          return;
        }
        throw new Error("error occur while saving on database");
      }
      i += 1
    }
    console.log("no product on this id");
  } catch (err) {
    console.log(err.message);
  }
};
removeProduct("622afe1b-2ed2-4354-92a8-a7f193bac207");



const updateProduct = async(Productid, Productinfo) => {
  try {
    const allProduct = await product.getProductdata ()
    for (let Product of allProduct) {
      if (Product.product_id === Productid) {
        for (let key in Productinfo) {
          Product[key] = Productinfo[key];
        }
        if (product.updateProductData(allProduct)) {
          console.log("Data updated");
          return;
        }
        throw new Error("error occured while updating");
      }
    }

    console.log("no product found for this id :" + Productid);
  } catch (err) {
    console.log(err.message);
  }
};

const pro = { category: "computer", name: "fantech" ,  price: 90000, brand: "samsung", Quantity:2 };
//updateProduct("622afe1b-2ed2-4354-92a8-a7f193bac207", pro);
