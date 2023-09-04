function groceryList() {
  const inputDomSelectors = {
    product: document.getElementById('product'),
    count: document.getElementById('count'),
    price: document.getElementById('price'),
  }

  const otherDomSelectors = {
    addBtn: document.getElementById('add-product'),
    updateBtn: document.getElementById('update-product'),
    loadBtn: document.getElementById('load-product'),
    tbody: document.getElementById('tbody'),
  }

  const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';

  otherDomSelectors.loadBtn.addEventListener('click', loadProductHandler);
  otherDomSelectors.addBtn.addEventListener('click', addProductHandler);

  let currProduct = [];
  let productToEdit = {};

  function loadProductHandler (event) {
    event?.preventDefault();

    otherDomSelectors.tbody.innerHTML = '';

    fetch (BASE_URL) 
        .then((data) => data.json())
        .then((res) => {
          currProduct = Object.values(res);

            for (const {product, count, price, _id} of currProduct) {
                const tr = createElement('tr', otherDomSelectors.tbody);
                tr.id = _id;
                createElement('td', tr, product, ['name']);
                createElement('td', tr, count, ['count-product']);
                createElement('td', tr, price, ['product-price']);
                const btn = createElement('td', tr, null, ['btn']);
                const update = createElement('button', btn, 'Update', ['update']);
                const deleteBtn = createElement('button', btn, 'Delete', ['delete']);

                deleteBtn.addEventListener('click', deleteProductHandler);
                update.addEventListener('click', updateHandler);
            
                clearAllInputs()  
            }
        })
        .catch((err) => {
            console.log(err);
        })
  }

  function addProductHandler(event) {
    event?.preventDefault();
    
    let { product, count, price } = inputDomSelectors;
    const payload = JSON.stringify({
        product: product.value,
        count: count.value,
        price: price.value,
    });
    const httpHeaders = { 
        method: 'POST',
        body: payload,
    }

    fetch(BASE_URL, httpHeaders)
        .then(() => {
            loadProductHandler();
        })
        .catch((err) => {
            console.err(err);
        })
  }

  function deleteProductHandler () {
    const id = this.parentNode.parentNode.id;
    const httpHeaders = {
        method: 'DELETE'
    };

    fetch(`${BASE_URL}${id}`, httpHeaders)
        .then(() => loadProductHandler())
        .catch((err) => {
            console.log(err);
        })
  }

  function updateHandler () {
    const id = this.parentNode.parentNode.id;
    productToEdit = currProduct.find(p => p._id === id)
    for (const key in inputDomSelectors) {
        inputDomSelectors[key].value = productToEdit[key];
    }

    otherDomSelectors.updateBtn.removeAttribute('disabled');
    otherDomSelectors.addBtn.setAttribute('disabled', true);

    otherDomSelectors.updateBtn.addEventListener('click', updateProductHandler);
  }

  function updateProductHandler(event) {
    event.preventDefault();
    const id = productToEdit._id;
    let { product, count, price } = inputDomSelectors;
   
    const payload = JSON.stringify({
      product: product.value,
      count: count.value,
      price: price.value,
    });
    const httpHeaders = {
      method: 'PATCH',
      body: payload,
    }

  fetch(`${BASE_URL}${id}`, httpHeaders)
      .then(() => {
         loadProductHandler();
         otherDomSelectors.updateBtn.setAttribute('disabled', true);
         otherDomSelectors.addBtn.removeAttribute('disabled');
      })
      .catch ((err) => {
          console.error(err);
      })
  }

  function clearAllInputs() {
    Object.values(inputDomSelectors)
      .forEach((input) => {
        input.value = '';
      })
  }

  function createElement(type, parentNode, content, classes, id, attributes, useInnerHTML) { 
    const htmlElement = document.createElement(type);

    if (content && useInnerHTML) {
      htmlElement.innerHTML = content;
    } else {
      if (content && type !== 'input') {
        htmlElement.textContent = content;
      }

      if (content && type === 'input') {
        htmlElement.value = content;
      }
    }

    if (classes && classes.length > 0) {
      htmlElement.classList.add(...classes);
    }

    if (id) {
      htmlElement.id = id;
    }

    if (attributes) {
      for (const key in attributes) {
        htmlElement.setAttribute(key, attributes[key]);
      }
    }

    if (parentNode) {
      parentNode.appendChild(htmlElement);
    }

    return htmlElement;

  }
}


groceryList();