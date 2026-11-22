const input = document.getElementById('input');
const addBtn = document.getElementById('addbtn');
const showtask = document.getElementById('showtask');
const cardcontener = document.querySelector('.cardcontener');
const closeBtn = document.getElementById('close');

const Shome = document.getElementById('home');
const SupdateInput = document.getElementById('updateInput');
const closeupdateInput = document.getElementById('closeupdateInput');

const updateInputvalue = document.getElementById('update');
const updatebtnn = document.getElementById('inputbtn');
const message = document.getElementById('message');

// ====== LocalStorage سے ڈیٹا لوڈ کرو ======
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingId = null; // کون سا کارڈ اپڈیٹ ہو رہا ہے

// ====== ڈیٹا محفوظ کرو ======
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ====== میسج دکھاؤ ======
function showMessage(text) {
  message.innerText = text;
  message.style.display = 'block';
  setTimeout(() => {
    message.style.display = 'none';
  }, 2000);
}

// ====== کارڈ بناؤ اور دکھاؤ ======
function renderTasks() {
  cardcontener.innerHTML = ''; // صاف کرو

  tasks.forEach((taskObj) => {
    let newcard = document.createElement('div');
    newcard.classList.add('newcard');

    let radio = document.createElement('input');
    radio.classList.add('complete');
    radio.type = 'checkbox';
    radio.checked = taskObj.completed || false;

    let task = document.createElement('p');
    task.textContent = taskObj.text;
    if (taskObj.completed) {
      task.style.textDecoration = 'line-through';
      task.style.opacity = '0.6';
    }

    let closeIcon = document.createElement('i');
    closeIcon.classList.add('fa-solid', 'fa-xmark');

    let updatebtn = document.createElement('button');
    updatebtn.classList.add('updateBtn');
    updatebtn.textContent = 'Update';

    // ====== چیک باکس ======
    radio.onchange = () => {
      taskObj.completed = radio.checked;
      task.style.textDecoration = radio.checked ? 'line-through' : 'none';
      task.style.opacity = radio.checked ? '0.6' : '1';
      saveTasks();
    };

    // ====== ڈیلیٹ ======
    closeIcon.onclick = () => {
      tasks = tasks.filter(t => t.id !== taskObj.id);
      saveTasks();
      renderTasks();
      showMessage('Deleted');
    };

    // ====== اپڈیٹ بٹن ======
    updatebtn.onclick = () => {
      editingId = taskObj.id;
      updateInputvalue.value = taskObj.text;
      SupdateInput.style.display = 'flex';
      Shome.style.display = 'none';
    };

    newcard.appendChild(radio);
    newcard.appendChild(task);
    newcard.appendChild(closeIcon);
    newcard.appendChild(updatebtn);
    cardcontener.appendChild(newcard);
  });

  cardcontener.style.display = tasks.length > 0 ? 'flex' : '';
}

// ====== نیا کام شامل کرو ======
addBtn.onclick = () => {
  let inputvalue = input.value;
  if (inputvalue.trim() === '') return;

  tasks.push({
    id: Date.now(),
    text: inputvalue,
    completed: false
  });

  saveTasks();
  renderTasks();
  input.value = '';
  showMessage('Task added');
};

// ====== اپڈیٹ پاپ اپ بند ======
closeupdateInput.onclick = () => {
  Shome.style.display = 'block';
  SupdateInput.style.display = 'none';
  editingId = null;
};

// ====== اپڈیٹ محفوظ کرو (صرف ایک بار) ======
updatebtnn.onclick = () => {
  let updateinvalue = updateInputvalue.value;
  if (updateinvalue.trim() === '') return;
  if (editingId === null) return;

  let taskObj = tasks.find(t => t.id === editingId);
  if (taskObj) {
    taskObj.text = updateinvalue;
    saveTasks();
    renderTasks();
    showMessage('Change successfully');
  }

  updateInputvalue.value = '';
  Shome.style.display = 'block';
  SupdateInput.style.display = 'none';
  editingId = null;
};

// ====== صفحہ لوڈ ہونے پر پرانے کارڈز دکھاؤ ======
renderTasks();
