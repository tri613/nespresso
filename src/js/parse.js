const products = [];
const wrapper = document.querySelector("ul");
const searchInput = document.querySelector("[name='search']");
const url = "dist/data.json";

function fetchData() {
  if (window.fetch) {
    return fetch(url).then(response => response.json());
  } else {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const result = JSON.parse(this.responseText);
          resolve(result);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    });
  }
}

function initData(_data) {
  const sorted = _data.sort((a,b) => a.color.rgb.reduce(add) < b.color.rgb.reduce(add) ? -1 : 1);
  products.push(...sorted);
  return products;
}

function add(a, b) {
  return a+b;
}

function showData(_products) {
  const list = _products.map((product, index) => {
    return `
    <li>
      <div class="card">
        <div class="flex-wrap">
          <div class="flex-item"><img class="" src="${product.image}" alt="${product.name}"></div>
          <div class="flex-item" style="color: rgb(${product.color.rgb.join(",")});">
            <h2>${product.name}</h2>
            <span><i class="fa fa-coffee" aria-hidden="true"></i> ${product.intensity}</span>
            <h3>${product.flavor}</h3>
            <h5>${product.color.names.map(name => `#${name}`).join(' ')}</h5>
          </div>
        </div>
        <!-- <hr style="background-color: rgb(${product.color.rgb.join(",")});" /> -->
        <p>${product.details.description}<p>
      </div>
    </li>
  `});
  wrapper.innerHTML = list.join('');
}

function search(e) {
  const keyword = this.value.trim();
  const result = products.filter(product => product.name.includes(keyword) ||
                                            product.color.names.join(" ").includes(keyword));
  showData(result);
}

fetchData()
.then(initData)
.then(showData);

searchInput.addEventListener('keyup', search);
