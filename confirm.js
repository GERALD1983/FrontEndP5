//::::::::::::::::::::::::::::::recupere localstorage order command:::::::::::::::::::::::::::::::

var lineCommand = localStorage.getItem("orderId");
var objectCommand = JSON.parse(lineCommand);
console.log(objectCommand);

//:::::::::::::::::::::: changement de contenu quand la commande est valider ::::::::::::::::::::::

if (lineCommand !== null) {
  var titCommand = document.getElementById("command");
  var descriCommand = document.getElementById("orderCommand");

  titCommand.innerHTML = "Votre commande a bien été reçu";
  descriCommand.textContent =
    "Votre identifiant de commande est le :   " +
    objectCommand[0] +
    "  ,le total de vos achats est de : " +
    objectCommand[1] +
    "  euro";
}
