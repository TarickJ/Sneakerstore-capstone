const shop = document.getElementById("shop");
//-----------------------------------------------

// const cartItems = document.querySelector(".cart-items");
// const subtotal = document.querySelector(".subtotal");
const numberOfItemsInCart = document.querySelector(".cartAmount");
//-----------------------------------------------

//----- generate store items -----//
let generateShop = () => {
  products.forEach((product) => {
    shop.innerHTML += 
    `
    <div class="product">
        <a href="${product.name}.html"><img width="200" src=${product.img} alt=""></a>
        <div class="details">
          <h3>${product.name}</h3>
          <div class="description">
          <p class="desc">${product.desc}</p>
          </div>
        </div>
        <div class="price-quantity">
        <h2>R ${product.price} </h2>
      </div>
        <div class="buttons" onclick="addToCart(${product.id})">
        <button  id="addToCart" class="addToCart"><i class="bi bi-cart-plus"></i></button>
        </div>
      </div>
    `;
  });
};
//-----------------------------------------------
generateShop();


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
// function renderCartItems() {
//   cartItems.innerHTML = ""; // clear cart element
//   cart.forEach((item) => {
//     cartItems.innerHTML += `
//         <div class="cart-item">
//             <div class="item-info">
//                 <img width="50" src="${item.img}" alt="${item.name}">
//                 <h4>${item.name}</h4>
//             </div>
//             <div class="unit-price">
//                 <p>R ${item.price}</p> 
//             </div>
//             <div class="units">
//                 <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
//                 <div class="number">${item.numberOfUnits}</div>
//                 <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
//             </div>
//             <div class="remove-item" onclick="removeItemFromCart(${item.id})">
//             <h1> X </h1>
//             </div>
//         </div>
//       `;
//   });
// }
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


// //styling
// // //accordion dropdown
// $(function () {
//   $("#accordion").accordion({
//       collapsible: true,
//       active: false,
//       event: "mouseover"
//   }).on('mouseleave', function () {
//       $(this).accordion("option", "active", false);
//   });
// });


//-----------------hide show details----------------------
$(function () {
  $(document).on('mouseenter', '.product', function () {
      $(this).find(".desc").show();
  })
  .on('mouseleave', '.product', function () {
      $(this).find(".desc").hide();
  });
});
//-------------------------------------------------------

// -------animate product background on hover chain-------
$(function () {
  $(document).on('mouseenter', '.product', function () {
      $(this).animate({backgroundColor: "#ff7f50"}, '500')
      .animate({backgroundColor: "yellow"}, '500');
  })
  .on('mouseleave', '.product', function () {
      $(this).animate({
        backgroundColor: "white"
    }, '500');
  });
});
//--------------------------------------------







































// // updateShoppingCartHTML();

// // //styling
// // //accordion dropdown


// // hide show details
// $(function () {
//   $(document).on('mouseenter', '.product', function () {
//       $(this).find(".desc").show();
//   }).on('mouseleave', '.item', function () {
//       $(this).find(".desc").hide();
//   });
// });


// //animate product background on hover chain
// $(function() {
//   $('.product').mouseover(function() {
//       $(this).animate({backgroundColor: "#ff7f50"}, '500')
//       .animate({backgroundColor: "yellow"}, '500');
//   });
//   $('.product').mouseout(function() {
//       $(this).animate({
//           backgroundColor: "white"
//       }, '500');
//   });
// });





// // new//////


//   const shop = document.getElementById("shop");
//   const cartQuantity = document.getElementById("cart-quantity");
//   const itemList = document.getElementById("item-list");
//   const cartTotal = document.getElementById("cart-total");
//   const addForm = document.getElementById("add-form");
//   const itemName = document.getElementById("item-name");
//   const itemPrice = document.getElementById("item-price");
// const products = document.querySelectorAll('.product');

// let shopItemsData = [
//   {
//     id: "Reebok01",
//     name: "Reebok Instapump Fury2 The Jetsons x The Flintstones",
//     price: 2000,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/Reebokjxf.webp",
//     quantity:1,
//   },
//   {
//     id: "Jordan01",
//     name: "Jordan 1 MID Grad School",
//     price: 5000,
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/Jordan1MidGradeSchool.webp",
//     quantity:1,
//   },
//   {
//     id: "Vans01",
//     name: "Napapijri x Vans Ultrarange EXO Hi MTE",
//     price: 2800, 
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/Napapijri-x-Vans-Ultrarange-EXO-Hi-MTE.webp",
//     quantity:1,
//   },
//   {
//     id: "Flight01",
//     name: "Nike Air Flight Lite MID",
//     price: 2500, 
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/NikeAirFlightLiteMidOlympic.webp",
//     quantity:1,
//   },
//   {
//     id: "NEWBALANCE01",
//     name: "NEW BALANCE 574-V",
//     price: 1500, 
//     desc:
//     "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/NEW-BALANCE-574-V2.webp",
//     quantity:1,
//   },
//   {
//     id: "Converse01",
//     name: "Carhartt WIP x Converse One Star Pro",
//     price: 1300, 
//     desc:
//     "Lorem ipsum dolor sit amet consectetur adipisicing.",
//     img: "images/Carhartt-WIP-x-Converse-One-Star-Pro.webp",
//     quantity:1,
//   },
// ];
// //-----------

// // const cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];
// const cart = [];

// let generateShop = () => {
//   return (shop.innerHTML = shopItemsData
//     .map((x) => {
//       let { id, name, price, desc, img } = x;
//       // let search = cart.find((x) => x.id === id) || [];
//       return `
//     <div id=${id} class="product">
//         <img width="200" src=${img} alt="">
//         <div class="details">
//           <h3>${name}</h3>
//           <p>${desc}</p>
//           <div class="price-quantity">
//             <h2>R ${price} </h2>
//             <div class="buttons">
//             <button onclick="boo()" class="addToCart" id=${id} data-name="${name}"><i class="bi bi-cart-plus"></i></button>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//     })
//     .join(""));
// };
// generateShop();

// const basket = JSON.parse(localStorage.getItem("itemsInCart")) || [];
// //------------------------------------------------------

// //------------------------------------------------------
// //handle change events on input
// itemList.onchange = function(e) {
//   if (e.target && e.target.classList.contains("update")) {
//     // console.log(e.target)
//     const name = e.target.dataset.name;
//     const quantity = parseInt(e.target.value);
//     updateCart(name, quantity)
//   }
// };
// //------------------------------------------------------
// //handle clicks on list
// itemList.onclick = function(e) {
//   // console.log("clicked")
//   // console.log(e.target)
//   if (e.target && e.target.classList.contains("remove")) {
//     const name = e.target.dataset.name;
//     removeItem(name);
//   }
//   else if (e.target && e.target.classList.contains("add-one")) {
//     const name = e.target.dataset.name;
//     addToCart(name);
//   } else if (e.target && e.target.classList.contains("remove-one")) {
//     const name = e.target.dataset.name;
//     removeItem(name, 1);
//   }
// }

// // itemList.onclick = function(e) {
// //   // console.log("clicked")
// //   // console.log(e.target)
// //   if (e.target && e.target.classList.contains("+")) {
// //     const name = e.target.dataset.name
// //     incremntItem(name);
// //   }
// // }


// //------------------------------------------------------
// //add form submit
// addForm.onsubmit = function(e) {
//   e.preventDefault()
//   const name = itemName.value;
//   const price = itemPrice.value;
//   addToCart(name, price);
// }

// function boo(id) {
//   console.log(id)
// }

// //add item
// //-----------------------------------------------------
// function addToCart(id, name, price) {
//   for (let i = 0; i < cart.length; i += 1) {
//     if (cart[i].name === name) {
//       cart[i].quantity += 1;
//       console.log(id)
//       // showItems()
//       return
//     }
//   }
//   const item = { id, name, price, quantity:1 }
//   cart.push(item)
//   console.log(item)
//   // console.log(id)
//   // showItems()
// };
// // let addToCart = (id) => {
// //   let selectedItem = id;
// //   //checking if item exists in cart to not have doubles of same id
// //   let search = cart.find((product) => product.id === selectedItem);

// //   if(search === undefined) {
// //     cart.push({
// //       id: selectedItem,
// //       item: 1,
      
// //     });
// //   }
// //   else {
// //     //increments item instead of another of the same product in cart
// //     search.item += 1;
// //   }
// // // localStorage.setItem("itemsInCart", JSON.stringify(cart));
// //   console.log(selectedItem);
// //   // showItems(selectedItem);
// // };
// //-----------------------------------------------------
// //show items
function showItems() {
  const quantity = getQuantity();
  const total = getTotal();
  // console.log(`you have ${getQuantity()} items in your cart`)
  //returns value of function if not for const quantity = getQuantity();
  // console.log(`you have ${quantity} items in your cart`)
  cartQuantity.innerHTML = `you have ${quantity} items in your cart`;
  let itemString = "";
  for (let i = 0; i < cart.length; i +=1) {
    // console.log(`${cart[i].name}: R ${cart[i].price} * ${cart[i].quantity}`);
    // const name = cart[i].name;
    // const price = cart[i].price;
    // const quantity = cart[i].quantity;
    const {id, name, price, desc , img ,quantity} = cart[i];
    
    const sumQuanity = price * quantity;
    itemString += `<li>
      ${name}: 
      R ${price} x ${quantity} = 
      ${sumQuanity.toFixed(2)}
      <button class="remove" data-name="${name}">Remove</button>
      <button class="add-one" data-name="${name}"> + </button>
      <button class="remove-one" data-name="${name}"> - </button>
      <input class="update" type="number" data-name="${name}">
      </li>`;
  }

  itemList.innerHTML = itemString;

  // console.log(`your total is: R${total}`)
  cartTotal.innerHTML = `your total is: R${total}`;
};
// //-----------------------------------------------------
//get quantity
// function getQuantity(){
//   let quantity = 0;
//   for (let i = 0; i < cart.length; i +=1) {
//     quantity += cart[i].quantity;
//   }
// return quantity
// };
// //-----------------------------------------------------
// // get total price
// function getTotal() {
//   let total = 0;
//   for (let i = 0; i < cart.length; i +=1) {
//     total += cart[i].price * cart[i].quantity;
//   }
//   return total.toFixed(2);
// };
// //-----------------------------------------------------
// // remove item
// function removeItem(name, quantity = 0) {
//   for (let i = 0; i < cart.length; i +=1) {
//     if (cart[i].name === name ) {
//       if (quantity > 0) {
//         cart[i].quantity -= quantity
//       }
//       if (cart[i].quantity < 1 || quantity === 0) {
//         cart.splice(i, 1)
//       }
//       showItems()
//       return
//     }
//   }
// };
// //-----------------------------------------------------
// // decrement by 1
// // function decremntItem(name) {
// //   for (let i = 0; i < cart.length; i +=1) {
// //     if (cart[i].name === name ) {
// //       cart[i].quantity -= 1;
// //       if (cart[i].quantity ===0) {
// //             cart.splice(i, 1)
// //             // working with qnty of 0
// //       }
// //       return
// //     }
// //   }
// // };
// // //-----------------------------------------------------
// // //increament by 1
// // function incremntItem(name) {
// //   for (let i = 0; i < cart.length; i +=1) {
// //     if (cart[i].name === name ) {
// //       cart[i].quantity += 1;
// //       return
// //     }
// //   }
// // };
// //-----------------------------------------------------
// function updateCart(id, name, price, quantity) {
//   for (let i = 0; i < cart.length; i +=1) {
//     if (cart[i].name === name) {
//       if (quantity < 1) {
//         removeItem(name)
//         return
//       }
//       cart[i].quantity = quantity;

//       showItems()
//       return
//     }
//   }
// };
// //-----------------------------------------------------
// //  addToCart("orange", 0.99);
// //  addToCart("banana", 0.99);
// //  addToCart("pear", 0.59);
// //  addToCart("orange", 0.99);
// //  addToCart("banana", 0.99);
// //  showItems();
// // console.log("**************************")
// // showItems();
// //-----------------------------------------------------

// // //styling
// // //accordion dropdown


// // hide show details
// $(function () {
//   $(document).on('mouseenter', '.product', function () {
//       $(this).find(".desc").show();
//   }).on('mouseleave', '.item', function () {
//       $(this).find(".desc").hide();
//   });
// });


// //animate product background on hover chain
// $(function() {
//   $('.product').mouseover(function() {
//       $(this).animate({backgroundColor: "#ff7f50"}, '500')
//       .animate({backgroundColor: "yellow"}, '500');
//   });
//   $('.product').mouseout(function() {
//       $(this).animate({
//           backgroundColor: "white"
//       }, '500');
//   });
// });