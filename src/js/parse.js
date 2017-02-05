const products = [];
const url = "dist/data.json";
const wrapper = document.querySelector("ul");
const form = document.querySelector("form");
const searchInput = document.querySelector("[name='search']");
const tags = [];

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
            <h5>${product.color.names.map(name => `<span class="tag" data-color="${name}">#${name}</span>`).join(' ')}</h5>
          </div>
        </div>
        <p>${product.details.description}<p>
      </div>
    </li>
  `});
  wrapper.classList.add("active");
  wrapper.innerHTML = list.join('');
  // setTimeout(() => wrapper.classList.add("active"), 300);
}

function search(e) {
  e.preventDefault();
  const keywords = searchInput.value.trim().toLowerCase().split(' ');
  const result = products.filter(product => {
    return keywords.some(keyword => product.name.toLowerCase().includes(keyword)
                                    || product.color.names.join(" ").includes(keyword));
  });
  showData(result);
}

function filterColor(e) {
  if (e.target.className == "tag") {
    const color = e.target.dataset.color;
    const result = products.filter(product => product.color.names.some(name => name === color));
    showData(result);
  }
}

fetchData()
.then(initData)
.then(showData)
// .then(res => {
//   const nodes = Array.from(document.querySelectorAll(".tag"));
//   tags.push(...nodes);
//   tags.forEach(tag => tag.addEventListener("click", filterColor));
// });

searchInput.addEventListener('keyup', search);
form.addEventListener('submit', search);
wrapper.addEventListener('click', filterColor);
