const usersList = document.getElementById('usersListItems');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const addButton = document.getElementById('addButton');

addButton.addEventListener('click', () => {
    create(nameInput.value, emailInput.value)
});

const create = function(name, email){
    const data = {
        name, email
    }

    return firebase.database().ref().child('users').push(data);
};

firebase.database().ref('users').on('value', snapshot => {
    usersList.innerHTML = '';
    let count = 0;
    snapshot.forEach( snapshotItem => {
        const tr = document.createElement('tr');

        const setTd = function(el, prop, parentAppend){
            const elNode = document.createElement(el);
            elNode.appendChild(
                document.createTextNode(snapshotItem.val()[prop])
            );
            parentAppend.appendChild(elNode);
        };
        setTd('td', 'name', tr);
        setTd('td', 'email', tr);
        
        if( !(count % 2) ) tr.classList.add('table-secondary');

        usersList.appendChild(tr);
        
        count++;
    });
})