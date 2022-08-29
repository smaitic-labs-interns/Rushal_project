
const order_schema = (cart,shipementAddress , Payment , totalcost) => {


    return{
            UserId: cart.UserId,
            Products: cart.Products,
            totalcost: totalcost,
            shipementAddress,
            payment: Payment,
            orderStatus: "Review",
    }
}
module.exports = {order_schema}