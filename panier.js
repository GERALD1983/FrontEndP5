//:::::: variable declarer dans la page produit creation de l object javascript depuis local storage::::::::

line = localStorage.getItem("object");
line2 = localStorage.getItem("id");

objectJs = JSON.parse(line);
objectJs2 = JSON.parse(line2);

//:::::::::::::::::::::::::::::::::: stockage variable globale de saisi du DOM ::::::::::::::::::::::::::::::

// variable message panier

let panierMessage = document.getElementById("panierMessage");

// variable des div des pricipales colonnes du panier

let prod = document.getElementById("prod");
let lentilles = document.getElementById("lentilles");
let tot = document.getElementById("price");

// variable du contenu des div de chaque colonne

let produit = document.querySelector(".produit");
let lense = document.querySelector(".lenses");
let total = document.querySelector(".prix");

let soustotal = document.getElementById("soustotal");

// variable de comptage de base pour la somme des produits

let somme = 0;

// variable saisi formulaire

let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let email = document.getElementById("email");
let adresse = document.getElementById("adresse");
let ville = document.getElementById("ville");

let form = document.querySelector("form");

//::::::::::::::::::: panier vide supprime image sinon change message fais requete ajoute formulaire :::::::::::::

if (line === null) {
  console.log("rempli le panier");
  produit.removeChild(document.querySelector(".img"));
} else {
  panierMessage.textContent = "Vos articles ont été ajouter dans le panier";

  let formulaire = document.getElementById("formulaire");
  formulaire.classList.remove("invisible");

  let texteRemplir = document.getElementById("texte-remplir");
  let texteValider = document.getElementById("texte-valider");

  texteRemplir.innerText = "Veuillez remplir le formulaire merci !";
  texteValider.innerText = "Et ensuite validez votre commande";

  //:::::::::::::::::::::::::::::::::::::::::: requete ajaxget ::::::::::::::::::::::::::::::::::::::::::

  ajaxGet("http://localhost:3000/api/cameras")
    .then(function (response) {
      cloneProduitHtml(response);
      boucleAjoutSupprim(response);
      sommeProduits(response);
      envoiFormulaire(response);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// ::::::::::::::::::::::::::::::::::::::::: function clone html :::::::::::::::::::::::::::::::::::::

function cloneProduitHtml() {
  // clonage de contenu modele html en fonction du produit ajouter

  for (j = 0; j < objectJs.length - 1; j++) {
    let cloneproduit = produit.cloneNode(true);
    prod.appendChild(cloneproduit);

    let clonelense = lense.cloneNode(true);
    lentilles.appendChild(clonelense);

    let clonetotal = total.cloneNode(true);
    tot.appendChild(clonetotal);
  }
}

// :::::::::::::::::::::::::::::::::::: function ajoute contenu produit et supprime produit ::::::::::::::::::::

function boucleAjoutSupprim() {
  // recuperation de tout les contenus precedemment cloner des produits ajouter au panier

  let produitAll = document.querySelectorAll(".produit");
  let lensesAll = document.querySelectorAll(".lenses");
  let prixAll = document.querySelectorAll(".prix");
  let imgAll = document.querySelectorAll(".img");

  // mise en place des informations produits dans leur contenu à linterieur du panier

  for (i = 0; i < objectJs.length; i++) {
    imgAll[i].setAttribute("src", objectJs[i][0].imageUrl);
    imgAll[i].setAttribute("width", "50px");
    imgAll[i].setAttribute("height", "40px");

    produitAll[i].textContent = objectJs[i][0].name;

    produitAll[i].setAttribute("data-id", objectJs2[i]);

    produitAll[i].appendChild(imgAll[i]);

    lensesAll[i].textContent = objectJs[i][1];

    prixAll[i].textContent = objectJs[i][0].price + " euro";

    somme = parseInt(prixAll[i].textContent) + somme;

    // suppression produit

    // creation d un bouton supprimer et de ses attributs et son parent

    let but = document.createElement("button");

    but.setAttribute("data-id", objectJs2[i]);
    but.setAttribute("data-lenses", objectJs[i][1]);

    but.classList.add(
      "col-md-4",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "btn",
      "btn-info",
      "mt-3",
      "btn-sm",
      "supprimer"
    );

    but.textContent = "supprimer";

    produitAll[i].appendChild(but);

    boutonSupprimer(i);
  }
}

// :::::::::::::::::::::::::::::::::::::::::: function somme des produits ::::::::::::::::::::::::::::::

function sommeProduits() {
  // sous total des prix des appareils

  soustotal.textContent = somme + " euro";
}

//::::::::::::::::::::::::::::::::::::: function supprimer et reset localstorage :::::::::::::::::::::

function boutonSupprimer(i) {
  // saisi des bouton supprimer et ecoute de chacun d entre eux

  let butonAll = document.querySelectorAll(".supprimer");

  butonAll[i].addEventListener("click", function (e) {
    console.log("supprime moi");
    const id = e.target.getAttribute("data-id");
    const lense = e.target.getAttribute("data-lenses");

    // suppression elements du tableau et dans le local storage

    objectJs2.splice(
      objectJs2.findIndex((x) => {
        return x === id;
      }),
      1
    );
    objectJs.splice(
      objectJs.findIndex((x) => {
        return x[0]._id === id && x[1] === lense;
      }),
      1
    );

    localStorage.setItem("object", JSON.stringify(objectJs));
    localStorage.setItem("id", JSON.stringify(objectJs2));

    location.href = "panier.html";
    if (objectJs.length === 0) {
      localStorage.removeItem("object");
      localStorage.removeItem("id");
    }
  });
}

//::::::::::::::::::::::::::::::::::: function envoi formulaire et reponse serveur :::::::::::::::::::::::::::::

var envoiFormulaire = function () {
  //formulaire

  // ecoute des données utilsateur et validation formulaire avant envoi serveur
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // regex
    let regexNom = /[a-zA-Z]/;
    let regexPrenom = /[a-zA-Z]/;
    let regexCourriel = /.+@.+\..+/;
    let regexAdresse = /[0-9] [a-zA-Z]/;
    let regexVille = /[a-zA-Z]/;

    let validiteNom = "";
    let validitePrenom = "";
    let validiteCourriel = "";
    let validiteAdresse = "";
    let validiteVille = "";

    let aideNom = document.getElementById("aideNom");
    let aidePrenom = document.getElementById("aidePrenom");
    let aideEmail = document.getElementById("aideEmail");
    let aideAdresse = document.getElementById("aideAdresse");
    let aideVille = document.getElementById("aideVille");

    // condition acceptation envoie serveur

    if (!regexNom.test(nom.value)) {
      validiteNom = "Prenom doit contenir des lettres";

      aideNom.textContent = validiteNom;
      aideNom.style.color = "red";
    } else if ((regexNom.test = nom.value)) {
      aideNom.textContent = "";
    }

    if (!regexPrenom.test(prenom.value)) {
      validitePrenom = "Prenom doit contenir des lettres";

      aidePrenom.textContent = validitePrenom;
      aidePrenom.style.color = "red";
    } else if ((regexPrenom.test = prenom.value)) {
      aidePrenom.textContent = "";
    }
    if (!regexCourriel.test(email.value)) {
      validiteCourriel = "Adresse email fausse suivez l 'exemple au dessus ";
      aideEmail.textContent = validiteCourriel;
      aideEmail.style.color = "red";
    } else if ((regexCourriel.test = email.value)) {
      aideEmail.textContent = "";
    }
    if (!regexAdresse.test(adresse.value)) {
      validiteAdresse =
        "Adresse non valide doit contenir des chiffre puis des lettres";
      aideAdresse.textContent = validiteAdresse;
      aideAdresse.style.color = "red";
    } else if ((regexAdresse.test = adresse.value)) {
      aideAdresse.textContent = "";
    }
    if (!regexVille.test(ville.value)) {
      validiteVille = "Ville doit contenir des lettres";
      aideVille.textContent = validiteVille;
      aideVille.style.color = "red";
    } else if ((regexVille.test = ville.value)) {
      aideVille.textContent = "";
    }

    // si toute les conditions rempli envoie au serveur et recupere la reponse serveur

    if (
      regexNom.test == nom.value &&
      regexPrenom.test == prenom.value &&
      regexCourriel.test == email.value &&
      regexAdresse.test == adresse.value &&
      regexVille.test == ville.value
    ) {
      let contact = {
        firstName: nom.value,
        lastName: prenom.value,
        address: adresse.value,
        city: ville.value,
        email: email.value,
      };
      let products = objectJs2;

      let contprod = { contact, products };
      contprodjs = JSON.stringify(contprod);

      // Envoi des données du formulaire au serveur avec promise

      ajaxPost("http://localhost:3000/api/cameras/order", contprodjs)
        .then(function (reponse) {
          poster(reponse);
        })
        .catch(function (err) {
          console.log(err);
        });

      function poster(reponse) {
        // redirection page de confirmation commande

        location.href = "confirm.html";

        reponsejs = reponse;

        let objectJsOrder = "orderId";

        let lineOrderId = localStorage.getItem("orderId");
        let orderIdent = JSON.parse(lineOrderId);

        //suppression du local storage des produit panier apres commande si nouvel commande suppression total

        if (orderIdent === null) {
          localStorage.removeItem("id");
          localStorage.removeItem("object");
          orderIdent = [];
        } else {
          localStorage.removeItem("id");
          localStorage.removeItem("object");
          localStorage.removeItem("orderId");
          orderIdent = [];
        }

        // integre la nouvelle commande apres l ancienne commande

        orderIdent.push(reponsejs.orderId, somme);

        let tabOrderIdLine = JSON.stringify(orderIdent);

        localStorage.setItem(objectJsOrder, tabOrderIdLine);
      }
    }
  });
};
