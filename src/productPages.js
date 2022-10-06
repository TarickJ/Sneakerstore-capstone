const numberOfItemsInCart = document.querySelector(".cartAmount");
//-----------------------------------------------

//----- cart array -----//
let cart = JSON.parse(localStorage.getItem("CART")) || [];
// let cart = [];
updateCart();
//-----------------------------------------------

//----- Add To cart -----//
function addToCart(id) {
  //check if the product already exists in cart
  if(cart.some((item) => item.id === id)) {
    //updates number of units on button click
    alert("Product already in cart")
    changeNumberOfUnits(id)
  } else {
      const item = products.find((product) => product.id === id);
      cart.push({
        ...item,
        numberOfUnits: 1,
      });

updateCart()
// console.log(cart)
  }

};
//-----------------------------------------------

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

//----- render cart items -----//
function renderCartItems() {
  cartItems.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItems.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img width="50" src="${item.img}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <p>R ${item.price}</p> 
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
            </div>
            <div class="remove-item" onclick="removeItemFromCart(${item.id})">
            <h1> X </h1>
            </div>
        </div>
      `;
  });
}
//-----------------------------------------------

//----- change number of item units -----//
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {

    let numberOfUnits = item.numberOfUnits;

    // if (item.id === id) {
    //   if (action === "minus" && numberOfUnits > 1) {
    //     numberOfUnits--;
    //   } else if (action === "plus" && numberOfUnits < item.instock) {
    //     numberOfUnits++;
    //   }
    // }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
};
//-----------------------------------------------

//--------get totals units price--------
// get total price
function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i +=1) {
    total += cart[i].price * cart[i].numberOfUnits;
  }
  // console.log(total.toFixed(2))
  alert("Your cart total is " + total.toFixed(2))
  return total.toFixed(2);
};
//-------------------------------