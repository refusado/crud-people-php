const BASE_URL = 'http://localhost/people-crud/api/';

const createBtn = document.getElementById('btnCreate');
const readBtn = document.getElementById('btnRead');
const updateBtn = document.getElementById('btnUpdate');
const deleteBtn = document.getElementById('btnDelete');

const table = document.getElementById('bodyTable');

function createTableLine(id, name, age) {
    const PARAM = [id, name, age];

    const line = document.createElement('tr');
    PARAM.forEach(e => {
        const col = document.createElement('td');
        const content = document.createTextNode(e);;
        line.appendChild(col);
        col.appendChild(content);
        table.appendChild(line);
    });
}

createTableLine(63, 'arroz', 139);

createBtn.addEventListener('click', () => {
    createPerson('Marcos Vilela', 51);
});

readBtn.addEventListener('click', readPersons);

updateBtn.addEventListener('click', () => {
    updatePerson(7, 'Carlos Drumond', 73);
});

deleteBtn.addEventListener('click', () => {
    deletePerson(5);
});

async function createPerson(name, age) {
    const result = await fetch(`${BASE_URL}?fn=create&name=${name}&age=${age}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.person);
        });

    return result;
}

async function readPersons() {
    const result = await fetch(`${BASE_URL}?fn=read`)
        .then(response => response.json())
        .then(data => {
            console.log(data.person);
            return data.person;
        });

    result.forEach(e => {
        createTableLine(e.id, e.name, e.age);
    })
    return result;
}

async function updatePerson(id, name, age) {
    const result = await fetch(`${BASE_URL}?fn=update&name=${name}&age=${age}&id=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.person);
        });

    return result;
}

async function deletePerson(id) {
    const result = await fetch(`${BASE_URL}?fn=delete&id=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.person);
        });

    return result;
}