//::::::::: recuperation route et id apres choix de l utilsateur afin de recupere un seul appareil :::::::::

let id = window.location.search.substring(5);
console.log(id);
const url = `http://localhost:3000/api/cameras/${id}`;

//:::::::::::::::::::::::::::::::: creation de variable et saisi du contenu Html ::::::::::::::::::::::::::::

let descripP = document.getElementById("descrip_produit");
let imgP = document.getElementById("img_produit");
let titleP = document.getElementById("title_produit");
let prixP = document.getElementById("prix_produit");
let lentilles = document.getElementById("lentilles");
let panier = document.getElementById("panier");

//:::::::::::::::::::::::::::::::::::::::::::::::::: ajaxget :::::::::::::::::::::::::::::::::::::::::::::::::

ajaxGet(url)
  .then(function (response) {
    prod(response);
    ajoutStorage(response);
  })
  .catch(function (err) {
    console.log(err);
    alert("serveur Hors service");
  });

//:::::::::::::::::::::::::::::::::::::::::::: function affichage du produit ::::::::::::::::::::::::::::::

function prod(response) {
  // ajout du contenu dans la fiche du produit

  descripP.textContent = response.description;
  imgP.setAttribute("src", response.imageUrl);
  imgP.setAttribute("height", "330px");
  titleP.textContent = "Appareil photo : " + response.name;
  prixP.textContent = "Prix : " + response.price + " euro";

  //boucle pour ajout des lentilles dans le menu deroulant des differents appareils

  for (i = 0; i < response.lenses.length; i++) {
    let option = document.createElement("option");
    lentilles.appendChild(option);
    option.textContent = response.lenses[i];
    option.value = response.lenses[i];
  }
}

//:::::: fonction ecoute de l evenement clic recupere les choix de l utilsateur dans le local storage :::::::

function ajoutStorage(response) {
  function clic() {
    console.log("Clic !");

    let line = localStorage.getItem("object");
    let line2 = localStorage.getItem("id");

    let objectJs = JSON.parse(line);
    let objectJs2 = JSON.parse(line2);

    if (objectJs === null && objectJs2 === null) {
      objectJs = [];
      objectJs2 = [];
    }

    objectJs.push([response, lentilles.value]);
    objectJs2.push(response._id);

    let tabLine = JSON.stringify(objectJs);
    let tabLine2 = JSON.stringify(objectJs2);

    localStorage.setItem("object", tabLine);
    localStorage.setItem("id", tabLine2);

    alert("votre produit a bien été ajouter dans le panier");
  }
  panier.addEventListener("click", clic);
}
