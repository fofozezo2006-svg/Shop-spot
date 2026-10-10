// const submitCheck = document.getElementById("submit_check");

// submitCheck.addEventListener("click", () => {
//     document.querySelector(".payment").style.display = "flex";
//     document.querySelector(".checkout-form").style.display = "none";
//     document.querySelector(".checkoutAll").style.display = "none";
//     document.querySelector(".header").style.opacity = "0.2";   
//     document.querySelector("footer").style.opacity = "0.2";
// });

const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    document.querySelector(".payment").style.display = "flex";
    document.querySelector(".checkout-form").style.display = "none";
    document.querySelector(".checkoutAll").style.display = "none";
    document.querySelector(".header").style.opacity = "0.2";   
    document.querySelector("footer").style.opacity = "0.2";
});