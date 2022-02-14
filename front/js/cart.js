console.log('je suis dans le panier');

//Récupérer les éléments du panier
const basketLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(basketLocalStorage);

//Insérer les éléments au bon endroit
function displayBasket() {
    const cartSection = document.getElementById("cart__items");
    for (const product of basketLocalStorage) {
        console.log(product);
        // demander à Karim quelle méthode ?
        const article = document.createElement("article");
        // const divImg = document.createElement("div");
        // const img = document.createElement("img");
        // const divContent = document.createElement("div");
        // const divDescription = document.createElement("div");
        // const h2 = document.createElement("h2");
        // const pColor = document.createElement("p");
        // const pPrice = document.createElement("p");

        // divDescription.appendChild(h2);
        // divDescription.appendChild(pColor);
        // divDescription.appendChild(pPrice);
        // divContent.appendChild(divDescription);
        // divImg.appendChild(img);
        // article.appendChild(divImg);
        // article.appendChild(divContent);

        // h2.innerText = product.name;
        // pColor.innerText = product.selectedColor;
        // pPrice.innerText = (product.price + " " + "€");
        // img.src = product.imageUrl;
        // img.alt = product.description;
        // divImg.alt = product.description;

        article.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.description}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.selectedColor}</p>
            <p>${(product.price + " " + "€")}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.selectedQuantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

        cartSection.appendChild(article);
    }
    //création de l'événement pour changer la quantité
    const quantity = document.getElementsByClassName("itemQuantity");
    quantity.addEventListener('change', changeQuantity);

}
function changeQuantity(event) {
    console.log(event.target.value);
    product.selectedQuantity = parseInt(event.target.value);
}

displayBasket()

