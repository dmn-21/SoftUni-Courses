window.addEventListener("load", solve);

function solve() {
  const state = {
    student: null,
    university: null,
    score: null,
  }

  const inputDomSelectors = {
    student: document.getElementById('student'),
    university: document.getElementById('university'),
    score: document.getElementById('score'),
  }

  const otherDomSelectors = {
    nextBtn: document.getElementById('next-btn'),
    previewList: document.getElementById('preview-list'),
    candidatesList: document.getElementById('candidates-list'),
  };

  otherDomSelectors.nextBtn.addEventListener('click', nextHandler);

  function nextHandler() {
    const allFieldsHaveValue = Object.values(inputDomSelectors)
      .every((input) => input.value !== '');
      if (!allFieldsHaveValue) {
        
        return;
      }

      const { student, university, score } = inputDomSelectors;
      const li = createElement('li', otherDomSelectors.previewList, null, ['application']);
      const article = createElement('article', li);
      createElement('h4', article, `${student.value}`);
      createElement('p', article, `University: ${university.value}`);
      createElement('p', article, `Score: ${score.value}`);
      const editBtn = createElement('button', li, 'edit', ['action-btn', 'edit']);
      const applyBtn = createElement('button', li, 'apply', ['action-btn', 'apply']);

      editBtn.addEventListener('click', editHandler);
      applyBtn.addEventListener('click', applyHandler);

      for (const key in inputDomSelectors) {
        state[key] = inputDomSelectors[key].value;
      }

      clearAllInputs();
      otherDomSelectors.nextBtn.setAttribute('disabled', true);
  }

  function editHandler() {
    for (const key in inputDomSelectors) {
      inputDomSelectors[key].value = state[key];
    }

    otherDomSelectors.nextBtn.removeAttribute('disabled');
    otherDomSelectors.previewList.innerHTML = '';
  }

  function applyHandler() {
    otherDomSelectors.nextBtn.removeAttribute('disabled');
      otherDomSelectors.previewList.innerHTML = '';
        const songRef = this.parentNode;
        const editBtn = songRef.querySelector('.edit');
        const applyBtn = songRef.querySelector('.apply');
        editBtn.remove();
        applyBtn.remove();
        otherDomSelectors.candidatesList.appendChild(songRef);
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
  