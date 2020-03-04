let CartItem = require("./classes/cartItem");

function makeCartItem(sku) {
  let query = sku || "";
  if (query){
    query = "/?Item_sku=" + sku;
  }
  $.get("api/items"+ query, function (data) {
    console.log(data)
  })
}
