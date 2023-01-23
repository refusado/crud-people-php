const BASE_URL      = 'http://localhost/people-crud/api/';

// const updateBtn   = document.getElementById('btnUpdate');
const deleteBtn   = document.getElementById('btnDelete');

const table       = document.getElementById('bodyTable');
const countSpan   = document.getElementById('personsCount');

const form        = document.getElementById('crudForm');
const nameInput   = document.getElementById('nameInput');
const ageInput    = document.getElementById('ageInput');

// updateBtn.addEventListener('click', () => {
//     updatePerson(7, 'Carlos Drumond', 73);
//     updateTable();
// });

deleteBtn.addEventListener("click", () => {
    countPersons().then((personsNo) => {
        if (personsNo) {
            readPersons().then((persons) => {
                const lastPerson = persons[0].id;

                for (let i = lastPerson - personsNo; i <= lastPerson; i++) {
                    deletePerson(i).then(updateTable);
                }
            });
        }
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = nameInput.value;
    const age   = ageInput.value;
    
    if (name && age) {
        createPerson(name, age).then(() => {
            // nameInput.value = '';
            // ageInput.value   = '';

            updateTable();
        });
    }
})


updateTable();

function updateTable() {
    readPersons()
        .then(data => {
            while (table.firstChild) table.removeChild(table.firstChild);

            data.forEach(e => createTableLine(e.id, e.name, e.age))
        })

    countPersons()
        .then(number => countSpan.textContent = number)
}

function createTableLine(id, name, age) {
    const params = [id, name, age];

    const line = document.createElement('tr');
    params.forEach(e => {
        const col = document.createElement('td');
        const content = document.createTextNode(e);;
        line.appendChild(col);
        col.appendChild(content);
        table.appendChild(line);
    });
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