//Récupération de l'orderId
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('order');

// Affichage du n° de commande
document.getElementById("orderId").textContent = orderId;
