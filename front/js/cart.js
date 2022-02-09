console.log('je suis dans le panier');

//Récupérer les éléments du panier
const basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(basketLocalStorage);

//Insérer les éléments au bon endroit
function displayBasket() {
    const cartSection = document.getElementById("cart__items");
    for (const product of basketLocalStorage) {
        console.log(product);
        const article = document.createElement("article");
        const divImg = document.createElement("div");
        const img = document.createElement("img");
        const divContent = document.createElement("div");
        const divDescription = document.createElement("div");
        const h2 = document.createElement("h2");
        const pColor = document.createElement("p");
        const pPrice = document.createElement("p");

        divDescription.appendChild(h2);
        divDescription.appendChild(pColor);
        divDescription.appendChild(pPrice);
        divContent.appendChild(divDescription);
        divImg.appendChild(img);
        article.appendChild(divImg);
        article.appendChild(divContent);

        h2.innerText = product.name;
        pColor.innerText = product.selectedColor;
        pPrice.innerText = product.price;

        cartSection.appendChild(article);
    }
}
displayBasket()

