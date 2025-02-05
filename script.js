// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const joinWaitingListBtn = document.getElementById('join-waiting-list');
const grabGiftBtn = document.getElementById('grab-gift');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const waitingListForm = document.getElementById('waitingListForm');
const submissionMessage = document.getElementById('submission-message');
const question3 = document.getElementById('question3');
const buyingMethodContainer = document.getElementById('buyingMethodContainer');

// Dark/Light Mode Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️'; // Sun icon for light mode
  } else {
    themeToggle.textContent = '🌙'; // Moon icon for dark mode
  }
});

// Show Modal on Button Click
joinWaitingListBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

// Close Modal on Button Click
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Close Modal on Click Outside the Modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

// Open PDF on Button Click
grabGiftBtn.addEventListener('click', () => {
  window.open('gift.pdf', '_blank');
});

// Conditional Question Logic
question3.addEventListener('change', () => {
  if (question3.value === 'yes') {
    buyingMethodContainer.classList.remove('hidden');
  } else {
    buyingMethodContainer.classList.add('hidden');
  }
});

// Form Submission
waitingListForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    personalizedCV: document.getElementById('question1').value,
    moreInterviews: document.getElementById('question2').value,
    payForTool: document.getElementById('question3').value,
    buyingMethod: document.getElementById('buyingMethod').value,
  };

  try {
    // Save to Firebase
    await addDoc(collection(db, 'waitingList'), formData);
    modal.classList.add('hidden'); // Hide the modal
    submissionMessage.classList.remove('hidden'); // Show the submission message
  } catch (error) {
    console.error('Error submitting form: ', error);
  }
});
