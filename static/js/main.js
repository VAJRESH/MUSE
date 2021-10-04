let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Gulab Agarbatti 50gm",
    tag: "gulabAgarbatti50gm",
    price: 25,
    inCart: 0,
    img: "images/gulab.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Gulab Agarbatti 250gm",
    tag: "gulabAgarbatti250gm",
    price: 120,
    inCart: 0,
    img: "images/gulab.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Kevada Agarbatti 50gm",
    tag: "kevadaAgarbatti50gm",
    price: 25,
    inCart: 0,
    img: "images/kevada.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Kevada Agarbatti 250gm",
    tag: "kevadaAgarbatti250gm",
    price: 120,
    inCart: 0,
    img: "images/kevada.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Chandan Agarbatti 50gm",
    tag: "chandanAgarbatti50gm",
    price: 25,
    inCart: 0,
    img: "images/chandan.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Chandan Agarbatti 250gm",
    tag: "chandanAgarbatti250gm",
    price: 120,
    inCart: 0,
    img: "images/chandan.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Sonchafa Agarbatti 50gm",
    tag: "sonchafaAgarbatti50gm",
    price: 25,
    inCart: 0,
    img: "images/sonchafa.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Sonchafa Agarbatti 250gm",
    tag: "sonchafaAgarbatti250gm",
    price: 120,
    inCart: 0,
    img: "images/sonchafa.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Mogra Agarbatti 50gm",
    tag: "mografaAgarbatti50gm",
    price: 25,
    inCart: 0,
    img: "images/mogra.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Mogra Agarbatti 250gm",
    tag: "mograAgarbatti250gm",
    price: 120,
    inCart: 0,
    img: "images/mogra.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Panadi Agarbatti 50gm",
    tag: "panadiAgarbatti50gm",
    price: 25,
    inCart: 0,
    img: "images/panadi.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Panadi Agarbatti 250gm",
    tag: "panadiAgarbatti250gm",
    price: 120,
    inCart: 0,
    img: "images/panadi.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Parijatak Agarbatti 50gm",
    tag: "parijatakAgarbatti50gm",
    price: 25,
    inCart: 0,
    img: "images/parijatak.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Parijatak Agarbatti 250gm",
    tag: "parijatakAgarbatti250gm",
    price: 120,
    inCart: 0,
    img: "images/parijatak.jpeg",
    category: "Incense Sticks",
  },
  {
    name: "Utna 50gm",
    tag: "utna50gm",
    price: 50,
    inCart: 0,
    category: "Utna",
  },
  {
    name: "Utna 250gm",
    tag: "utna250gm",
    price: 250,
    inCart: 0,
    category: "Utna",
  },
  {
    name: "Utna 11111",
    tag: "utna",
    price: 50,
    inCart: 0,
    category: "Utna",
  },
  {
    name: "Utna 22222",
    tag: "utna2222",
    price: 250,
    inCart: 0,
    category: "Utna",
  },
  {
    name: "Utna 33333",
    tag: "utna33333",
    price: 50,
    inCart: 0,
    category: "Utna",
  },
  {
    name: "Utna 4444",
    tag: "utna44444",
    price: 250,
    inCart: 0,
    category: "Utna",
  },
  {
    name: "diya 1111",
    tag: "diya1111",
    price: 50,
    inCart: 0,
    category: "Diya",
  },
  {
    name: "diya 2222",
    tag: "diya 2222",
    price: 250,
    inCart: 0,
    category: "Diya",
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    const index = $(carts[i]).data("index");
    console.log(index);
    setItems(products[index]);
    cartNumbers(products[index]);
    totalCost(products[index]);
  });
}

function cartNumbers() {
  const products = JSON.parse(localStorage.getItem("productsInCart") || "{}");
  const productNumbers = Object.keys(products).length || "";

  $(".cart span").html(productNumbers);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };

    $(".cart-icon").addClass("cart-activate");
    const timer = setTimeout(() => {
      $(".cart-icon").removeClass("cart-activate");
      clearTimeout(timer);
    }, 3000);
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  alertBox("success");
}

function alertBox(type) {
  const alertContainer = $(".alert");
  const messageContainer = $(".alert-message");
  const message = [
    "Item has been successfully added to the cart",
    "Item has been successfully removed from the cart",
  ][type === "success" ? 0 : 1];

  alertContainer.show().addClass(`alert-${type}`);
  messageContainer.html(message);

  const timer = setTimeout(() => {
    alertContainer.hide().removeClass(`alert-${type}`);
    messageContainer.html("");

    return clearTimeout(timer);
  }, 3000);
}

function removeItemFromList(product) {
  // load existing data
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);
  delete cartItems[product.tag];
  if (Object.keys(cartItems).length === 0) return clearCart();

  // loop through items and calculate total price
  let totalCost = 0;
  Object.values(cartItems).forEach((item) => {
    totalCost += item.price * item.inCart;
  });

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

  localStorage.setItem("totalCost", totalCost);

  alertBox("danger");
}

function updateQuantity(product, quantity = 1) {
  // load existing data
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);

  cartItems[product.tag].inCart += quantity;

  const totalQuantity = +cartItems[product.tag].inCart;
  if (totalQuantity < 1) return removeItemFromList(product);

  // loop through items and calculate total price
  let totalCost = 0;
  Object.values(cartItems).forEach((item) => {
    totalCost += item.price * item.inCart;
  });

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

  localStorage.setItem("totalCost", totalCost);
}

function totalCost(product) {
  // console.log("Price is",product.price);
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function clearCart() {
  localStorage.clear();
  location.reload();
}

function addItem() {
  $(".addItem").click(function (e) {
    // update the quantity count
    const item = this.dataset.key;
    const cartItems = localStorage.getItem("productsInCart");
    selectedItem = JSON.parse(cartItems)[item];
    updateQuantity(selectedItem);

    // update display
    displayCart();
    alertBox("success");
  });
}

function removeItem() {
  $(".removeItem").click(function (e) {
    // update the quantity count
    const item = this.dataset.key;
    const cartItems = localStorage.getItem("productsInCart");
    selectedItem = JSON.parse(cartItems)[item];
    const isItemRemoved = updateQuantity(selectedItem, -1);

    // update display
    displayCart();
    alertBox("danger");
    if (!isItemRemoved) return;
  });
}

function displayCart() {
  $(".clear-cart-button").prop("disabled", false);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  // console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <tr>
          <td>
            <div class='row'>
              <div class="col-auto px-3">
                <img lazy-loading='true' src="${item.img}" alt="${
        item.name
      }" height='80px' width='80px'>
              </div>
              <div class="col text-left">
                <div class="row">
                  <div class="col-12 px-0 pb-0 product text-lead">
                    <span>${item.name}</span>
                    </div>
                  <div class="col-12 px-0 text-muted small">
                    <span>${item.category}</span>  
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td class="price">
            Rs.${item.price}.00
          </td>
          <td>
            <div class="quantity row">
                <button  class="col removeItem btn btn-link px-1" data-key='${item.tag}'>
                    <ion-icon name="remove-outline"></ion-icon>
                </button>
                <span class='col border border-primary px-1 py-2'>${
                  item.inCart
                }</span>
                <button  class="col addItem btn btn-link px-1" data-key='${item.tag}'>
                    <ion-icon name="add-outline"></ion-icon>
                </button>
            </div>
          </td>
          <td>
            <div class="total item-total">
              Rs.${item.inCart * item.price}.00
            </div>
          </td>
        </tr>
                `;
    });

    productContainer.innerHTML += `
      <tr class='basket-total'>
        <td colspan=4>
          <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
          </div>    
          <h4 class="basketTotal">Rs.${cartCost}.00</h4>
        </td>
      </tr>
        `;

    addItem();
    removeItem();
  } else {
    const htmlStr = `
    <td colspan='4' class='text-center btn-link h5 p-4 bg-light'>
      <a href='index.html'>
      <span class='text-danger'>
        Please Add Items to Cart
      </span>
      </a>
    </td>
    `;
    $(".products").html(htmlStr);
    $(".clear-cart-button").prop("disabled", true);
  }
}

displayCart();
cartNumbers();

// function loadComponents(componentName) {
//   $(`.${componentName}`).load(`components.html #${componentName}`);
// }

// loadComponents("alert-component");
// loadComponents("header");
// loadComponents("footer");

function switchSize() {
  $(".switch-size")
    .unbind()
    .change(function () {
      const btn = $(this).data("btn");
      const [btnName, grams] = btn.split("-");
      const price = $(this).val();
      $(`.product-price-${btnName}`).html(`Rs. ${price}`);

      const isFiftyGm = +grams === 50;
      console.log(`.${btnName}-${isFiftyGm ? "250" : "50"}`, btn);
      $(`.${btnName}-${isFiftyGm ? "250" : "50"}`)
        .parent()
        .hide();
      $(`.${btn}`).parent().show();
    });
}

switchSize();
// end of file
