const btnSeats = document.querySelectorAll(".btn-seat");
let count = 0;
let total = 0;
let btnCount = 0;

for (let btn of btnSeats) {
    btn.addEventListener("click", function (e) {
        e.target.classList.toggle("clicked-btn");
        if (e.target.classList.contains("clicked-btn")) {
            btnCount++;
        } else {
            btnCount--;
        }
        if (btnCount >= 4) {
            for (let btn of btnSeats) {
                if (!btn.classList.contains("clicked-btn")) {
                    btn.disabled = true;
                }
            }
        } else {
            for (let btn of btnSeats) {
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

        appendParagraph(seatNumber, e.target.innerText);
        appendParagraph(seatClass, "Economy");
        appendParagraph(seatPrice, "550");
        e.target.classList.toggle("bg-green-500");
        e.target.classList.toggle("cursor-not-allowed");
        e.target.classList.toggle("pointer-events-none");

        let totalPrice = parseInt(document.querySelector("#total-price").innerText);
        console.log(totalPrice);
        total = totalPrice + parseInt(550);
        document.querySelector("#total-price").innerText = total;

        document.querySelector("#grand-total-price").innerText = total;

        const phoneNumber = document.querySelector("#phone-number");
        const nextBtn = document.querySelector("#next");
        phoneNumber.addEventListener("keyup", (e) => {
            if (e.target.value > 0) {
                nextBtn.classList.remove("btn-disabled");
            } else {
                nextBtn.classList.add("btn-disabled");
            }
            console.log(e.target.value > 0);
        });
        phoneNumber.value = "";
        //     console.log(phoneNumber.value.length > 0);
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

document.querySelector("#Continue").addEventListener("click", function () {
    document.querySelector("footer").classList.remove("hidden");
    document.querySelector("main").classList.remove("hidden");
    document.querySelector("header").classList.remove("hidden");
    document.querySelector("#success").classList.add("hidden");
})

const applyInput = document.querySelector("#apply-input");
const discountBtn = document.querySelector("#apply-btn");
const discountInput = document.querySelector("#discount-input");
let DISCOUNT = 0;
applyInput.addEventListener("keyup", function (e) {
    if (e.target.value === "NEW15" && btnCount >= 4) {
        DISCOUNT = total * 0.15;
        discountBtn.addEventListener("click", function () {
            document.querySelector("#grand-total-price").innerText = total - DISCOUNT;
        });

        discountBtn.classList.remove("btn-disabled");
    } else if (e.target.value === "Couple 20" && btnCount >= 4) {
        DISCOUNT = total * 0.2;
        discountBtn.addEventListener("click", function () {
            document.querySelector("#grand-total-price").innerText = total - DISCOUNT;
        });
        discountBtn.classList.remove("btn-disabled");
    } else {
        discountBtn.classList.add("btn-disabled");
    }
});
let totalDis = 0;
discountBtn.addEventListener("click", function () {
    const discountDiv = document.querySelector("#discount-div");

    discountDiv.innerHTML = `
<h1>Discounted Price</h1>
<h1>BDT- ${DISCOUNT}</h1>
`;

    discountInput.classList.add("hidden");
});