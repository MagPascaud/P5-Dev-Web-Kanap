console.log('je suis dans le panier');

//Récupérer les éléments du panier
const basketLocalStorage = JSON.parse(localStorage.getItem("basket"));

function getProducts() {
  return fetch('http://localhost:3000/api/products')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
      else {
        console.log("Erreur")
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      //Erreur
    });
}
//Insérer les éléments au bon endroit
function displayBasket() {
  getProducts().then(function (products) {

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
      const productFromApi = products.find(function (el) {
        return el._id === product._id;
      });
      product.price = productFromApi.price;
      pPrice.innerText = (productFromApi.price + " " + "€");
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

      inputQuantity.addEventListener('change', function (event) {
        const newQuantity = event.target.value;
        console.log(product);
        product.selectedQuantity = Number(newQuantity);
        totalPrice();
        totalQuantity();
      })
      pDelete.addEventListener('click', function () {
        const index = basketLocalStorage.findIndex(function (el) {
          return el._id === product._id;
        })
        basketLocalStorage.splice(index, 1);
        localStorage.setItem('basket', JSON.stringify(basketLocalStorage.map(function (el) {
          const { price, ...productWithoutPrice } = el;
          return productWithoutPrice;

        })));
        location.reload();
      })
    }
    totalPrice();
    totalQuantity();

  })
}
displayBasket()

//fonction du nombre total d'articles à l'ouverture de la page
function totalQuantity() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalQuantityValue = basketLocalStorage
    .map(function (el) {
      return el.selectedQuantity;
    })
    .reduce(function (previous, current) {
      //element précedent + element courant
      return previous + current;
    });
  totalQuantity.innerText = totalQuantityValue;

}

//fonction du calcul total à l'ouverture de la page
function totalPrice() {
  const totalPrice = document.getElementById("totalPrice");
  const totalPriceValue = basketLocalStorage
    .map(function (el) {
      return el.price * el.selectedQuantity;
    })
    .reduce(function (previous, current) {
      return previous + current;
    });
  totalPrice.innerText = totalPriceValue;
}


//Formulaire...
// (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])
// (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])

// ([a-ZA-Z})

// ([a-zA-Z0-9])