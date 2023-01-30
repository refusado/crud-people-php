const BASE_URL      = 'http://localhost/people-crud/api/';

const deleteAllBtn      = document.getElementById('delete-btn');
const deleteAllAlert    = document.getElementById('delete-alert');
const deleteAllConfirm  = document.getElementById('delete-confirm');
const deleteAllCancel   = document.getElementById('delete-cancel');

const table       = document.getElementById('bodyTable');
const countSpan   = document.getElementById('personsCount');

const createForm  = document.getElementById('crudForm');
const nameInput   = document.getElementById('nameInput');
const ageInput    = document.getElementById('ageInput');

const updateBox     = document.getElementById('update-container');
const updateForm    = document.getElementById('update-form');
const newNameInput  = document.getElementById('nameUpdateInput');
const newAgeInput   = document.getElementById('ageUpdateInput');
const uptaderId     = document.getElementById('updateId');

deleteAllBtn.addEventListener("click", () => {
    const isHidden = deleteAllAlert.classList.contains("d-none");

    if (isHidden) {
        deleteAllAlert.classList.remove("d-none")
    } else {
        deleteAllAlert.classList.add("unpop");
        
        setTimeout(() => {
            deleteAllAlert.classList.add("d-none");
            deleteAllAlert.classList.remove("unpop");
        }, 300);
    }
});

deleteAllCancel.addEventListener("click", () => {
    deleteAllAlert.classList.add("unpop");
    
    setTimeout(() => {
        deleteAllAlert.classList.add("d-none");
        deleteAllAlert.classList.remove("unpop");
    }, 300);
});

deleteAllConfirm.addEventListener("click", () => {
    deleteAllAlert.classList.add("unpop");
    
    setTimeout(() => {
        deleteAllAlert.classList.add("d-none");
        deleteAllAlert.classList.remove("unpop");
    }, 300);

    countPersons().then((personsNo) => {
        if (personsNo) {
            readPersons()
                .then(persons => {
                    persons.forEach(person => removeTableRow(person.id))
                });
        }
    });
});

createForm.addEventListener('submit', e => {
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
            newColumn.classList.add('person__actions');

            const deletePersonBtn = document.createElement('button');
            deletePersonBtn.classList.add("btn", "btn-danger", "delete-user-btn");

            deletePersonBtn.innerHTML = '<i class="bi bi-trash"></i>';
            deletePersonBtn.id = `delete-${id}`;
            deletePersonBtn.title = `Remove person ${id}`;
            deletePersonBtn.addEventListener('click', () => {
                newRow.classList.toggle('unpop');
                
                setTimeout(() => {
                    removeTableRow(id);
                }, 300);
            });

            newColumn.appendChild(deletePersonBtn);
            
            const updatePersonBtn = document.createElement('button');
            updatePersonBtn.classList.add("btn", "btn-primary", "edit-user-btn");

            updatePersonBtn.innerHTML = 'Update';
            updatePersonBtn.id = `update-${id}`;
            updatePersonBtn.title = `Update person ${id}`;
            updatePersonBtn.addEventListener('click', () => {
                console.log(id, 'to update');
                updateBox.classList.remove('d-none');

                newNameInput.value = name;
                newAgeInput.value = age;
                uptaderId.value = id;
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

updateForm.addEventListener('submit', e => {
    e.preventDefault();
    updateBox.classList.add('d-none');

    const newName = newNameInput.value || "Default";
    const newAge = newAgeInput.value || 0;
    const register = uptaderId.value || 0;

    console.log("novo nome: ", newName);
    console.log("nova idade: ", newAge);
    console.log("id do registro: ", register);

    if (register) {
        updatePerson(register, newName, newAge)
            .then(() => updateTable());
    }
});

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