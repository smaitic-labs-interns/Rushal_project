const cart = require('../database/cartdb')
const allCart = cart.getCartdata()


const addtoCart = (CartID, Product) => {
  //assuming customer already have cart created
  for (let Acart of allCart) {
    if (Acart.CartId === CartID) {
      for (let i of Acart.Products) {
        if (Product.Productid === i.id) {
          i.Quantity += Product.Quantity;
          Acart.Totalcost += Product.Quantity * Product.Price;
        
        }
      }
      if (productIdNotFound) {
        Acart["Products"].push({
          id: Product["Productid"],
          Quantity: Product["Quantity"],
        });
        Acart["Totalcost"] += Product["Quantity"] * Product["Price"];
      }
      if (cart.getCartDataUpdate(allCart)) {
        console.log("data added to cart");
        return;
      }
    }
  }
  //  creating new cart
  const carts = { CartId: CartID, Products: [], Totalcost: 0 };
  carts["Products"].push({
    id: Product["Productid"],
    Quantity: Product["Quantity"],
  });
  carts["Totalcost"] += Product["Quantity"] * Product["Price"];
  allCart.push(carts);

  if (cart.getCartDataUpdate(allCart)) {
    console.log("data added to cart");
  } else {
    console.log("error Occured");
  }
};
const cartinfo = { Productid: "555555", Price: 20, Quantity: 4 };
addtoCart("gg ", cartinfo);





// const addtoCart = (CardID , Product) =>{

//     let productIdNotFound = true;
//     for(let Acart in allCart){

//         if(Acart.CardId === CardID){
//         console.log("card if matched");
//         for(let i of Acart.Products){
//             if(Product.Productid === i.id){
//                 i.Quantity += Product.Quantity 
//                 Acart.Totalcost += Product.Quantity * Product.Price 
//                 productIdNotFound = false
                
//             }
//         }
//         } 
//     }


//}



