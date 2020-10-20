function ajaxPost(url, data, callback) {
  var req = new XMLHttpRequest();
  req.open("POST", url);
  req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) {
      // Appelle la fonction callback en lui passant la réponse de la requête
      callback(req.responseText);
    } else {
      console.error(req.status + " " + req.statusText + " " + url);
    }
  });
  req.addEventListener("error", function () {
    console.error("Erreur réseau avec l'URL " + url);
  });

  req.setRequestHeader("Content-Type", "application/json");

  req.send(data);
  console.log(typeof data);
}

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url) {
  const promise = new Promise(function (resolve, reject) {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          resolve(JSON.parse(req.responseText));
        } else {
          reject(req.status);
        }
      }
    };
    req.send();
  });
  return promise;
}
