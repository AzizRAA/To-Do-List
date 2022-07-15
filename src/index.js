import './style.css'

const main = document.querySelector('main');
main.innerHTML = `
  <div class="head">
    <h1 class="title">Today's To Do</h1>
    <form class="form">
      <input class="todos" type="text" placeholder="Add to your list..." required/>
    </form>
    <p class="delete">Clear all completed</p>
  </div>
`;
