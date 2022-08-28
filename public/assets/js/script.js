window.addEventListener("load", function (e) {
  const number = document.querySelector(".attr-nav .badge");
  const cartList = document.querySelector(".attr-nav .cart-list");
  const cart_button = document.querySelectorAll(".add_to_cart");

  function cartCount() {
    cartList.innerHTML = "";
    const localCart = localStorage.getItem("cart");
    const cart = localCart ? JSON.parse(localCart) : [];
    number.innerHTML = cart.length;
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.price;
      cartList.innerHTML += `    <li class="single-cart-list">
      <a href="#" class="photo"><img src="${item.img}" class="cart-thumb" alt="${item.img}" /></a>
      <div class="cart-list-txt">
          <h6><a href="#">${item.name}</a></h6>
          <p>1 x - <span class="price">$${item.price}</span></p>
      </div><!--/.cart-list-txt-->
      <div class="cart-close" data-id="${item.randomId}">
          <span class="lnr lnr-cross"></span>
      </div><!--/.cart-close-->
    </li><!--/.single-cart-list -->`;
    });

    cartList.innerHTML += `<li class="total">
    <span>Total: $${totalPrice}</span>
    <button class="btn-cart pull-right" onclick="window.location.href='#'">view
        cart</button>
    </li>`;

    const closes = document.querySelectorAll(".attr-nav .cart-close");

    closes.forEach((item) => {
      item.addEventListener("click", (e) => {
        const id = item.getAttribute("data-id");
        const localCart = localStorage.getItem("cart");
        const cart = localCart ? JSON.parse(localCart) : [];

        const idx = cart.findIndex((item) => item.randomId == id);

        if (idx == -1) {
          return;
        }

        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        cartCount();
      });
    });
  }

  cartCount();

  cart_button.forEach((item) => {
    item.addEventListener("click", () => {
      const localCart = localStorage.getItem("cart");
      const cart = localCart ? JSON.parse(localCart) : [];
      cart.push(JSON.parse(item.getAttribute("data-product")));
      localStorage.setItem("cart", JSON.stringify(cart));
      cartCount();
    });
  });
});
