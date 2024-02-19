let count = 0;
let total = 0;
let countButton = 0;
const seatButtons = document.querySelectorAll(".seat-button");

for (let btn of seatButtons) {
    btn.addEventListener("click", function (event) {
        event.target.classList.toggle("clicked-btn");
        if (event.target.classList.contains("clicked-btn")) {
            countButton++;
        } else {
            countButton--;
        }
        if (countButton >= 4) {
            for (let btn of seatButtons) {
                if (!btn.classList.contains("clicked-btn")) {
                    btn.disabled = true;
                }
            }
        } else {
            for (let btn of seatButtons) {
                btn.disabled = false;
            }
        }

        let indicator = document.querySelector("#indicator");
        let seatNumber = document.querySelector("#seat-number");
        let seatClass = document.querySelector("#seat-class");
        let seatPrice = document.querySelector("#seat-price");

        const seatRemain =
            parseInt(document.querySelector("#seat-count").innerText) - 1;
        document.querySelector("#seat-count").innerText = seatRemain;
        console.log(seatRemain);
        count += 1;
        indicator.innerText = count;
        const seatUpdate = document.querySelector(".seat-update");

        appendParagraph(seatNumber, event.target.innerText);
        appendParagraph(seatClass, "Economy");
        appendParagraph(seatPrice, "550");
        event.target.classList.toggle("bg-yellow-400");
        event.target.classList.toggle("cursor-not-allowed");
        event.target.classList.toggle("pointer-events-none");

        let totalPrice = parseInt(document.querySelector("#total-price").innerText);
        console.log(totalPrice);
        total = totalPrice + parseInt(550);
        document.querySelector("#total-price").innerText = total;

        document.querySelector("#grand-total").innerText = total;

        const phoneNumber = document.querySelector("#phone-number");
        const nextBtn = document.querySelector("#next");
        phoneNumber.addEventListener("keyup", (event) => {
            if (event.target.value > 0) {
                nextBtn.classList.remove("btn-disabled");
            } else {
                nextBtn.classList.add("btn-disabled");
            }
            console.log(event.target.value > 0);
        });
        phoneNumber.value = "";
        applyInput.value = "";
    });
}

function appendParagraph(mainElement, text) {
    const p = document.createElement("p");
    p.innerText = text;
    mainElement.appendChild(p);
}

document.querySelector("#next").addEventListener("click", function () {
    document.querySelector("footer").classList.add("hidden");
    document.querySelector("main").classList.add("hidden");
    document.querySelector("header").classList.add("hidden");
    document.querySelector("#success").classList.remove("hidden");
});

document.querySelector("#continue").addEventListener("click", function () {
    document.querySelector("footer").classList.remove("hidden");
    document.querySelector("main").classList.remove("hidden");
    document.querySelector("header").classList.remove("hidden");
    document.querySelector("#success").classList.add("hidden");
})

const applyInput = document.querySelector("#apply-in");
const discountBtn = document.querySelector("#apply-button");
const discountInput = document.querySelector("#discount-in");
let DISCOUNT = 0;
applyInput.addEventListener("keyup", function (event) {
    if (event.target.value === "NEW15" && countButton >= 4) {
        DISCOUNT = total * 15/100;
        discountBtn.addEventListener("click", function () {
            document.querySelector("#grand-total").innerText = total - DISCOUNT;
        });

        discountBtn.classList.remove("btn-disabled");
    } else if (event.target.value === "Couple 20" && countButton >= 4) {
        DISCOUNT = total * 20/100;
        discountBtn.addEventListener("click", function () {
            document.querySelector("#grand-total").innerText = total - DISCOUNT;
        });
        discountBtn.classList.remove("btn-disabled");
    } else {
        discountBtn.classList.add("btn-disabled");
    }
});
let totalDis = 0;
discountBtn.addEventListener("click", function () {
    const discountDiv = document.querySelector("#discount-apply");

    discountDiv.innerHTML = `
<h1>Discounted Price</h1>
<h1>BDT- ${DISCOUNT}</h1>
`;

    discountInput.classList.add("hidden");
});