
const order_schema = (cart,shipementAddress , Payment , totalcost) => {


    return{
            UserId: cart.UserId,
            Products: cart.Products,
            totalcost: totalcost,
            shipementAddress,
            payment: Payment,
            orderStatus: "Requirements Complete please wait!",
    }
}

const order_schema_by_user = (cart, shipmentdetails , totalcost) => {


    return{
            UserId: cart.UserId,
            Products: cart.Products,
            totalcost: totalcost,
            shipmentdetails,
            orderStatus: "Review",
    }
}
module.exports = {order_schema , order_schema_by_user}