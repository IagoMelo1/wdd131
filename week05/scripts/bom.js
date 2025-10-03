// References to input, button and list
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// State: load from localStorage or empty array
let chaptersArray = getChapterList() || [];

// Render existing list
chaptersArray.forEach(chapter => {
    displayList(chapter);
});

// Button click
button.addEventListener('click', () => {
    const value = input.value.trim();

    if (value !== '') {
        displayList(value);           // render in DOM
        chaptersArray.push(value);    // add to array
        setChapterList();             // persist in localStorage
        input.value = '';             // clear input
        input.focus();                // focus back
    } else {
        input.focus();
    }
});

// Enter key also adds
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') button.click();
});

// Display a list item with delete button
function displayList(item) {
    const li = document.createElement('li');
    li.textContent = item;

    const deletebutton = document.createElement('button');
    deletebutton.textContent = 'X';
    deletebutton.classList.add('delete');

    li.append(deletebutton);
    list.append(li);

    // Delete button removes item
    deletebutton.addEventListener('click', function () {
        list.removeChild(li);
        deleteChapter(li.textContent);  // "Alma 5X"
        input.focus();
    });
}

// Save array to localStorage
function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

// Get array from localStorage
function getChapterList() {
    const raw = localStorage.getItem('myFavBOMList');
    return raw ? JSON.parse(raw) : null;
}

// Delete chapter from array and update storage
function deleteChapter(chapter) {
    // remove the last character ("X") and trailing spaces
    chapter = chapter.slice(0, chapter.length - 1).trimEnd();

    // filter out the deleted one
    chaptersArray = chaptersArray.filter(item => item !== chapter);

    // update localStorage
    setChapterList();
}
