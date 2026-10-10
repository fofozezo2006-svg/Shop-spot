let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    getCartItems();
}

function removeFromCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity--;
        } else {
            cart = cart.filter(item => item.id !== product.id);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    getCartItems();
}

function getCartItems() {
    const productsGrid = document.querySelector(".products-grid");
    const spanPrice = document.querySelector("#total-price");
    if (!productsGrid) return;

    if (cart.length === 0) {
        productsGrid.innerHTML = "<p style='text-align:center; width:100%; font-size:1.2rem;'>Your cart is empty!</p>";
        return;
    }

    let cartHTML = "";
    let totalPrice = 0;
    let totalQuantities = 0;
    cart.forEach(item => {
        const itemTotalPrice = Math.round(item.price * item.quantity);
        totalPrice += itemTotalPrice;
        totalQuantities += item.quantity;
        const oldPrice = Math.round(item.price / (1 - item.discountPercentage / 100));
        const mainImg = item.images && item.images[0] ? item.images[0] : item.thumbnail;
        const hoverImg = item.images && item.images[1] ? item.images[1] : mainImg;

        cartHTML += `
            <div class="product">
                <img class="original-img" src="${mainImg}" alt="${item.title}">
                <img class="hover-img" src="${hoverImg}" alt="${item.title}">
                <div class="product-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="Adding">
                        <button class="remve-from-cart" onclick='removeFromCart(${JSON.stringify(item)})'>
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <div class="price">
                        <span class="new-price">$${itemTotalPrice}</span>
                        <span class="old-price">$${oldPrice * item.quantity}</span>
                    </div>
                </div>
            </div>
        `;
    });

    productsGrid.innerHTML = cartHTML;
    spanPrice.innerHTML = `$${totalPrice}`;
    if(totalQuantities !== 0){
        document.querySelector(".ToCheckout").innerHTML = `<a href="checkout.html">
           <button id="checkout">Checkout</button>
       </a>`}
}

getCartItems();