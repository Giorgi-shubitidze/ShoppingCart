const button = document.querySelectorAll("#button");
const count = document.getElementById("count");
const ul = document.getElementById("ul");
const total = document.getElementById("total")
const arrow = document.getElementById("arrow");
const cartDisplay = document.querySelector(".cart-display");

const windowHeight = window.innerHeight;
let scrollTopOffset;

if (window.innerWidth > 800) {
  scrollTopOffset = 65;
} else {
  scrollTopOffset = 110;
}

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  if (scrollTop > scrollTopOffset) {
    cartDisplay.style.top = 0;
    cartDisplay.style.height = `${windowHeight}px`;
  } else {
    cartDisplay.style.top = `${scrollTopOffset}px`;
    cartDisplay.style.height = `calc(100% - ${scrollTopOffset}px)`;
  }
});




arrow.addEventListener("click", () => {
  cartDisplay.classList.toggle("active");
});

let counter = 0;
let eachCount = 1;
let sum = 0;
let totalEl = 0

function increment(countNumber, prices, priceEl) {
    let eachCount = parseInt(countNumber.innerText) + 1;
    countNumber.innerText = eachCount;

    let newPrice = `${eachCount * priceEl}$`
    if (eachCount >= 2) {
        prices.innerHTML = `Price: ${newPrice} / Each: ${priceEl}$`;
    } else if (eachCount === 1) {
        prices.innerHTML = `Price: ${priceEl}`;
    } else {
        prices.innerHTML = `Price: ${newPrice}`;
    }
    updateTotal();
}

function decrement(countNumber, prices, priceEl) {
    let eachCount = parseInt(countNumber.innerText);
    if (eachCount > 1) {
        eachCount--;
        countNumber.innerText = eachCount;
        let newPrice = `${eachCount * priceEl}$`
        if (eachCount >= 2) {
            prices.innerHTML = `Price: ${newPrice} / Each: ${priceEl}$`;
        } else if (eachCount === 1) {
            prices.innerHTML = `Price: ${priceEl}$`;
        } else {
            prices.innerHTML = `Price: ${newPrice}$`;
        }
    }
    updateTotal()
}

function createLi(imageSrc, nameValue, priceEl, eachCount) {
    if (ul.querySelector(`img[src="${imageSrc}"]`)) {
        return;
    }
    const li = document.createElement("li");
    const images = document.createElement("img");
    images.setAttribute("src", imageSrc);
    const title = document.createElement("strong");
    title.innerHTML = nameValue;
    const prices = document.createElement("h2");
    prices.innerHTML = `Price: ${priceEl}$`;
    li.setAttribute('data-price', priceEl);
    const cartCount = document.createElement("div");
    cartCount.classList.add("cart-count");
    const decrementButton = document.createElement("button");
    decrementButton.innerText = "-";
    decrementButton.onclick = () => {
        decrement(countNumber, prices, priceEl);
        updateSum();
    };

    const countNumber = document.createElement("span");
    countNumber.id = `eachCount-${eachCount}`;
    countNumber.innerText = "1";
    const incrementButton = document.createElement("button");
    incrementButton.innerText = "+";
    incrementButton.onclick = () => {
        increment(countNumber, prices, priceEl);
        updateSum();
    };
    cartCount.append(decrementButton, countNumber, incrementButton);
    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete-btn";
    const deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "Delete";
    deleteBtn.appendChild(deleteSpan);
    deleteBtn.onclick = () => {
        li.remove();
        updateSum();
        updateTotal();
    };

    incrementButton.onclick = () => {
        increment(countNumber, prices, priceEl);
        updateSum();
    };
    ul.appendChild(li).append(images, title, prices, cartCount, deleteBtn);
}


function updateSum() {
    sum = 0;
    const countNumbers = document.querySelectorAll(".cart-count span");
    countNumbers.forEach((countNumber) => {
        sum += parseInt(countNumber.innerText);
    });
    counter = sum;
    count.innerHTML = counter;
}

function updateTotal() {
    let totalPrice = 0;
    const lis = ul.querySelectorAll("li");
    const pEl = document.getElementById("cartEmpty")
    lis.forEach((li) => {
      const countNumber = li.querySelector(".cart-count span");
      const eachCount = parseInt(countNumber.innerText);
      const price = parseFloat(li.getAttribute("data-price"));
      const newPrice = eachCount * price;
      totalPrice += newPrice;
    });
    total.innerHTML = `Total: ${totalPrice}$`;
    if (lis.length === 0) {
        pEl.style.display = "block"
    } else {
        pEl.style.display = "none"
        total.innerHTML = `Total: ${totalPrice}$`;
    }
}

button.forEach((button) => {
    button.addEventListener("click", () => {
        const price = button.parentNode.querySelector("h2");
        const priceValue = price.textContent.trim().split(" ")[1];
        const priceEl = priceValue
        const name = button.parentNode.querySelector("strong");
        const nameValue = name.textContent.trim().split(" ").join(" ");

        const image = button.parentNode.querySelector("img");
        const imageSrc = image.getAttribute("src");

        createLi(imageSrc, nameValue, priceEl, eachCount);
        priceValue
        counter++;
        count.innerHTML = counter;
        updateTotal();
        updateSum();
    });
});
