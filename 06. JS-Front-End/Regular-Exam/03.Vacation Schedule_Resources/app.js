function vacation() {
    const inputDomSelectors = {
      name: document.getElementById('name'),
      days: document.getElementById('num-days'),
      date: document.getElementById('from-date'),
    }
  
    const otherDomSelectors = {
      addBtn: document.getElementById('add-vacation'),
      editBtn: document.getElementById('edit-vacation'),
      loadBtn: document.getElementById('load-vacations'),
      list: document.getElementById('list'),
    }
  
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
  
    otherDomSelectors.addBtn.addEventListener('click', addHandler);
    otherDomSelectors.loadBtn.addEventListener('click', loadHandler);
  
    let curr = [];
    let toEdit = {};
  
    function loadHandler (event) {
        event?.preventDefault();

        otherDomSelectors.list.innerHTML = '';

        fetch (BASE_URL) 
          .then((data) => data.json())
          .then((res) => {
            curr = Object.values(res);
  
              for (const {name, days, date, _id} of curr) {
                  const div = createElement('div', otherDomSelectors.list, null, ['container']);
                  div.id = _id;
                  createElement('h2', div, name,);
                  createElement('h3', div, date);
                  createElement('h3', div, days);
                  const changeBtn = createElement('button', div, 'Change', ['change-btn']);
                  const doneBtn = createElement('button', div, 'Done', ['done-btn']);
  
                  changeBtn.addEventListener('click', changeHandler);
                  doneBtn.addEventListener('click', doneHandler);

                  clearAllInputs();  
              }
          })
          .catch((err) => {
              console.log(err);
          })
    }

    function addHandler() {
        
        let { name, days, date } = inputDomSelectors;
        const payload = JSON.stringify({
            name: name.value,
            days: days.value,
            date: date.value,
        });
        const httpHeaders = { 
            method: 'POST',
            body: payload,
        }

        fetch(BASE_URL, httpHeaders)
            .then(() => {
                loadHandler();
            })
            .catch((err) => {
                console.err(err);
        })
    }

    function changeHandler() {
        const id = this.parentNode.id;
        toEdit = curr.find(p => p._id === id)
        for (const key in inputDomSelectors) {
            inputDomSelectors[key].value = toEdit[key];
        }

    otherDomSelectors.editBtn.removeAttribute('disabled');
    otherDomSelectors.addBtn.setAttribute('disabled', true);

    otherDomSelectors.editBtn.addEventListener('click', editHandler);
    }

    function editHandler() {
    const id = toEdit._id;
    console.log(id);
    let { name, days, date } = inputDomSelectors;
   
    const payload = JSON.stringify({
      name: name.value,
      days: days.value,
      date: date.value,
    });
    const httpHeaders = {
      method: 'PUT',
      body: payload,
    }

  fetch(`${BASE_URL}${id}`, httpHeaders)
      .then(() => {
        loadHandler();
        otherDomSelectors.addBtn.removeAttribute('disabled');
        otherDomSelectors.editBtn.setAttribute('disabled', true);
      })
      .catch ((err) => {
          console.error(err);
      })
    }

    function doneHandler() {
        const id = this.parentNode.id;
        console.log(id);
        const httpHeaders = {
            method: 'DELETE'
            };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadHandler())
            .catch((err) => {
                console.log(err);
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

vacation();