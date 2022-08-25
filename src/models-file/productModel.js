const {v4:uuidv4} = require('uuid')

const product_schema = (category, name, price , brand, quantity) =>{
    return  {
          product_id: uuidv4(),
          category: category,
          name: name,
          price: price,
          brand: brand,
          Quantity: quantity,
        }
  }
  module.exports = {product_schema}