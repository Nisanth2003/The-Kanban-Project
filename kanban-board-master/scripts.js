// Drag and drop functionality
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

cards.forEach(card => {
  card.addEventListener('dragstart', dragstart);
  card.addEventListener('dragend', dragend);

  const editBtn = card.querySelector('.edit-btn');
  const deleteBtn = card.querySelector('.delete-btn');//to make it select the html class

  editBtn.addEventListener('click', editCard);
  deleteBtn.addEventListener('click', deleteCard);

  // Enable editing content directly on click
  const content = card.querySelector('.content');
  content.addEventListener('click', function() {
    // Create a textarea for editing
    const textArea = document.createElement('textarea');
    textArea.value = content.textContent;
    textArea.classList.add('edit-content');
    content.innerHTML = '';
    content.appendChild(textArea);
    textArea.focus();

    textArea.addEventListener('blur', function() {  // for text editing purpose
      content.innerHTML = textArea.value;
    });
  });
});

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', dragover);//on top 
  dropzone.addEventListener('dragleave', dragleave);//taking it out
  dropzone.addEventListener('drop', drop);//taking in 
});

// Function to create a new card
function createCard() {

  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.setAttribute('draggable', 'true');

  newCard.style.backgroundColor = randomColor();

  newCard.innerHTML = `
    <div id = "random" class="status green"></div>
    <div class="content">New card</div>
    
    <div class="actions">
      <button class="edit-btn">✏️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;
  return newCard;
}

// Adding event listeners for add card buttons here
const addCardBtns = document.querySelectorAll('.add-card-btn');
addCardBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const dropzone = btn.previousElementSibling;
    const newCard = createCard();
    dropzone.appendChild(newCard);
    addCardEventListeners(newCard); // Adding event listeners for the newly created card
  });
});

// Function to add event listeners to a newly created card
function addCardEventListeners(card) {
  card.addEventListener('dragstart', dragstart);
  card.addEventListener('dragend', dragend);

  const editBtn = card.querySelector('.edit-btn');
  const deleteBtn = card.querySelector('.delete-btn');

  editBtn.addEventListener('click', editCard);
  deleteBtn.addEventListener('click', deleteCard);

  const content = card.querySelector('.content');
  content.addEventListener('click', function() {
    const textArea = document.createElement('textarea');
    textArea.value = content.textContent;
    textArea.classList.add('edit-content');
    content.innerHTML = '';
    content.appendChild(textArea);
    textArea.focus();

    textArea.addEventListener('blur', function() {
      content.innerHTML = textArea.value;
    });
  });
}

function dragstart() {
  dropzones.forEach(dropzone => dropzone.classList.add('highlight'));
  this.classList.add('is-dragging');
}

function dragend() {
  dropzones.forEach(dropzone => dropzone.classList.remove('highlight'));
  this.classList.remove('is-dragging');
}

function dragover(event) {
  event.preventDefault();
  this.classList.add('over');
  const cardBeingDragged = document.querySelector('.is-dragging');
  this.appendChild(cardBeingDragged);
}

function dragleave() {
  this.classList.remove('over');
}

function drop() {
  this.classList.remove('over');
}


function editCard(event) {
  const card = event.target.closest('.card');
  const contentElement = card.querySelector('.content');
  const textArea = document.createElement('textarea');
  textArea.value = contentElement.textContent;
  contentElement.innerHTML = '';
  contentElement.appendChild(textArea);
  textArea.focus();

  textArea.addEventListener('blur', function() {
    contentElement.innerHTML = textArea.value;
  });
}

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}