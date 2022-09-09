
const product_schema = (category, name, price , brand, quantity) =>{
  return  {
        category: category,
        name: name,
        price: price,
        brand: brand,
        Quantity: quantity,
      }
}
module.exports = {product_schema}