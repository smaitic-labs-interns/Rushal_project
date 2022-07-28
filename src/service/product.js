const product = require('../database/productdb.js')
const {v4 : uuidv4} = require('uuid')
const allProduct = product.getProductdata ()


const searchProductbybrand = (brand) => {
  const result = [];
  for (let proDUCT of allProduct) {
    if (proDUCT.brand.toLowerCase() === brand.toLowerCase()) {
      result.push(proDUCT);
    }
  }
  if (result.length > 0) {
    return result;
  }
  return "no result found";
};

//console.log(searchProductbybrand("dell"));




const addProduct = (name, price, brand, rating) => {
  allProduct.push({
    product_id: uuidv4(),
    Category: name,
    price: price,
    brand: brand,
    rating: rating,
  });
  if (product.getProductdataUpdate(allProduct)) {
    console.log("item added");
  } else {
    console.log("error");
  }
};
//addProduct("Mouse", 4000, "Dell", "1");


const removeProduct = (productid) => {
  for (let Product of allProduct) {
    if (Product.product_id === productid) {
      const remainingProduct = allProduct.filter(
        (pro) => pro.product_id !== productid
      );
      if (product.getProductdataUpdate(remainingProduct)) {
        console.log("removed successfully");
        return;
      }
      console.log("error occur while saving on database");
    }
  }
  console.log("no product on this id");
};
//removeProduct("8f1758e5-3055-4111-9b84-a911d3271fbe");



const updateProduct = (Productid, Productinfo) => {
  for (let Product of allProduct) {
    if (Product.product_id === Productid) {
      for (let key in Productinfo) {
        Product[key] = Productinfo[key];
      }
      if (product.getProductdataUpdate(allProduct)) {
        console.log("Data updated");
        return;
      }
      console.log("error occured while updating");
    }
  }

  console.log("no product found for this id :" + Productid);
};

const pro = { Category: "Laptop", price: 90000, brand: "samsung" };
updateProduct("3d4c3013-eadb-40b1-ba4e-fa7026dbe9a0", pro);
