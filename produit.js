let id = window.location.search.substring(1);
console.log(id);
const url = `http://localhost:3000/api/cameras/${id}`;
const request = new XMLHttpRequest();
request.onreadystatechange = function () {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);
  }
};
request.open("GET", url);
request.send();
