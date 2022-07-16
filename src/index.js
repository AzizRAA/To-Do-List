import './style.css';

class toDo {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

let abc = [];
const sendToLocalStorage = () => {
  localStorage.setItem('list', JSON.stringify(abc));
};

const main = document.querySelector('main');
main.innerHTML = `
  <div class="head">
    <h1 class="title">Today's To Do</h1>
    <form class="form">
      <input class="todos" type="text" placeholder="Add to your list..." required/>
    </form>
    <p class="remove">Clear all completed</p>
  </div>`;

// Lists

const createList = () => {

  const form = document.querySelector('.form');
  const lists = document.createElement('div');
  lists.className = 'listInput';
  form.appendChild(lists);
  const inputBox = document.createElement('input');
  inputBox.className = 'input';
  inputBox.type = 'checkbox';
  const listsText = document.createElement('p');
  listsText.className = 'listTask';
  const dots = document.createElement('i');
  dots.className = 'far fa-ellipsis-v';
  const trash = document.createElement('i');
  trash.className = 'far fa-trash-alt logo';
  lists.append(inputBox, listsText, trash, dots);
  let count = 1;
  inputBox.addEventListener('click', () => {
    
    dots.classList.toggle('remove-icon-active');
    trash.classList.toggle('logo');
    listsText.classList.toggle('listTask-disable');
    lists.classList.toggle('backEdit');

    const bring = JSON.parse(localStorage.getItem('list'));
    const zero = [];
    const allL = document.querySelectorAll('.listInput');

    for (let i = 0; i < bring.length; i += 1) {
      if (allL[i].classList.contains('backEdit')) {
        bring[i].completed = true;
        count += 1;
      } else {
        bring[i].completed = false;
      }
      zero.push(bring[i]);
      localStorage.setItem('list', JSON.stringify(zero));
    }
  });

//deleteAll

  const deleteInput = document.querySelector('.remove');
  deleteInput.addEventListener('click', () => {
    const bring = JSON.parse(localStorage.getItem('list'));
    const lib = document.querySelectorAll('.backEdit');

    for (let i = 0; i < lib.length; i += 1) {
      form.removeChild(lib[i]);
    }
    const zero = [];
    for (let i = 0; i < bring.length; i += 1) {

      if (bring[i].completed === true) {
        continue;
      }
      zero.push(bring[i]);
    }
    localStorage.setItem('list', JSON.stringify(zero));
  });

  // Remove
  
  trash.addEventListener('click', () => {

    form.removeChild(lists);
    const getFromLocalStorage = JSON.parse(localStorage.getItem('list'));
    const result = getFromLocalStorage.filter((word) => word.description === listsText.textContent);
    const zero = [];

    for (let i = 0; i < getFromLocalStorage.length; i += 1) {

      if (result[0].description === getFromLocalStorage[i].description) {
        continue;
      }
      zero.push(getFromLocalStorage[i]);
    }
    localStorage.setItem('list', JSON.stringify(zero));
  });

  dots.addEventListener('click', () => {
    const boxEdit = document.createElement('input');
    boxEdit.type = 'text';
    boxEdit.className = 'listTask';
    boxEdit.style.backgroundColor = 'yellow';
    lists.style.backgroundColor = 'yellow';
    boxEdit.value = listsText.textContent;
    lists.replaceChild(boxEdit, listsText);
    boxEdit.addEventListener('keypress', (e) => {

      if (e.key === 'Enter' && boxEdit.value) {

        const bring = JSON.parse(localStorage.getItem('list'));
        const result = bring.filter((word) => word.description === listsText.textContent);
        const zero = [];

        for (let i = 0; i < bring.length; i += 1) {
          if (bring[i].index === result[0].index) {
            bring[i].description = boxEdit.value;
          }
          zero.push(bring[i]);
          localStorage.setItem('list', JSON.stringify(zero));
        }
        lists.replaceChild(listsText, boxEdit);
        listsText.textContent = boxEdit.value;
        lists.style.backgroundColor = 'white';
      }
    });
  });
};

const todos = document.querySelector('.todos');
todos.addEventListener('keypress', (e) => {

  if (e.key === 'Enter' && todos.value) {

    const arr = new toDo(todos.value, false, abc.length);
    abc.push(arr);
    e.preventDefault();
    createList();
    const listsText = document.querySelectorAll('.listTask');

    for (let i = 0; i < abc.length; i += 1) {
      listsText[i].textContent = abc[i].description;
    }
    todos.value = null;
    sendToLocalStorage();
  }
});


window.addEventListener('load', () => {

  const getFromLocalStorage = JSON.parse(localStorage.getItem('list'));
  for (let i = 0; i < getFromLocalStorage.length; i += 1) {
    createList();

    const listsText = document.querySelectorAll('.listTask');
    listsText[i].textContent = getFromLocalStorage[i].description;
    if (getFromLocalStorage[i].completed === true) {
      getFromLocalStorage[i].completed = false;
    }
    localStorage.setItem('list', JSON.stringify(getFromLocalStorage));
    abc = getFromLocalStorage;
  }
});
