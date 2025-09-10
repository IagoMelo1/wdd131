// References to input, button and list
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// Add click event listener to button
button.addEventListener('click', function () {
    const value = input.value.trim();

    if (value !== '') {
        // Create list item
        const li = document.createElement('li');
        li.textContent = value;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete');

        // Add event listener to delete button
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        // Mount li
        li.append(deleteButton);
        list.append(li);

        // Clear input
        input.value = '';
        input.focus();
    } else {
        alert('Please enter a chapter before adding!');
        input.focus();
    }
});
