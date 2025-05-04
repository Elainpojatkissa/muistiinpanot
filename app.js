const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note');
const notesList = document.getElementById('notes-list');
const searchInput = document.getElementById('search-input');
const toggleThemeButton = document.getElementById('toggle-theme');
const languageSelector = document.getElementById('language-selector');
const appTitle = document.getElementById('app-title');

// Kielivalinnat
const languages = {
  fi: {
    addNote: 'Lisää',
    searchPlaceholder: 'Hae muistiinpanoista',
    toggleTheme: 'Vaihda Tumman Tilaan',
    appTitle: 'Muistiinpanot',
    deleteNote: 'Poista',
  },
  en: {
    addNote: 'Add',
    searchPlaceholder: 'Search notes',
    toggleTheme: 'Toggle Dark Mode',
    appTitle: 'Notes',
    deleteNote: 'Delete',
  }
};

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let isDarkMode = false;
let currentLang = 'fi'; // Default language
renderNotes();

// Vaihda kieli
languageSelector.addEventListener('change', (e) => {
  currentLang = e.target.value;
  updateLanguage();
});

// Lisää muistiinpano
addNoteButton.addEventListener('click', () => {
  const text = noteInput.value.trim();
  if (text !== '') {
    notes.push(text);
    saveNotes();
    renderNotes();
    noteInput.value = '';
  }
});

// Haku muistiinpanoista
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  const filteredNotes = notes.filter(note => note.toLowerCase().includes(searchText));
  renderNotes(filteredNotes);
});

// Tumman tilan vaihto
toggleThemeButton.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
});

// Päivitä kieli
function updateLanguage() {
  appTitle.textContent = languages[currentLang].appTitle;
  addNoteButton.textContent = languages[currentLang].addNote;
  searchInput.placeholder = languages[currentLang].searchPlaceholder;
  toggleThemeButton.textContent = languages[currentLang].toggleTheme;
}

// Renderöi muistiinpanot
function renderNotes(filteredNotes = notes) {
  notesList.innerHTML = '';
  filteredNotes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = languages[currentLang].deleteNote;
    deleteButton.addEventListener('click', () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    li.appendChild(deleteButton);
    notesList.appendChild(li);
  });
}

// Tallenna muistiinpanot
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}
