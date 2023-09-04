function attachEvents() {
    const inputDomSelectors = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
      }
    
      const otherDomSelectors = {
        loadBtn: document.getElementById('load-board-btn'),
        addBtn: document.getElementById('create-task-btn'),
      }

    const currStatus = {
        'ToDo': document.querySelector('#todo-section > ul'),
        'In Progress': document.querySelector('#in-progress-section > ul'),
        'Code Review': document.querySelector('#code-review-section > ul'),
        'Done': document.querySelector('#done-section > ul'),
    }

    const nextStatus = {
        'ToDo': 'In Progress',
        'In Progress': 'Code Review',
        'Code Review': 'Done',
        'Done': document.querySelector('#done-section > ul'),
    }

    const currMove = {
        'ToDo': 'Move to In Progress',
        'In Progress': 'Move to Code Review',
        'Code Review': 'Move to Done',
        'Done': 'Close',
    }

    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    
    otherDomSelectors.loadBtn.addEventListener('click', loadHandler);
    
    let tasks = [];
    
    function loadHandler (event) {
        event?.preventDefault();
    
        inputDomSelectors.title.innerHTML = '';
        inputDomSelectors.description.innerHTML = '';
    
        fetch (BASE_URL) 
            .then((data) => data.json())
            .then((res) => {
                tasks = Object.values(res);
                for (const {title, description, status, _id} of tasks) {
                const li = createElement('li', currStatus[status], null, ['task']);
                createElement('h3', li, title);
                createElement('p', li, description);
                const moveBtn = createElement('button', li, currMove[status]);
                moveBtn.id = _id;
                moveBtn.addEventListener('click', MoveToInProgress);
                    
                clearAllInputs();  
                }
            })
            .catch((err) => {
                console.log(err);
            })
      }

      function MoveToInProgress() {
        let task = tasks.find((t) => t._id === this.id);
        const httpHeaders = {
            method: 'PATCH',
            body: JSON.stringify({
                ...task,
               status: 'In Progress', 
            }),
          }
      
        fetch(`${BASE_URL}${task._id}`, httpHeaders)
            .then(() => {
                
               loadProductHandler();
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
attachEvents();