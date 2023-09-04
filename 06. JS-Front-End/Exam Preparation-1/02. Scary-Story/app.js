window.addEventListener("load", solve);

function solve() {
  const storyState = {
    firstName: null,
    lastName: null,
    age: null,
    title: null,
    genre: null,
    story: null,
  }


  const inputDomSelectors = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    age: document.getElementById('age'),
    title: document.getElementById('story-title'),
    genre: document.getElementById('genre'),
    story: document.getElementById('story'),
  }

  const otherDomSelectors = {
    publishBtn: document.getElementById('form-btn'),
    previewList: document.getElementById('preview-list'),
    mainContainer: document.getElementById('main'),
  };

  otherDomSelectors.publishBtn.addEventListener('click', publishStoryHandler);

  function publishStoryHandler() {
    const allFieldsHaveValue = Object.values(inputDomSelectors)
      .every((input) => input.value !== '');
      if (!allFieldsHaveValue) {
        
        return;
      }

      const { firstName, lastName, age, title, genre, story } = inputDomSelectors;
      const li = createElement('li', otherDomSelectors.previewList, null, ['story-info']);
      const article = createElement('article', li);
      createElement('h4', article, `Name: ${firstName.value} ${lastName.value}`);
      createElement('p', article, `Age: ${age.value}`);
      createElement('p', article, `Title: ${title.value}`);
      createElement('p', article, `Genre: ${genre.value}`);    
      createElement('p', article, story.value);
      const saveBtn = createElement('button', li, 'Save Story', ['save-btn']);
      const editBtn = createElement('button', li, 'Edit Story', ['edit-btn']);
      const delBtn = createElement('button', li, 'Delete Story', ['delete-btn']);

      editBtn.addEventListener('click', editStoryHandler);
      delBtn.addEventListener('click', deleteStoryHandler);
      saveBtn.addEventListener('click', saveStoryHandler);

      for (const key in inputDomSelectors) {
        storyState[key] = inputDomSelectors[key].value;
      }

      clearAllInputs();
      otherDomSelectors.publishBtn.setAttribute('disabled', true);
  }

  function editStoryHandler() {
    for (const key in inputDomSelectors) {
      inputDomSelectors[key].value = storyState[key];
    }

    otherDomSelectors.publishBtn.removeAttribute('disabled');
    otherDomSelectors.previewList.innerHTML = '';
    createElement('h3', otherDomSelectors.previewList, 'Preview');
  }

  function deleteStoryHandler() {
    const liItem = this.parentNode;
    liItem.remove();
    otherDomSelectors.publishBtn.removeAttribute('disabled');
  }

  function saveStoryHandler() {
    otherDomSelectors.mainContainer.innerHTML = '';
    createElement('h1', otherDomSelectors.mainContainer, 'Your scary story is saved');
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