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
    tag: "mograAgarbatti50gm",
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
    name: "Ubtan 15",
    tag: "ubtan15gm",
    price: 10,
    inCart: 0,
    img: "images/ubtan_15_gram.jpg",
    category: "Ubtan",
  },
  {
    name: "Ubtan 100",
    tag: "ubtan100gm",
    price: 70,
    inCart: 0,
    img: "images/ubtan_100_gram.jpg",
    category: "Ubtan",
  },
  {
    name: "Ubtan 250",
    tag: "ubtan250gm",
    price: 160,
    inCart: 0,
    img: "images/ubtan_250_gram.jpg",
    category: "Ubtan",
  },
  {
    name: "Small Diya",
    tag: "smallDiya",
    price: 30,
    inCart: 0,
    img: "images/diya_5.jpeg",
    category: "Diya",
  },
  {
    name: "Samayi Diya",
    tag: "samayiDiya",
    price: 80,
    inCart: 0,
    img: "images/samayi_diya.jpeg",
    category: "Diya",
  },
  {
    name: "Tulsi Diya",
    tag: "tulsiDiya",
    price: 80,
    inCart: 0,
    img: "images/tulsi_diya.jpeg",
    category: "Diya",
  },
  {
    name: "Vati Diya",
    tag: "vatiDiya",
    price: 120,
    inCart: 0,
    img: "images/tulsi_diya.jpeg",
    category: "Diya",
  },
];

(function () {
  $('[data-toggle="tooltip"]').tooltip();
  const whatsappTooltip = $('.whatsapp[data-toggle="tooltip"]');
  whatsappTooltip.tooltip("show");
  setTimeout(() => {
    whatsappTooltip.tooltip("hide");
  }, 4000);
})();

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    const index = $(carts[i]).data("index");
    const inCart = +$(".units")[i].value;
    if(inCart && inCart > 0){
      $(".units").eq(i).css('background-color','');
      setItems(products[index], inCart);
      cartNumbers(products[index]);
      totalCost(products[index]);
    } else {
      $(".units").eq(i).css('background-color',"red");
    }
   
  });
}

function cartNumbers() {
  const products = JSON.parse(localStorage.getItem("productsInCart") || "{}");
  const productNumbers = Object.keys(products).length || "";

  $(".cart span").html(productNumbers);
}

function setItems(product, units) {
  
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart = units;
  } else {
    product.inCart = units;
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

  setUnits();
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
  // let cartCost =+localStorage.getItem("totalCost")||0;


  // if (cartCost) {
  //   localStorage.setItem("totalCost", cartCost + product.price);
  // } else {
  //   localStorage.setItem("totalCost", product.price);
  // }
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);
  let totalCost = 0;
  Object.values(cartItems).forEach((item) => {
    totalCost += item.price * item.inCart;
  });
  localStorage.setItem("totalCost", totalCost);
  
  $(".order_total").val(totalCost);
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
                <button  class="col removeItem btn btn-link px-1" data-key='${
                  item.tag
                }'>
                    <ion-icon name="remove-outline"></ion-icon>
                </button>
                <span class='col border border-primary px-1 py-2'>${
                  item.inCart
                }</span>
                <button  class="col addItem btn btn-link px-1" data-key='${
                  item.tag
                }'>
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
      <a href="https://muse-by-vivekanand-seva-mandal.herokuapp.com/">
      <span class='text-danger'>
        Go to the products page to add items to the cart
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
      $(`.${btnName}-${isFiftyGm ? "250" : "50"}`)
        .parent()
        .hide();
      $(`.${btn}`).parent().show();
    });

  setUnits();
}

switchSize();

function setUnits() {
  $(".units").map(function (unitInput) {
    const tag = $(".units").eq(unitInput).data("tag");
    const cartItems = JSON.parse(
      localStorage.getItem("productsInCart") || "{}"
    );

    if (!cartItems[tag]) return $(this).val("");
    const unit = cartItems[tag].inCart;
    console.log(cartItems[tag], unit);
    $(this).val(unit);
  });
}

setUnits();

function setSideBar() {
  if ($(window).width() < 500) {
    $(".product-sidebar").removeClass("flex-column");
    $(".main-body").removeClass("ml-2");
    $(".product-sidebar").css("width", "100%");
    $(".product-sidebar").parent().addClass("ml-4");
  } else {
    $(".product-sidebar").parent().removeClass("ml-4");
    $(".product-sidebar").addClass("flex-column");
    $(".main-body").addClass("ml-2");
    $(".product-sidebar").css("width", "auto");
  }
}

setSideBar();
$(window).resize(function () {
  setSideBar();
});

// Probable Solution to get the form data
// const productData = JSON.parse(
//       localStorage.getItem("productsInCart") || "{}"
//     );

// $.post( "/response", {
//   javascript_data: {productData: 1} 
// });

// $.ajax({
//   url: '{{ url_for("StoreDataToGSheet.response") }}',
//   type: 'POST',
//   data: {
//     name: 1
//   },
//   success: function(response) {
//     console.log(response)
//   },
//   error: function(response) {
//     console.log(response)
//   }
// });

const productData = JSON.parse(
        localStorage.getItem("productsInCart") || "{}"
      );
 
let data = {}

Object.values(productData).map((item) => {
  data[item.tag] = item.inCart
})

$(".order_summary").val(JSON.stringify(data));
console.log($(".order_summary").val())

// $('form').reset()
console.log("123")

