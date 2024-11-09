// Kad se stranica ucita

document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById('add-item');
    const mainHeading = document.getElementById('main-heading');

    // Odvajanje naslova na zasebne reci
    mainHeading.classList.add('hidden');
    setTimeout(() => {
        mainHeading.classList.add('separated');
        mainHeading.textContent = 'YOUR TO DO LIST';
        mainHeading.classList.remove('hidden');
        mainHeading.classList.add('split', 'fade-in');
    }, 3000); // 3000 = 3s

    const dateInput = document.getElementById('date');
    const today = new Date();
    // posto Date() vraca datum i vreme
    // split('T')[0] uzima samo datum
    const formattedDate = today.toISOString().split('T')[0];

    // datum ne moze da bude ispod danasnjeg
    dateInput.setAttribute('min', formattedDate);

    if (addButton) {
        addButton.addEventListener('click', addItem);
    }

    loadItems();
});

function loadItems() {
    // 'items' je kljuc koji cuva ceo objekat ili niz
    // JSON.parse pretvara JSON string u js objekat ili niz

    // items je objekat koji cuva sve podatke iz localStorage
    let items = JSON.parse(localStorage.getItem('items')) || [];
    const itemListContainer = document.getElementById('item-list');
    itemListContainer.innerHTML = '';

    items = items.filter(item => new Date(item.date) >= new Date('1970-01-01'));


    // cuvamo podatke u localStorage kao stringove
    localStorage.setItem('items', JSON.stringify(items));

    items.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const itemContentDiv = document.createElement('div');
        itemContentDiv.className = 'item-content';

        // dodajemo checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = "check";
        checkbox.checked = item.completed;
        checkbox.disabled = item.completed;
        itemContentDiv.appendChild(checkbox);

        // cuvamo sliku u promenljivu
        const dateImg = document.createElement('img');
        dateImg.className = 'date-img';
        dateImg.src = 'images/calendar.png';

        const divDate = document.createElement('div');
        divDate.className = 'div-date';

        // dodajemo naziv zadatka
        const itemText = document.createElement('span');
        itemText.textContent = item.text;
        itemText.className = item.completed ? 'completed' : 'text';
        itemContentDiv.appendChild(itemText);

        // dodajemo datum u obliku mesec dan, godina
        const itemDate = document.createElement('span');
        const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        itemDate.textContent = formattedDate; 
        divDate.appendChild(dateImg);
        divDate.appendChild(itemDate);

        itemContentDiv.appendChild(divDate);

        const buttonContainerDiv = document.createElement('div');
        buttonContainerDiv.className = 'button-container';

        // Dodajemo edit dugme
        const buttonEdit = document.createElement('button');
        buttonEdit.textContent = 'Edit';
        buttonEdit.className = 'edit';
        buttonEdit.addEventListener('click', () => editItem(index, itemText));


        // Dodajemo done dugme
        const buttonDone = document.createElement('button');
        buttonDone.textContent = 'Done';
        buttonDone.className = 'done';
        buttonDone.disabled = item.completed;
        buttonDone.addEventListener('click', () => {
            itemText.style.textDecoration = 'line-through';
            items[index].completed = true;
            // update-ujemo podatke u localStorage
            // da bismo iznacili da je zadatak zavrsen
            localStorage.setItem('items', JSON.stringify(items));
            checkbox.disabled = true;
            buttonDone.disabled = true;
        });


        // Dodajemo delete dugme
        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';
        buttonDelete.className = 'delete';
        buttonDelete.addEventListener('click', () => deleteItem(index));

        buttonContainerDiv.appendChild(buttonDone);
        buttonContainerDiv.appendChild(buttonEdit);
        buttonContainerDiv.appendChild(buttonDelete);
        itemDiv.appendChild(itemContentDiv);
        itemDiv.appendChild(buttonContainerDiv);
        itemListContainer.appendChild(itemDiv);
    });

    localStorage.setItem('items', JSON.stringify(items));
}


function addItem() {
    const input = document.getElementById('item-input');
    const dateInput = document.getElementById('date');
    const newItemText = input.value.trim();
    
    const newItemDate = dateInput.value.trim() !== "" ? dateInput.value : new Date().toISOString().split('T')[0];

    // ako smo uneli i naziv zadatka i datum
    if (newItemText && newItemDate) {
        // dohvatamo podatke iz localStorage
        const items = JSON.parse(localStorage.getItem('items')) || [];
        // dodajemo novi objekat u items
        items.push({ text: newItemText, date: newItemDate, completed: false });
        // update-ujemo localStorage
        localStorage.setItem('items', JSON.stringify(items));
        
        // kad kliknemo na dugme polja treba da se resetuju
        input.value = '';
        dateInput.value = '';
        
        // ucitavamo dodat zadatak
        loadItems(); 
    }
}

function editItem(index, itemText) {
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // dohvatamo onaj zadatak koji zelimo da editujemo
    const item = items[index];

    // Polje za ime zadatka
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = item.text;
    inputField.className = 'edit-input';

    // Polje za datum
    const dateField = document.createElement('input');
    dateField.type = 'date';
    dateField.value = item.date;
    dateField.className = 'edit-date';

    const today = new Date().toISOString().split('T')[0];
    dateField.setAttribute('min', today);

    // Ok dugme
    const okButton = document.createElement('button');
    okButton.textContent = 'OK';
    okButton.className = 'ok';

    // Cancel dugme
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.className = 'cancel';

    okButton.addEventListener('click', () => {
        // Brisemo sve razmake sa pocetka i kraja naziva
        const newText = inputField.value.trim();
        const newDate = dateField.value;

        // Ako su oba postavljena
        if (newText && newDate) {
            // update-ujemo vrednosti
            item.text = newText;
            item.date = newDate;

            // update-ujemo sam zadatak
            items[index] = item;
            // cuvamo promene
            localStorage.setItem('items', JSON.stringify(items));
            // prikazujemo zadatke
            loadItems(); 
        }
    });

    cancelButton.addEventListener('click', () => {
        loadItems(); 
    });

    const parentDiv = itemText.parentNode;
    parentDiv.innerHTML = ''; 

    parentDiv.appendChild(inputField);
    parentDiv.appendChild(dateField);
    parentDiv.appendChild(okButton);
    parentDiv.appendChild(cancelButton);
}

function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // uklanja se 1 element pocev od indeksa index
    // znaci uklanja se samo element sa indeksom index
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
    loadItems();
}


// Funkcija za brisanje zastarelih zadataka
// Dohvata trenutne zadatke
let items = JSON.parse(localStorage.getItem('items')) || [];

// Dohvati poslednji datum filtriranja iz localStorage
let lastFilterDate = localStorage.getItem('lastFilterDate');

// Priprema trenutnog datuma
const now = new Date();
const todayDate = now.toISOString().split('T')[0]; // samo "YYYY-MM-DD"

// Ako se zadaci još nisu filtrirali danas, filtriraj ih sada
if (lastFilterDate !== todayDate) {
    items = items.filter(item => {
        const taskDate = new Date(item.date);
        return taskDate >= now; // Zadrži zadatke čiji rok nije prošao
    });

    // Ažuriraj filtrirane zadatke i datum filtriranja
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('lastFilterDate', todayDate);
}


