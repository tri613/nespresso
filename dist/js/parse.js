"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var products = [];
var wrapper = document.querySelector("ul");
var searchInput = document.querySelector("[name='search']");

function initData() {
  return fetch("./dist/data.json").then(function (response) {
    return response.json();
  }).then(function (data) {
    var sorted = data.sort(function (a, b) {
      return a.color.rgb.reduce(add) < b.color.rgb.reduce(add) ? -1 : 1;
    });
    products.push.apply(products, _toConsumableArray(sorted));
    return products;
  });
}

function add(a, b) {
  return a + b;
}

function showData(_products) {
  var list = _products.map(function (product, index) {
    return "\n    <li>\n      <div class=\"card\">\n        <div class=\"flex-wrap\">\n          <div class=\"flex-item\"><img class=\"\" src=\"" + product.image + "\" alt=\"" + product.name + "\"></div>\n          <div class=\"flex-item\" style=\"color: rgb(" + product.color.rgb.join(",") + ");\">\n            <h2>" + product.name + "</h2>\n            <span><i class=\"fa fa-coffee\" aria-hidden=\"true\"></i> " + product.intensity + "</span>\n            <h3>" + product.flavor + "</h3>\n            <h5>" + product.color.names.map(function (name) {
      return "#" + name;
    }).join(' ') + "</h5>\n          </div>\n        </div>\n        <!-- <hr style=\"background-color: rgb(" + product.color.rgb.join(",") + ");\" /> -->\n        <p>" + product.details.description + "<p>\n      </div>\n    </li>\n  ";
  });
  wrapper.innerHTML = list.join('');
}

function search(e) {
  var keyword = this.value.trim();
  var result = products.filter(function (product) {
    return product.name.includes(keyword) || product.color.names.join(" ").includes(keyword);
  });
  showData(result);
}

initData().then(showData);
searchInput.addEventListener('keyup', search);