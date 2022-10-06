const numberOfItemsInCart = document.querySelector(".cartAmount");

let cart = JSON.parse(localStorage.getItem("CART")) || [];
// let cart = [];
updateCart();

//----- update cart -----//
function updateCart() {
  // renderCartItems();
  // renderSubtotal();
  cartItemsNumber()
  getTotal()
// save to local storage
localStorage.setItem("CART", JSON.stringify(cart));
};
//-----------------------------------------------

//------- cart icon number update---------------
function cartItemsNumber() {
    totalItems = 0;

  cart.forEach((item) => {
    totalItems += item.numberOfUnits;
  });

  numberOfItemsInCart.innerHTML = totalItems;
};
//-----------------------------------------------