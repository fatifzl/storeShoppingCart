const getProducts = async () => {
  try {
    const req = await fetch("https://fakestoreapi.com/products");
    const products = await req.json();
    products.forEach((product) => {
      const productList = document.createElement("div");
      productList.setAttribute("id", `${product.id}`);
      productList.setAttribute("class", "products");

      //   let img = document.createElement("img");
      //   img.src = `${product.image}`;
      //   img.width = 200;
      //   img.height = 200;
      //   productList.appendChild(img);

      //   let title = document.createElement("p");
      //   title.setAttribute("class", "product-title");
      //   title.innerText = "Product Name : " + `${product.title}`;
      //   productList.appendChild(title);

      //   let description = document.createElement("p");
      //   description.setAttribute("class", "product-description");
      //   description.innerText = "Description : " + `${product.description}`;
      //   productList.appendChild(description);

      //   let price = document.createElement("p");
      //   price.setAttribute("class", "product-price");
      //   price.innerText = "Price : " + `${product.price}`;
      //   productList.appendChild(price);

      //   let btn = document.createElement("button");
      //   btn.setAttribute("class", "buy-button");
      //   btn.setAttribute("onclick","addItem(${product.id})");
      //   btn.innerText = "Add Item To Basket";
      //   productList.appendChild(btn);

      productList.innerHTML = `<img src="${product.image}" alt="${product.title}" width="200" height="200" class="img">
      <p class="p-title">${product.title}</p>
      <p class="p-description">Description : ${product.description}</p>
      <p class="p-price">Price : ${product.price}</p>
      <button class="buy-button" onclick="addItem(${product.id})">Add Item To Basket</button>`;

      document.getElementById("container").appendChild(productList);
    });
  } catch (err) {
    console.log(err);
  }
};

let cart = [];
const addItem = async (productId) => {
  const req = await fetch("https://fakestoreapi.com/products");
  const products = await req.json();
  const product = products.find((product) => product.id === productId);
  const itemInCart = cart.find((item) => item.id === productId);
  if (!itemInCart) {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
};

const updateCartCount = () => {
  const cartCount = document.getElementById("cartCount");
  let Quantity = 0;
  for (let item of cart) {
    Quantity += item.quantity;
  }
  cartCount.textContent = Quantity;
};
