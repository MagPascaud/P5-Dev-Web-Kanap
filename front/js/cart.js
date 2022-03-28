//Récupérer les éléments du panier
const basketLocalStorage = JSON.parse(localStorage.getItem("basket"));

function getProducts() {
  return fetch('http://localhost:3000/api/products')
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
      else {
        console.error("Erreur")
      }
    })
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      console.error(err);
      alert("une erreur est survenue");
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
        product.selectedQuantity = Number(newQuantity);
        const index = basketLocalStorage.findIndex(function (el) {
          return el._id === product._id;
        })
        basketLocalStorage[index].selectedQuantity = product.selectedQuantity;
        totalPrice();
        totalQuantity();
        localStorage.setItem('basket', JSON.stringify(basketLocalStorage.map(function (el) {
          const { price, ...productWithoutPrice } = el;
          return productWithoutPrice;
        })));
        // location.reload();
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

//Fonction du nombre total d'articles à l'ouverture de la page
function totalQuantity() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalQuantityValue = basketLocalStorage
    .map(function (el) {
      return el.selectedQuantity;
    })
    .reduce(function (previous, current) {
      return previous + current;
    });
  totalQuantity.innerText = totalQuantityValue;

}

//Fonction du calcul total à l'ouverture de la page
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

//Formulaire

//Variables de chaque input avec leur id
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

//Récupération des messages d'erreurs
const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameError = document.getElementById("lastNameErrorMsg");
const addressError = document.getElementById("addressErrorMsg");
const cityError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");

//Variables des RegEx
const nameCityRegex = new RegExp("^[a-zA-Z ,.'-]{2,}$");
const addressRegex = new RegExp("^[a-zA-Z,0-9 ,.'-]{2,}$")
const emailRegex = new RegExp("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,})$")

let firstNameValid = false;
let lastNameValid = false;
let addressValid = false;
let cityValid = false;
let emailValid = false;


//Validation du prénom
firstName.addEventListener('change', function (event) {
  event.preventDefault;
  if (firstName.value === "") {
    firstNameValid = false;
    firstNameError.innerHTML = "Vous devez saisir un prénom";
  } else if (nameCityRegex.test(firstName.value) === false) {
    firstNameValid = false;
    firstNameError.innerHTML = "Au moins 2 caractères, lettres uniquement";
  } else {
    firstNameError.innerHTML = "";
    firstNameValid = true;
  }
});

//Validation du nom
lastName.addEventListener('change', function (event) {
  event.preventDefault;
  if (lastName.value === "") {
    lastNameValid = false;
    lastNameError.innerHTML = "Vous devez saisir un nom";
  } else if (nameCityRegex.test(lastName.value) === false) {
    lastNameValid = false;
    lastNameError.innerHTML = "Au moins 2 caractères, lettres uniquement";
  } else {
    lastNameError.innerHTML = "";
    lastNameValid = true;

  }
});

//Validation de l'adresse
address.addEventListener('change', function (event) {
  event.preventDefault;
  if (address.value === "") {
    addressValid = false;
    addressError.innerHTML = "Vous devez saisir une adresse postale";
  } else if (addressRegex.test(address.value) === false) {
    addressValid = false;
    addressError.innerHTML = "Au moins 2 caractères";
  } else {
    addressError.innerHTML = "";
    addressValid = true;
  }
});

//Validation de la ville
city.addEventListener('change', function (event) {
  event.preventDefault;
  if (city.value === "") {
    cityValid = false;
    cityError.innerHTML = "Vous devez saisir une ville";
  } else if (nameCityRegex.test(city.value) === false) {
    cityValid = false;
    cityError.innerHTML = "Au moins 2 caractères, lettres uniquement";
  } else {
    cityError.innerHTML = "";
    cityValid = true;
  }
});

//Validation de l'email
email.addEventListener('change', function (event) {
  event.preventDefault;
  if (email.value === "") {
    emailValid = false;
    emailError.innerHTML = "Vous devez saisir un email";
  } else if (emailRegex.test(email.value) === false) {
    emailValid = false;
    emailError.innerHTML = "cette adresse email n'est pas valide";
  } else {
    emailError.innerHTML = "";
    emailValid = true;
  }
});

//Variable du bouton commander
let order = document.getElementById("form");
order.addEventListener('submit', function (event) {
  event.preventDefault();
  if (firstNameValid && lastNameValid && addressValid && cityValid && emailValid) {
    //si tout est bon faire la commande et renvoie vers page confirmation
    const body = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      },
      products: basketLocalStorage.map(function (product) {
        return product._id
      })
    }
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        else {
          console.error("Erreur")
        }
      })
      .then(function (value) {
        localStorage.clear();
        document.location.href = `./confirmation.html?order=${value.orderId}`;
      })
      .catch(function (err) {
        alert("la commande n'a pu être passée");
      })
  }
})