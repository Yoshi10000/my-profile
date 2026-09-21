import './style.css';

document.querySelector('#app').innerHTML = `
  <main class="counter">
    <h1>カウンター</h1>
    <p id="count">0</p>
    <div class="buttons">
      <button id="increase-btn">増やす</button>
      <button id="decrease-btn">減らす</button>
      <button id="reset-btn">リセット</button>
    </div>
  </main>
`;

const countEl = document.querySelector('#count');
let count = 0;

document.querySelector('#increase-btn').addEventListener('click', () => {
  count += 1;
  countEl.textContent = count;
});

document.querySelector('#decrease-btn').addEventListener('click', () => {
  count -= 1;
  countEl.textContent = count;
});

document.querySelector('#reset-btn').addEventListener('click', () => {
  count = 0;
  countEl.textContent = count;
});