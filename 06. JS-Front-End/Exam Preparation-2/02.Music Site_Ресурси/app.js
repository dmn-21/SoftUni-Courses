window.addEventListener('load', solve);

function solve() {
    let totalLikes = 0;
    const inputDomSelectors = {
        genre: document.getElementById('genre'),
        name: document.getElementById('name'),
        author: document.getElementById('author'),
        date: document.getElementById('date'),
      }
    
      const otherDomSelectors = {
        addBtn: document.getElementById('add-btn'),
        allHitsContainer: document.querySelector('.all-hits-container'),
        saveContainer: document.querySelector('.saved-container'),
        pLikeContainer: document.querySelector('.likes > p'),
      };
    
      otherDomSelectors.addBtn.addEventListener('click', addHandler);

      function addHandler(event) {
        event.preventDefault();
        
        const allFieldsHaveValue = Object.values(inputDomSelectors)
        .every((input) => input.value !== '');
        if (!allFieldsHaveValue) {
        return;
        }

        const { genre, name, author, date } =  inputDomSelectors;
        const div = createElement('div', otherDomSelectors.allHitsContainer, null, ['hits-info']);
        createElement('img', div, null, null, null, {'src': './static/img/img.png'});
        createElement('h2', div, `Genre: ${genre.value}`);
        createElement('h2', div, `Name: ${name.value}`);
        createElement('h2', div, `Author: ${author.value}`);
        createElement('h3', div, `Date: ${date.value}`);
        const saveBtn = createElement('button', div, `Save song`, ['save-btn']);
        const likeBtn = createElement('button', div, `Like song`, ['like-btn']);
        const deleteBtn = createElement('button', div, `Delete`, ['delete-btn']);

        saveBtn.addEventListener('click', saveHandler);
        likeBtn.addEventListener('click', likeHandler);        
        deleteBtn.addEventListener('click', deleteHandler);

        clearAllInputs();
      }

      function saveHandler() {
        const songRef = this.parentNode;
        const saveBtn = songRef.querySelector('.save-btn');
        const likeBtn = songRef.querySelector('.like-btn'); 
        const deleteBtn = songRef.querySelector('.delete-btn'); 
        otherDomSelectors.saveContainer.appendChild(songRef);

        saveBtn.remove();
        likeBtn.remove();

        deleteBtn.addEventListener('click', deleteHandler);
      }

      function likeHandler() {
        this.setAttribute('disabled', true);
        totalLikes++;
        otherDomSelectors.pLikeContainer.textContent = `Total Likes: ${totalLikes}`;
      }

      function deleteHandler() {
        const div = this.parentNode;
        div.remove();
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