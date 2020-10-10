// variable declarer dans la page produit creation de l object javascript depuis local storage

console.log(localStorage.getItem("object"));
line = localStorage.getItem("object");

objectJs = JSON.parse(line);

console.log(objectJs);
console.log(line.length);
console.log(objectJs[0]);
console.log(localStorage.length);

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);
    console.log(response[0].imageUrl);

    // variable des div des pricipales colonnes du panier

    var prod = document.getElementById("prod");
    var price = document.getElementById("price");
    var quant = document.getElementById("quant");
    var tot = document.getElementById("tot");

    // variable du contenu des div de chaque colonne

    var produit = document.getElementById("produit");
    var prix = document.getElementById("prix");
    var quantite = document.getElementById("quantite");
    var total = document.getElementById("total");

    var soustotal = document.getElementById("soustotal");

    // clonage de contenu modele html en fonction du produit ajouter

    for (j = 0; j < objectJs.length - 1; j++) {
      var cloneproduit = produit.cloneNode(true);
      prod.appendChild(cloneproduit);

      var cloneprix = prix.cloneNode(true);
      price.appendChild(cloneprix);

      var clonequantite = quantite.cloneNode(true);
      quant.appendChild(clonequantite);

      var clonetotal = total.cloneNode(true);
      tot.appendChild(clonetotal);
    }

    // recuperation de tout les contenus precedemment cloner des produits ajouter au panier

    var produitAll = document.querySelectorAll("#produit");
    var prixAll = document.querySelectorAll("#prix");
    var totalAll = document.querySelectorAll("#total");
    var imgAll = document.querySelectorAll("#img");
    var butAll = document.querySelectorAll("#supprimer");
    console.log(butAll);

    // ajout d une variable de comptage de base

    var somme = 0;

    console.log(imgAll);

    // mise en place des informations produits dans leur contenu à linterieur du panier

    for (i = 0; i < objectJs.length; i++) {
      console.log(objectJs[i]);
      console.log(objectJs.length);
      console.log(objectJs[i][0].name);
      console.log(objectJs[i][0].imageUrl);

      imgAll[i].setAttribute("src", objectJs[i][0].imageUrl);

      produitAll[i].textContent =
        objectJs[i][0].name + "  " + "lenses:  " + objectJs[i][1];

      produitAll[i].appendChild(imgAll[i]);

      prixAll[i].textContent = objectJs[i][0].price;

      totalAll[i].textContent = objectJs[i][0].price;

      console.log(butAll[i]);

      somme = parseInt(prixAll[i].textContent) + somme;
      console.log(somme);

      // ajout du formulaire quand panier rempli

      if (prixAll[i] !== undefined) {
        var formulaire = document.getElementById("formulaire");
        formulaire.classList.remove("invisible");

        var texteRemplir = document.getElementById("texte-remplir");
        var texteValider = document.getElementById("texte-valider");

        texteRemplir.innerText = "Veuillez remplir le formulaire merci !";
        texteValider.innerText = "Et ensuite validez votre commande";
        console.log(texteValider.textContent);

        // ecoute formulaire

        var nom = document.getElementById("nom");
        var prenom = document.getElementById("prenom");
        var email = document.getElementById("email");
        var adresse = document.getElementById("adresse");
        var ville = document.getElementById("ville");

        document
          .getElementById("formulaire")
          .addEventListener("submit", function (e) {
            // Correspond à une chaîne de la forme xxx@yyy.zzz
            var regexNom = /[a-zA-Z]/;
            var regexPrenom = /[a-zA-Z]/;
            var regexCourriel = /.+@.+\..+/;
            var regexAdresse = /[a-zA-Z]/;
            var regexVille = /[a-zA-Z]/;

            var validiteNom = "";
            var validitePrenom = "";
            var validiteCourriel = "";
            var validiteAdresse = "";
            var validiteVille = "";

            if (!regexNom.test(nom.value)) {
              validiteNom =
                "Nom doit contenir des lettres les espaces ou le trait d'union sont autorise";
            }
            if (!regexPrenom.test(prenom.value)) {
              validitePrenom =
                "Prenom doit contenir des lettres les espaces ou le trait d'union sont autorise";
            }
            if (!regexCourriel.test(email.value)) {
              validiteCourriel =
                "Adresse email fausse suivez l 'exemple au dessus ";
            }
            if (!regexAdresse.test(adresse.value)) {
              validiteAdresse =
                "Adresse non valide doit contenir des chiffre et des lettres";
            }
            if (!regexVille.test(ville.value)) {
              validiteVille =
                "Ville doit contenir des lettres les espaces ou le trait d'union sont autorise";
            }

            //

            var aideNom = document.getElementById("aideNom");
            var aidePrenom = document.getElementById("aidePrenom");
            var aideEmail = document.getElementById("aideEmail");
            var aideAdresse = document.getElementById("aideAdresse");
            var aideVille = document.getElementById("aideVille");

            aideNom.textContent = validiteNom;
            aideNom.style.color = "red";

            aidePrenom.textContent = validitePrenom;
            aidePrenom.style.color = "red";

            aideEmail.textContent = validiteCourriel;
            aideEmail.style.color = "red";

            aideAdresse.textContent = validiteAdresse;
            aideAdresse.style.color = "red";

            aideVille.textContent = validiteVille;
            aideVille.style.color = "red";

            e.preventDefault();
          });
      }
    }

    // sous total des prix des appareils

    soustotal.textContent = somme;

    console.log(prixAll);
  }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();
