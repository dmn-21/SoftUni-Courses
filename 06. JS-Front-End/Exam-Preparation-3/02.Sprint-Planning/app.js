window.addEventListener("load", solve);

function solve() { 
  let count = 1;
  let calcPoints = 0;

  const inputState = {
    title: null,
    description: null,
    label: null,
    points: null,
    assignee: null,
  }
    
  const inputDomSelectors = {
    title: document.getElementById('title'),
    description: document.getElementById('description'),
    label: document.getElementById('label'),
    points: document.getElementById('points'),
    assignee: document.getElementById('assignee'),
  }

  const otherDomSelectors = {
    taskId: document.getElementById('task-id'),
    createBtn: document.getElementById('create-task-btn'),
    deleteBtn: document.getElementById('delete-task-btn'),
    tasksSection: document.getElementById('tasks-section'),
    totalPoints: document.getElementById('total-sprint-points'),
  };

  otherDomSelectors.createBtn.addEventListener('click', createTaskHandler);

  function createTaskHandler() {
    const allFieldsHaveValue = Object.values(inputDomSelectors)
      .every((input) => input.value !== '');
      if (!allFieldsHaveValue) {
        
        return;
      }

      const { title, description, label, points, assignee } = inputDomSelectors;
      calcPoints += Number(points.value);
      
      const article = createElement('article', otherDomSelectors.tasksSection, null, ['task-card'], `task-${count++}`);
      const feature = label.value === 'Feature'? 'feature' : null;
      const lowPriority = label.value === 'Low Priority Bug'? 'low-priority' : null;
      const highPriority = label.value === 'High Priority Bug'? 'high-priority' : null;
      
      if (feature) {
        createElement('div', article, `${label.value} &#8865`, ['task-card-label', feature], null, null, true); 
      }
      if (lowPriority) {
        createElement('div', article, `${label.value} &#9737`, ['task-card-label', lowPriority], null, null, true); 
      }
      if (highPriority) {
        createElement('div', article, `${label.value} &#9888`, ['task-card-label', highPriority], null, null, true); 
      }
      
      createElement('h3', article, `${title.value} `, ['task-card-title']);
      createElement('p', article, `${description.value}`, ['task-card-description']);
      createElement('div', article, `Estimated at ${points.value} pts`, ['task-card-points']);
      createElement('div', article, `Assigned to: ${assignee.value}`, ['task-card-assignee']);
      const div = createElement('div', article, null, ['task-card-actions']);
      const delBtn = createElement('button', div, 'Delete',);
      
      for (const key in inputDomSelectors) {
        inputState[key] = inputDomSelectors[key].value;
      }

      delBtn.addEventListener('click', loadConfirmDelete);
      otherDomSelectors.deleteBtn.addEventListener('click', deleteTaskHandler);

      clearAllInputs();
      otherDomSelectors.totalPoints.textContent = `Total Points ${calcPoints}pts`;
  }

  function loadConfirmDelete() {
    for (const key in inputDomSelectors) {
        inputDomSelectors[key].value = inputState[key];
      }
  
      otherDomSelectors.deleteBtn.removeAttribute('disabled');
      otherDomSelectors.createBtn.setAttribute('disabled', true);

      inputDomSelectors.title.setAttribute('disabled', true);
      inputDomSelectors.description.setAttribute('disabled', true);
      inputDomSelectors.label.setAttribute('disabled', true);
      inputDomSelectors.points.setAttribute('disabled', true);
      inputDomSelectors.assignee.setAttribute('disabled', true);

      const id = this.parentElement.parentElement.getAttribute('id');
      otherDomSelectors.taskId.value = id;
  }

  function deleteTaskHandler() {
    const id = otherDomSelectors.taskId.value;
    const element = document.getElementById(id);
    element.remove();

    calcPoints -= Number(inputState.points);

    otherDomSelectors.createBtn.removeAttribute('disabled');
    otherDomSelectors.deleteBtn.setAttribute('disabled', true);

    inputDomSelectors.title.removeAttribute('disabled');
    inputDomSelectors.description.removeAttribute('disabled');
    inputDomSelectors.label.removeAttribute('disabled');
    inputDomSelectors.points.removeAttribute('disabled');
    inputDomSelectors.assignee.removeAttribute('disabled');

    clearAllInputs();
    otherDomSelectors.totalPoints.textContent = `Total Points ${calcPoints}pts`;
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