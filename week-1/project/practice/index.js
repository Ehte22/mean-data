const userForm = document.getElementById('userForm');
const editForm = document.getElementById('editForm');
const sameAsPermanent = document.getElementById('sameAsPermanent');
const esameAsPermanent = document.getElementById('esameAsPermanent');
const permanentAddress = document.getElementById('permanentAddress');
const epermanentAddress = document.getElementById('epermanentAddress');
const communicationAddress = document.getElementById('communicationAddress');
const ecommunicationAddress = document.getElementById('ecommunicationAddress');
const contactTableBody = document.getElementById('contactTableBody');
const pagination = document.getElementById('pagination');
const age = document.getElementById('age');
const eage = document.getElementById('eage');
const itemsPerPageSelect = document.getElementById('limit');
let itemsPerPage = parseInt(itemsPerPageSelect.value)
let currentPage = 1;
const emailParent = document.getElementById("emailParent")
const contactParent = document.getElementById("contactParent")
const firstParent = document.getElementById("firstParent")
const middleParent = document.getElementById("middleParent")
const lastParent = document.getElementById("lastParent")

const eemailParent = document.getElementById("eemailParent")
const econtactParent = document.getElementById("econtactParent")
const efirstParent = document.getElementById("efirstParent")
const emiddleParent = document.getElementById("emiddleParent")
const elastParent = document.getElementById("elastParent")

const addModal = new bootstrap.Modal(document.getElementById("addModal"))
const editModal = new bootstrap.Modal(document.getElementById("editModal"))
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"))

// Checkbox for same as permanent address
sameAsPermanent.addEventListener('change', function () {
    if (this.checked) {
        communicationAddress.value = permanentAddress.value;
        communicationAddress.disabled = true;
    } else {
        communicationAddress.disabled = false;
    }
});

esameAsPermanent.addEventListener('change', function () {
    if (this.checked) {
        ecommunicationAddress.value = epermanentAddress.value;
        ecommunicationAddress.disabled = true;
    } else {
        ecommunicationAddress.disabled = false;
    }


});

// Calculate age based on birth date
birthDate.addEventListener('change', function () {
    const birthDateValue = new Date(birthDate.value);
    const today = new Date();
    let ageValue = today.getFullYear() - birthDateValue.getFullYear();
    age.value = ageValue;

    if (birthDateValue > today) {
        age.value = 0
    }
});

ebirthDate.addEventListener('change', function () {
    const birthDateValue = new Date(ebirthDate.value);
    const today = new Date();
    let ageValue = today.getFullYear() - birthDateValue.getFullYear();
    eage.value = ageValue;
    if (birthDateValue > today) {
        eage.value = 0
    }
});

const isEmailAlredyExists = (value) => {
    const x = getContacts().find(item => item.email === value)
    return x ? true : false
}
const isContactAlredyExists = (value) => {
    const x = getContacts().find(item => item.contactNumber === value)
    return x ? true : false
}
const isValidContact = (value) => {
    if (["0", "1", "2", "3", "4", "5"].includes(value[0]) || value.length !== 10) {
        return true;
    } else {
        return false
    }
}

const isValidNames = (value) => {
    const result = /^[a-zA-Z]+$/;
    return result.test(value)
}

const handlecontactChange = (e) => {
    if (isContactAlredyExists(e.target.value) || isValidContact(e.target.value)) {
        const preErr = contactParent.querySelector("span")
        if (preErr) {
            contactParent.removeChild(preErr)
        }
        const err = document.createElement("span")
        err.innerHTML = isValidContact(e.target.value) ? "Enter valid contact" : "Conatct Alredy exits"
        err.style.color = "red"
        contactParent.appendChild(err)
        return null
    } else {
        const err = contactParent.querySelector("span")
        contactParent.removeChild(err)
    }
}

const handleEmailChange = (e) => {
    if (isEmailAlredyExists(e.target.value)) {
        const err = document.createElement("span")
        err.innerHTML = "Email Alredy exits"
        err.style.color = "red"
        emailParent.appendChild(err)
        return null
    } else {
        const err = emailParent.querySelector("span")
        emailParent.removeChild(err)
    }
}

const handleFirstNameChange = (e) => {
    const nameValue = e.target.value.trim();

    const preErr = firstParent.querySelector("span");
    if (preErr) {
        firstParent.removeChild(preErr);
    }

    if (!isValidNames(nameValue)) {
        const err = document.createElement("span");
        err.textContent = "Please enter only alphabetic characters.";
        err.style.color = "red";
        firstParent.appendChild(err);
    }
};

const handleMiddleNameChange = (e) => {
    const nameValue = e.target.value.trim();

    const preErr = middleParent.querySelector("span");
    if (preErr) {
        middleParent.removeChild(preErr);
    }

    if (!isValidNames(nameValue)) {
        const err = document.createElement("span");
        err.textContent = "Please enter only alphabetic characters.";
        err.style.color = "red";
        middleParent.appendChild(err);
    }
};

const handleLastNameChange = (e) => {
    const nameValue = e.target.value.trim();

    const preErr = lastParent.querySelector("span");
    if (preErr) {
        lastParent.removeChild(preErr);
    }

    if (!isValidNames(nameValue)) {
        const err = document.createElement("span");
        err.textContent = "Please enter only alphabetic characters.";
        err.style.color = "red";
        lastParent.appendChild(err);
    }
};



// Form validation and submission
userForm.addEventListener('submit', function (event) {

    const email = document.getElementById('email').value

    event.preventDefault();




    if (userForm.checkValidity()) {
        const data = {
            id: new Date().getTime().toString(),
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            email,
            contactNumber: document.getElementById('contactNumber').value,
            contactType: document.getElementById('contactType').value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            birthDate: document.getElementById('birthDate').value,
            permanentAddress: document.getElementById('permanentAddress').value,
            communicationAddress: document.getElementById('communicationAddress').value,
            age: document.getElementById('age').value,

        };

        if (isValidContact(data.contactNumber) || isContactAlredyExists(data.contactNumber) || isEmailAlredyExists(data.email) || !isValidNames(data.firstName) || (data.middleName && !isValidNames(data.middleName)) || !isValidNames(data.lastName)) {
            return null
        }


        saveContact(data);
        renderContacts();

        addModal.hide()

        userForm.reset();
    } else {

        event.stopPropagation();
        userForm.classList.add('was-validated');
    }
});


function saveContact(data) {
    const contacts = getContacts();
    contacts.unshift(data);
    localStorage.setItem('users', JSON.stringify(contacts));
}

function getContacts() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function renderContacts(contacts = getContacts()) {
    contactTableBody.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedContacts = contacts.slice(start, end);

    paginatedContacts.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${data.firstName} ${data.middleName} ${data.lastName}</td>
                    <td>${data.email}</td>
                    <td>${data.contactNumber} (${data.contactType})</td>
                    <td>${data.gender}</td>
                    <td>
                    <button class="btn btn-secondary btn-sm" onclick="viewContact('${data.id}')">View</button>
                        <button id="eModal" class="btn btn-warning btn-sm" onclick="editContact('${data.id}')">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteContact('${data.id}')">Delete</button>
                    </td>
                `;
        contactTableBody.appendChild(row);
    });

    renderPagination(contacts.length);
}

function renderPagination(totalItems) {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link  bg-dark" href="#">${i}</a>`
        li.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            renderContacts();
        });
        pagination.appendChild(li);
    }
}

itemsPerPageSelect.addEventListener('change', function () {
    itemsPerPage = parseInt(this.value);
    currentPage = 1;
    renderContacts();
});


const viewContact = function (id) {
    const contacts = getContacts();
    const data = contacts.find(item => item.id === id);
    alert(`Full Name: ${data.firstName} ${data.middleName} ${data.lastName}\nEmail: ${data.email}\nContact: ${data.contactNumber} (${data.contactType})\nAge: ${data.age}\nGender: ${data.gender}\nPermanent Address: ${data.permanentAddress}\nCommunication Address: ${data.communicationAddress}`);
};

let editId = ""
let editData = ""

const editContact = function (id) {
    const contacts = getContacts();
    editData = contacts.find(item => item.id === id);
    editId = editData.id

    if (editData) {
        document.getElementById('efirstName').value = editData.firstName;
        document.getElementById('emiddleName').value = editData.middleName;
        document.getElementById('elastName').value = editData.lastName;
        document.getElementById('eemail').value = editData.email;
        document.getElementById('econtactNumber').value = editData.contactNumber;
        document.getElementById('econtactType').value = editData.contactType;
        document.querySelector(`input[name="egender"][value="${editData.gender}"]`).checked = true;
        document.getElementById('ebirthDate').value = editData.birthDate;
        document.getElementById('epermanentAddress').value = editData.permanentAddress;
        document.getElementById('ecommunicationAddress').value = editData.communicationAddress;
        document.getElementById("eage").value = editData.age


        editModal.show()

    }
};


let contactDeleteId = null
const deleteContact = function (id) {
    contactDeleteId = id
    deleteModal.show()

};

document.getElementById('confirmDeleteButton').addEventListener("click", () => {
    if (contactDeleteId !== null) {
        let contacts = getContacts()
        contacts = contacts.filter(item => item.id !== contactDeleteId)
        localStorage.setItem('users', JSON.stringify(contacts));
        renderContacts();
        contactDeleteId = null
        deleteModal.hide()
    }
})

const ehandlecontactChange = (e) => {
    if (isContactAlredyExists(e.target.value) || isValidContact(e.target.value)) {
        const preErr = econtactParent.querySelector("span")
        if (preErr) {
            econtactParent.removeChild(preErr)
        }
        const err = document.createElement("span")
        err.innerHTML = isValidContact(e.target.value) ? "Enter valid contact" : "Conatct Alredy exits"
        err.style.color = "red"
        econtactParent.appendChild(err)
        return null
    } else {
        const err = econtactParent.querySelector("span")
        econtactParent.removeChild(err)
    }
}

const ehandleEmailChange = (e) => {
    if (isEmailAlredyExists(e.target.value)) {
        const err = document.createElement("span")
        err.innerHTML = "Email Alredy exits"
        err.style.color = "red"
        eemailParent.appendChild(err)
        return null
    } else {
        const err = eemailParent.querySelector("span")
        eemailParent.removeChild(err)
    }
}

const ehandleFirstNameChange = (e) => {
    const nameValue = e.target.value.trim();

    const preErr = efirstParent.querySelector("span");
    if (preErr) {
        efirstParent.removeChild(preErr);
    }

    if (!isValidNames(nameValue)) {
        const err = document.createElement("span");
        err.textContent = "Please enter only alphabetic characters.";
        err.style.color = "red";
        efirstParent.appendChild(err);
    }
};

const ehandleMiddleNameChange = (e) => {
    const nameValue = e.target.value.trim();

    const preErr = emiddleParent.querySelector("span");
    if (preErr) {
        emiddleParent.removeChild(preErr);
    }

    if (!isValidNames(nameValue)) {
        const err = document.createElement("span");
        err.textContent = "Please enter only alphabetic characters.";
        err.style.color = "red";
        emiddleParent.appendChild(err);
    }
};

const ehandleLastNameChange = (e) => {
    const nameValue = e.target.value.trim();

    const preErr = elastParent.querySelector("span");
    if (preErr) {
        elastParent.removeChild(preErr);
    }

    if (!isValidNames(nameValue)) {
        const err = document.createElement("span");
        err.textContent = "Please enter only alphabetic characters.";
        err.style.color = "red";
        elastParent.appendChild(err);
    }
};

editForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (editForm.checkValidity()) {
        const selcectedData = {
            id: editId,
            firstName: document.getElementById('efirstName').value,
            middleName: document.getElementById('emiddleName').value,
            lastName: document.getElementById('elastName').value,
            email: document.getElementById('eemail').value,
            contactNumber: document.getElementById('econtactNumber').value,
            contactType: document.getElementById('econtactType').value,
            gender: document.querySelector('input[name="egender"]:checked').value,
            birthDate: document.getElementById('ebirthDate').value,
            permanentAddress: document.getElementById('epermanentAddress').value,
            communicationAddress: document.getElementById('ecommunicationAddress').value,
            age: document.getElementById("eage").value
        }
        if (isValidContact(selcectedData.contactNumber) || !isValidNames(selcectedData.firstName) || !isValidNames(selcectedData.lastName) || (selcectedData.middleName && !isValidNames(selcectedData.middleName))) {
            return null
        }

        updateUser(selcectedData)
        editModal.hide()
    } else {

        event.stopPropagation();
        editForm.classList.add('was-validated');
    }

})

function updateUser(data) {
    const contacts = getContacts()
    const index = contacts.findIndex(item => item.id === data.id)

    if (index !== -1) {
        contacts[index] = {
            id: data.id,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            email: data.email,
            contactNumber: data.contactNumber,
            contactType: data.contactType,
            gender: data.gender,
            birthDate: data.birthDate,
            permanentAddress: data.permanentAddress,
            communicationAddress: data.communicationAddress,
            age: data.age
        }
        localStorage.setItem('users', JSON.stringify(contacts));
        renderContacts();
    }
}

// Initial render
renderContacts();

const searchUsers = (searchval, filterBy) => {
    const res = getContacts();
    // console.warn(res);
    const x = res.filter(item => {

        return filterBy.some(s => {

            return item[s].toString().toLowerCase().includes(searchval.toLowerCase());
        });

    });


    renderContacts(x)
}


// Event listener for the search bar
document.getElementById('search').addEventListener('input', (event) => {
    const searchValue = event.target.value;
    searchUsers(searchValue, ['firstName', 'middleName', 'lastName', 'email', 'contactNumber']);
    currentPage = 1
});



