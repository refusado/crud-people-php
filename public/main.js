const BASE_URL      = 'http://localhost/people-crud/api/';

const deleteAllBtn      = document.getElementById('delete-btn');
const deleteAllAlert    = document.getElementById('delete-alert');
const deleteAllConfirm  = document.getElementById('delete-confirm');
const deleteAllCancel   = document.getElementById('delete-cancel');

const table       = document.getElementById('bodyTable');
const countSpan   = document.getElementById('personsCount');

const form        = document.getElementById('crudForm');
const nameInput   = document.getElementById('nameInput');
const ageInput    = document.getElementById('ageInput');

// updateBtn.addEventListener('click', () => {
//     updatePerson(7, 'Carlos Drumond', 73);
//     updateTable();
// });

deleteAllBtn.addEventListener("click", () => {
    deleteAllAlert.classList.toggle("hidden");
});

deleteAllCancel.addEventListener("click", () => {
    deleteAllAlert.classList.add("hidden");
});

deleteAllConfirm.addEventListener("click", () => {
    deleteAllAlert.classList.add("hidden");

    countPersons().then((personsNo) => {
        if (personsNo) {
            readPersons()
                .then(persons => persons
                .forEach(person => removeTableRow(person.id)));
        }
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = nameInput.value || "Default";
    const age   = ageInput.value || 0;
    
    createPerson(name, age).then((response) => {
        nameInput.value = '';
        ageInput.value   = '';

        const { id, name, age } = response[0];
        createTableRow(id, name, age);
        countSpan.innerText++;
    });
})

function createTableRow(id, name, age) {
    const newRow = document.createElement('tr');
    newRow.id = `person-${id}`;
    
    const parameters = [id, name, age];

    let newColumn;
    parameters.push(0);
    parameters.map((value, index, arr) => {
        if (index == arr.length - 1) {
            newColumn = document.createElement('td');

            const deletePersonBtn = document.createElement('button');
            deletePersonBtn.classList.add("btn", "btn-danger", "delete-user-btn");

            deletePersonBtn.innerText = "delete";
            deletePersonBtn.id = `delete-${id}`;
            deletePersonBtn.addEventListener('click', () => {
                console.log(id, 'to delete');
            });

            newColumn.appendChild(deletePersonBtn);
            
            const updatePersonBtn = document.createElement('button');
            updatePersonBtn.classList.add("btn", "btn-primary", "edit-user-btn");

            updatePersonBtn.innerText = "edit";
            updatePersonBtn.id = `update-${id}`;
            updatePersonBtn.addEventListener('click', () => {
                console.log(id, 'to update');
            });

            newColumn.appendChild(updatePersonBtn);
        } else {
            if (value == id) {
                newColumn = document.createElement('th');
            } else {
                newColumn = document.createElement('td');
            }
            newColumn.innerText = value;
        }

        newRow.appendChild(newColumn);
    });

    table.appendChild(newRow);
}

function removeTableRow(id) {
    const rowToDelete = document.getElementById(`person-${id}`);

    if (rowToDelete) {
        table.removeChild(rowToDelete);
        deletePerson(id)
            .then(() => countSpan.innerText--);
    }
}

function updateTable() {
    readPersons()
        .then(data => {
            while (table.firstChild) table.removeChild(table.firstChild);

            data.forEach(e => createTableRow(e.id, e.name, e.age))
        })

    countPersons()
        .then(number => countSpan.textContent = number)
}



async function createPerson(name, age) {
    const result = await fetch(`${BASE_URL}?fn=create&name=${name}&age=${age}`)
        .then(response => response.json())
        .then(data => data.person);

    return result;
}

async function readPersons() {
    const result = await fetch(`${BASE_URL}?fn=read`)
        .then(response => response.json())
        .then(data => data.person);

    return result;
}

async function updatePerson(id, name, age) {
    const result = await fetch(`${BASE_URL}?fn=update&name=${name}&age=${age}&id=${id}`)
        .then(response => response.json())
        .then(data => data.person);

    return result;
}

async function deletePerson(id) {
    const result = await fetch(`${BASE_URL}?fn=delete&id=${id}`)
        .then(response => response.json())
        .then(data => data.person);

    return result;
}

async function countPersons() {
    const result = await fetch(`${BASE_URL}?fn=count`)
        .then(response => response.json())
        .then(data => +data.totalPersons);

    return result;
}



updateTable();