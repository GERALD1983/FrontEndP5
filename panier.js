// variable declarer dans la page produit creation de l object javascript depuis local storage

line = localStorage.getItem("object");
console.log(line);

objectJs = JSON.parse(line);
console.log(objectJs);

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);
    console.log(response[0].imageUrl);

    if (line === null) {
      console.log("rempli le panier");
      document
        .getElementById("produit")
        .removeChild(document.getElementById("img"));
    } else {
      var panierMessage = document.getElementById("panierMessage");
      panierMessage.textContent = "Vos articles ont été ajouter dans le panier";

      // variable des div des pricipales colonnes du panier

      var prod = document.getElementById("prod");
      var lentilles = document.getElementById("lentilles");
      //var quant = document.getElementById("quant");
      var tot = document.getElementById("price");

      // variable du contenu des div de chaque colonne

      var produit = document.getElementById("produit");
      //var div_button = document.getElementById("div_button");
      var lense = document.getElementById("lenses");
      //var quantite = document.getElementById("quantite");
      var total = document.getElementById("prix");

      var soustotal = document.getElementById("soustotal");

      // clonage de contenu modele html en fonction du produit ajouter

      for (j = 0; j < objectJs.length - 1; j++) {
        //var clonedivbut = div_button.cloneNode(true);
        var cloneproduit = produit.cloneNode(true);
        prod.appendChild(cloneproduit);
        //prod.appendChild(clonedivbut);

        var clonelense = lense.cloneNode(true);
        lentilles.appendChild(clonelense);

        //var clonequantite = quantite.cloneNode(true);
        //quant.appendChild(clonequantite);

        var clonetotal = total.cloneNode(true);
        tot.appendChild(clonetotal);
      }

      // recuperation de tout les contenus precedemment cloner des produits ajouter au panier

      var produitAll = document.querySelectorAll("#produit");
      var lensesAll = document.querySelectorAll("#lenses");
      var prixAll = document.querySelectorAll("#prix");
      var imgAll = document.querySelectorAll("#img");
      //var divbutAll = document.querySelectorAll("#div_button");

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

        produitAll[i].textContent = objectJs[i][0].name;

        produitAll[i].appendChild(imgAll[i]);

        lensesAll[i].textContent = objectJs[i][1];

        prixAll[i].textContent = objectJs[i][0].price;

        somme = parseInt(prixAll[i].textContent) + somme;
        console.log(somme);

        var but = document.createElement("button");
        but.setAttribute("id", "supprimer");

        but.classList.add(
          "col-md-3",
          "align-content-center",
          "btn",
          "btn-info",
          "mt-3",
          "btn-sm"
        );

        but.textContent = "supprimer";
        console.log(but);
        produitAll[i].appendChild(but);

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

          var form = document.querySelector("form");
          form.addEventListener("submit", function (e) {
            e.preventDefault();
            // Correspond à une chaîne de la forme xxx@yyy.zzz
            var regexNom = /[a-zA-Z]/;
            var regexPrenom = /[a-zA-Z]/;
            var regexCourriel = /.+@.+\..+/;
            var regexAdresse = /[0-9] [a-zA-Z]/;
            var regexVille = /[a-zA-Z]/;

            var validiteNom = "";
            var validitePrenom = "";
            var validiteCourriel = "";
            var validiteAdresse = "";
            var validiteVille = "";

            var aideNom = document.getElementById("aideNom");
            var aidePrenom = document.getElementById("aidePrenom");
            var aideEmail = document.getElementById("aideEmail");
            var aideAdresse = document.getElementById("aideAdresse");
            var aideVille = document.getElementById("aideVille");

            switch (nom.value) {
              case regexPrenom.test !== nom.value:
                validiteNom =
                  "Nom doit contenir des lettres les espaces ou le trait d'union sont autorise";
                aideNom.textContent = validiteNom;
                aideNom.style.color = "red";

              case regexPrenom.test === nom.value:
                validiteNom = "";
            }

            if (!regexPrenom.test(prenom.value)) {
              validitePrenom =
                "Prenom doit contenir des lettres les espaces ou le trait d'union sont autorise";

              aidePrenom.textContent = validitePrenom;
              aidePrenom.style.color = "red";
            }
            if (!regexCourriel.test(email.value)) {
              validiteCourriel =
                "Adresse email fausse suivez l 'exemple au dessus ";
              aideEmail.textContent = validiteCourriel;
              aideEmail.style.color = "red";
            }
            if (!regexAdresse.test(adresse.value)) {
              validiteAdresse =
                "Adresse non valide doit contenir des chiffre puis des lettres";
              aideAdresse.textContent = validiteAdresse;
              aideAdresse.style.color = "red";
            }
            if (!regexVille.test(ville.value)) {
              validiteVille =
                "Ville doit contenir des lettres les espaces ou le trait d'union sont autorise";
              aideVille.textContent = validiteVille;
              aideVille.style.color = "red";
            } else {
              var data = {
                name: nom.value,
                prenom: prenom.value,
                email: email.value,
                adresse: adresse.value,
                ville: ville.value,
              };
              datajson = JSON.stringify(data);
              // Envoi des données du formulaire au serveur
              // La fonction callback est ici vide
              ajaxPost(
                "http://localhost/javascript-web-srv/post_json.php",
                datajson,
                function (reponse) {
                  console.log("bien envoyer au serveur chef");
                  console.log(data);
                  var messageElt = document.createElement("p");
                  messageElt.textContent = "Votre commande a bien été envoyer.";
                  document.getElementById("succes").appendChild(messageElt);
                }
              );
            }
          });
        }
      }
      /*
      var buton = document.querySelectorAll("#supprimer");
      for (i = 0; i < objectJs.length; i++) {
        buton[i].addEventListener("click", function () {
          console.log("supprime moi");
          console.log(objectJs[i]);
          console.log(i);

          let supprim = objectJs.filter(function (el, key) {
            console.log(el, key);
          });
          console.log(supprim);
        });
      }
      */
      // sous total des prix des appareils

      soustotal.textContent = somme;

      console.log(prixAll);
    }
  }
};

request.open("GET", "http://localhost:3000/api/cameras");
request.send();
