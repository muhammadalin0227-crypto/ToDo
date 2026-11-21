const input = document.getElementById('input');
const addBtn = document.getElementById('addbtn');
const showtask = document.getElementById('showtask');
const cardcontener = document.querySelector('.cardcontener');
const close = document.getElementById('close');

const Shome = document.getElementById('home');
const SupdateInput = document.getElementById('updateInput');
const closeupdateInput = document.getElementById('closeupdateInput');

const updateInputvalue = document.getElementById('update');
const updatebtnn = document.getElementById('inputbtn');
const message = document.getElementById('message');


addBtn.onclick = () => {
  let inputvalue = input.value;
  if (inputvalue.trim() === "") {
    return;
  }

  let newcard = document.createElement('card');
  newcard.classList.add('newcard');
  let task = document.createElement('p');
  task.textContent = inputvalue;
  let close = document.createElement('i');
  close.classList.add('fa-solid', 'fa-xmark')
  
  

  close.onclick = () => {
    newcard.remove();
    updatebtn.remove();
    message.innerText="Deleted";
    message.style.display='block';
    setTimeout(()=>{
      message.style.display="";
    },2000)
  };


  let updatebtn = document.createElement("button");
  updatebtn.classList.add('updateBtn');
  updatebtn.textContent = 'Update';

  let radio = document.createElement('input');
  radio.classList.add('complete');
  radio.type = 'checkbox';



  updatebtn.onclick = () => {
    SupdateInput.style.display = 'flex';
    Shome.style.display = 'none';

    closeupdateInput.onclick = () => {
      Shome.style.display = 'block';
      SupdateInput.style.display = 'none';
    }
  }

  updatebtnn.onclick = () => {
    let updateinvalue = updateInputvalue.value;
    if (updateinvalue.trim() === "") {
      returen;
    }
    task.textContent = updateinvalue;

    updateInputvalue.value = "";
    Shome.style.display = 'block';
    SupdateInput.style.display = 'none';
    
    
    
    message.innerText="change sucssesfully";
    message.style.display='block';
    setTimeout(()=>{
      message.style.display="";
    },2000)
    
    
  }


  cardcontener.appendChild(newcard);
  cardcontener.appendChild(updatebtn);
  newcard.appendChild(radio);
  newcard.appendChild(task);
  newcard.appendChild(close);
  
 
  cardcontener.style.display = 'flex';
  input.value = "";

}





