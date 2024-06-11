window.base64_encode = function() {
  var input = document.getElementById("base64-input");
  var output = document.getElementById("base64-output");

  output.value = btoa(input.value);
}

window.base64_decode = function() {
  var input = document.getElementById("base64-input");
  var output = document.getElementById("base64-output");

  output.value = atob(input.value);
}
