const products = [];
const wrapper = document.querySelector("ul");
const searchInput = document.querySelector("[name='search']");

function initData() {
  return fetch("./dist/data.json")
    .then(response => response.json())
    .then(data => {
      const sorted = data.sort((a,b) => a.color.rgb.reduce(add) < b.color.rgb.reduce(add) ? -1 : 1);
      products.push(...sorted);
      return products;
    });
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

initData().then(showData);
searchInput.addEventListener('keyup', search);
