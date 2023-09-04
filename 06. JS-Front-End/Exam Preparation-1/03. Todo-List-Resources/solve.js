function attachEvents() {
  const addBtn = document.getElementById('add-button');
  const loadBtn = document.getElementById('load-button');
  const list = document.getElementById('todo-list');
  const title = document.getElementById('title');

  const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

  addBtn.addEventListener('click', add);
  loadBtn.addEventListener('click', loadAll);

  function add (event) { 
    event.preventDefault();
    const name = title.value;
    const httpHeaders = { 
        method: 'POST',
        body: JSON.stringify({ name }),
    }

    fetch(BASE_URL, httpHeaders)
        .then(() => {
            loadAll();
            title.value = '';
        })
        .catch((err) => {
            console.err(err);
        })
  }

  function loadAll (event) {
    event?.preventDefault();

    list.innerHTML = '';

    fetch (BASE_URL) 
        .then((data) => data.json())
        .then((res) => {
            let objValues = Object.values(res);

            for (const {name, _id} of objValues) {
                const li = document.createElement('li');
                const span = document.createElement('span');
                const btnRemove = document.createElement('button');
                const btnEdit = document.createElement('button');
        
                li.id = _id;
                span.textContent = name;
                btnRemove.textContent = 'Remove';
                btnEdit.textContent = 'Edit';
                
                btnRemove.addEventListener('click', removeTask);
                btnEdit.addEventListener('click', editTask);
        
                list.appendChild(li);
                li.appendChild(span);
                li.appendChild(btnRemove);
                li.appendChild(btnEdit);
            }
        })
        .catch((err) => {
            console.log(err);
        })
  }

  function editTask () {
    const liParent = this.parentNode;
    const [ span, _removeBtn, editBtn ] = Array.from(liParent.children);
    const editInput = document.createElement('input');
    editInput.value = span.textContent;
    liParent.prepend(editInput);
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.addEventListener('click', submitTask);
    liParent.appendChild(submitBtn);
    span.remove();
    editBtn.remove();
  }

  function submitTask () {
    const liParent = this.parentNode;
    const id = liParent.id;
    const [ input ] = Array.from(liParent.children);
    const httpHeaders = {
        method: 'PATCH',
        body: JSON.stringify({ name: input.value }),
    }

    fetch(`${BASE_URL}${id}`, httpHeaders)
        .then(() => loadAll())
        .catch ((err) => {
            console.error(err);
        })
  }

  function removeTask () {
    const id = this.parentNode.id;
    const httpHeaders = {
        method: 'DELETE'
    };

    fetch(`${BASE_URL}${id}`, httpHeaders)
        .then(() => loadAll())
        .catch((err) => {
            console.log(err);
        })
  }
}

attachEvents();
