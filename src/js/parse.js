const products = [];
const url = "dist/data.json";
const add = (a, b) => a + b;
const equalArray = (a, b) => a.every(item => b.includes(item)) && b.every(item => a.includes(item));
    
let keywordsCache = [];
let delayTimer;

//nodes
const wrapper = document.querySelector("ul");
const form = document.querySelector("form");
const searchInput = document.querySelector("[name='search']");

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
    `;
  });
  wrapper.classList.remove("active");
  wrapper.innerHTML = list.join('');
  setTimeout(() => wrapper.classList.add("active"), 300);
}

function triggerSearch(e) {
  const delay = 500;
  e.preventDefault();
  clearTimeout(delayTimer);
  delayTimer = setTimeout(search, delay);
}

function search() {
  const keywords = searchInput.value.trim().toLowerCase().split(' ');
  if (equalArray(keywords, keywordsCache)) {
    return false;
  }
  const result = products.filter(product => {
    return keywords.some(keyword => product.name.toLowerCase().includes(keyword)
                                    || product.color.names.join(" ").includes(keyword));
  });
  keywordsCache = keywords;
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
.then(showData);

searchInput.addEventListener('keyup', triggerSearch);
form.addEventListener('submit', triggerSearch);
wrapper.addEventListener('click', filterColor);
