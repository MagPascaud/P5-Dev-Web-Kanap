console.log('je suis dans le panier');

//Récupérer les éléments du panier
const basketLocalStorage = JSON.parse(localStorage.getItem("basket"));

//Insérer les éléments au bon endroit
function displayBasket() {
  const cartSection = document.getElementById("cart__items");
  for (const product of basketLocalStorage) {
    const article = document.createElement("article");
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const divContent = document.createElement("div");
    const divDescription = document.createElement("div");
    const h2 = document.createElement("h2");
    const pColor = document.createElement("p");
    const pPrice = document.createElement("p");
    const divSettings = document.createElement("div");
    const divSettingsQuantity = document.createElement("div");
    const pQuantity = document.createElement("p");
    const inputQuantity = document.createElement("input");
    const divSettingsDelete = document.createElement("div");
    const pDelete = document.createElement("p");

    divSettings.appendChild(divSettingsQuantity);
    divSettings.appendChild(divSettingsDelete);
    divSettingsQuantity.appendChild(pQuantity);
    divSettingsQuantity.appendChild(inputQuantity);
    divSettingsDelete.appendChild(pDelete);
    divDescription.appendChild(h2);
    divDescription.appendChild(pColor);
    divDescription.appendChild(pPrice);
    divContent.appendChild(divDescription);
    divContent.appendChild(divSettings);
    divImg.appendChild(img);
    article.appendChild(divImg);
    article.appendChild(divContent);

    h2.innerText = product.name;
    pColor.innerText = product.selectedColor;
    pPrice.innerText = (product.price + " " + "€");
    img.src = product.imageUrl;
    img.alt = product.description;
    pQuantity.innerText = "Qté :";
    inputQuantity.value = product.selectedQuantity;
    inputQuantity.name = "itemQuantity";
    inputQuantity.type = "number";
    inputQuantity.min = 1;
    inputQuantity.max = 100;
    pDelete.innerText = "Supprimer";

    article.classList.add("cart__item");
    article["data-id"] = product._id;
    article["data-color"] = product.selectedColor;
    divImg.classList.add("cart__item__img");
    divContent.classList.add("cart__item__content");
    divDescription.classList.add("cart__item__content__description");
    divSettings.classList.add("cart__item__content__settings");
    divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    divSettingsDelete.classList.add("cart__item__content__settings__delete");
    inputQuantity.classList.add("itemQuantity");
    pDelete.classList.add("deleteItem");

    cartSection.appendChild(article);
  }
}
displayBasket()

//création de l'événement pour changer la quantité
// function changeQuantity(event) {
//   product.selectedQuantity = parseInt(event.target.value);
//   const quantity = document.getElementById("itemQuantity");
//   quantity.addEventListener('change', changeQuantity);
//   alert("test");
//   if (value.selectedQuantity != basketLocalStorage.selectedQuantity) {
//     basketLocalStorage.push(value);

//   }

// }

//evenement de suppression du produit
// const deleteSelection = document.getElementsByClassName("deleteItem");
// function deleteArticle (event) {
// const deleteArticle = deleteSelection.closest("article");
// deleteSelection.addEventListener('click', deleteArticle);
//   if (condition) {
    
//   } else {
    
//   }
// }


//fonction du nombre total d'articles à l'ouverture de la page
function totalQuantity() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalQuantityValue = basketLocalStorage.reduce(function (previous, current) {
    //element précedent + element courant
    console.log(previous, current);
    if (previous) {
      return previous.selectedQuantity + current.selectedQuantity;
    } else {
      return current.selectedQuantity;
    }
  });
  totalQuantity.innerText = totalQuantityValue;

}
totalQuantity();

//fonction du calcul total à l'ouverture de la page
function totalPrice() {
  const totalPrice = document.getElementById("totalPrice");
  const totalPriceValue = basketLocalStorage.reduce(function (previous, current) {
    console.log(previous, current);
    if (previous) {
      return previous.price + current.price;
    } else {
      return current.price;
    }
  });
  totalPrice.innerText = totalPriceValue;
}
totalPrice();


//Formulaire...
