const cartItems = document.querySelector(".cart-items");
const subtotal = document.querySelector(".sum-prices");
const numberOfItemsInCart = document.querySelector(".cartAmount");
//-----------------------------------------------

//----- cart array -----//
let cart = JSON.parse(localStorage.getItem("CART")) || [];
// let cart = [];
updateCart();
//-----------------------------------------------


///----- Add To cart -----//
function addToCart(id) {
  //check if the product already exists in cart
  if(cart.some((item) => item.id === id)) {
    //updates number of units on button click
    changeNumberOfUnits("plus", id)
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
  renderCartItems();
  renderSubtotal();
// save to local storage
localStorage.setItem("CART", JSON.stringify(cart));
};
//-----------------------------------------------


//----- calculate and render subtotal -----//
function renderSubtotal() {
  let discountVal = discount();
  // console.log("your discount is " + discountVal);
  let deliveryPrice = deliveryCost();
  // console.log("your delivery price is " + deliveryPrice)
  const subtotalPrice = getTotal();
  // console.log("your subtotal price is " + subtotalPrice)
  const subtotalPlusDelivery = deliveryPrice + parseInt(subtotalPrice);
  // console.log("your price including delivery is " + subtotalPlusDelivery)
  const totalPrice = deliveryPrice + parseInt(subtotalPrice) - discountVal;
  // console.log("your total is " + totalPrice)
  const PlusVat = parseInt(totalPrice) * 1.15;
  // console.log(PlusVat.toFixed(2));
  // const totalWithVat = getVatTotal();
  // console.log("your with vat is " + totalWithVat)
  const totalItems = getNumberOfUnits();
  // console.log("your total items is " + totalItems)

  subtotal.innerHTML = 
                      `<ul>
                          <li><small>Subtotal (${totalItems} items): R ${subtotalPrice}</small></li>
                          <li><small>Discount: R ${discountVal}</small></li>
                          <li><small>Delivery Price: R ${deliveryPrice}</small></li>
                          <li class="totalPrice">Total plus vat: R ${PlusVat.toFixed(2)}</li>
                      </ul>`;
  numberOfItemsInCart.innerHTML = totalItems ;
};
//-----------------------------------------

//--------get totals units price--------
// get total price
function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i +=1) {
    total += cart[i].price * cart[i].numberOfUnits;
  }
  // console.log(total.toFixed(2))
  return total.toFixed(2);
};
getTotal()
//-------------------------------
//get total number of units
  function getNumberOfUnits() {
    let numberOfUnits = 0;
    for (let i = 0; i < cart.length; i +=1) {
      numberOfUnits += cart[i].numberOfUnits;
    }
// console.log(numberOfUnits)
  return numberOfUnits
  };
  getNumberOfUnits()
//-------------------------------
//get vat icluded total
function getVatTotal() {
  let total = getTotal();
  let vatInclPrice = total * 1.15
  // console.log(vatInclPrice)
  return vatInclPrice.toFixed(2);
}
getVatTotal()
//-------------------------------
//hand delivery onchange
document.getElementById("deliveryOpts").addEventListener("change", deliveryCost);
// //-------------------------------
//get shipping cost
function deliveryCost() {
  const overNight = document.getElementById("deliveryOpt1");
  const standard = document.getElementById("deliveryOpt2");
  const collection = document.getElementById("deliveryOpt3");
  let delivery = 0;
  if(overNight.checked === true) {
    delivery = 100.00;
  }    else if(standard.checked === true){
    delivery = 50.00;
  } else if (collection.checked === true){
    delivery = 0;
  }
  // console.log("delivery price is " + delivery)
  return delivery
}
//-----------------------------------------
// get discount
document.getElementById("signUp").addEventListener("change", discount);

function discount() {
  const signUp = document.getElementById("mailingList");
  let discount = 0;
  if(signUp.checked === true) {
    discount = 50.00;
    // return
  }
  // console.log(discount)
  return discount
}
//----------------------------------------

//----- confirm order function -----//
//-----generate reference number
function confirmOder() {
  const refNumber = document.getElementById("reference-number");
  let refNo = Date.now();
  // alert(refNo)
  console.log("Your Reference Number Is: " + refNo)
refNumber.innerHTML = `Your Reference Number Is: ${refNo}`;
}
//----------------------------------------

//----- render cart items -----//
function renderCartItems() {
  cartItems.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItems.innerHTML += `
    <li>
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
            <p class="remove">X</p>
            </div>
        </div>
        </li>
      `;
  });
}
//-----------------------------------------------

//----- remove item from cart -----//
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
};
//-----------------------------------------------

//----- change number of item units -----//
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {

    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
};
//-----------------------------------------------

