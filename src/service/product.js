const product = require('../database/productdb.js')
const {v4 : uuidv4} = require('uuid')
const allProduct = product.getProductdata ()


const searchProduct = (keyword) => {
  try {
    const result = [];
    for (let products of allProduct) {
      for (key in products) {
        if (typeof products[key] === "string" && typeof keyword === "string") {
          if (products[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            result.push(products);
            break;
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

searchProduct("d");

const addProduct = (category, price, brand, rating) => {
  try {
    allProduct.push({
      product_id: uuidv4(),
      category: category,
      price: price,
      brand: brand,
      rating: rating,
    });
    if (product.updateProductData(allProduct)) {
      console.log("item added");
    } else {
      throw new Error("error while adding");
    }
  } catch (err) {
    console.log(err.message);
  }
};
//addProduct("Monitor", 4000, "Samsung", "1");


const removeProduct = (productid) => {
  try {
    for (let Product of allProduct) {
      if (Product.product_id === productid) {
        const remainingProduct = allProduct.filter(
          (pro) => pro.product_id !== productid
        );
        if (product.updateProductData(remainingProduct)) {
          console.log("removed successfully");
          return;
        }
        throw new Error("error occur while saving on database");
      }
    }
    console.log("no product on this id");
  } catch (err) {
    console.log(err.message);
  }
};
//removeProduct("8f1758e5-3055-4111-9b84-a911d3271fbe");



const updateProduct = (Productid, Productinfo) => {
  try {
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

const pro = { Category: "Laptop", price: 90000, brand: "samsung" };
//updateProduct("3d4c3013-eadb-40b1-ba4e-fa7026dbe9a0", pro);
