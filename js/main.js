async function getPhones() {
    try {
        const response = await fetch("https://dummyjson.com/products/category/smartphones");
        const data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.log("Error fetching data");
    } finally {
        console.log("fetching data function has ended");
    }
}

function displayProducts(products) {
    const productsContainer = document.querySelector(".products-grid");
    if (!productsContainer) return;

    let cartContainer = "";

    products.forEach(product => {
        const oldPrice = Math.round(product.price / (1 - product.discountPercentage / 100));
        
        //modified
        const mainImg = product.images && product.images[0] ? product.images[0] : product.thumbnail;
        const hoverImg = product.images && product.images[1] ? product.images[1] : mainImg;

        const cartItem = cart.find(item => item.id === product.id);
        const currentQuantity = cartItem ? cartItem.quantity : 0;

        cartContainer += `
            <div class="product">
                <img class="original-img" src="${mainImg}" alt="${product.title}">
                <img class="hover-img" src="${hoverImg}" alt="${product.title}">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <div class="Adding">
                        <button class="remve-from-cart" onclick='removeFromCart(${JSON.stringify(product)})'><i class="fa-solid fa-minus"></i></button>
                        <span>${currentQuantity}</span>
                        <button class="add-to-cart" onclick='addToCart(${JSON.stringify(product)})'><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="price">
                        <span class="new-price">$${product.price}</span>
                        <span class="old-price">$${oldPrice}</span>
                    </div>
                </div>
            </div>
        `;
    });

    productsContainer.innerHTML = cartContainer;
}

getPhones();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    getPhones();
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
    getPhones();
}


const menuIcon = document.querySelector(".menu-items");
const navMenu = document.querySelector(".nav-links ul");

menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("active-menu");
});


const closeMenu = document.querySelector(".close-menu");
closeMenu.addEventListener("click", () => {
    navMenu.classList.remove("active-menu");
});

