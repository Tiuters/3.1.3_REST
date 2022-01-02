$(async function () {
    await getTableWithUsers();
    getDefaultModal();
    addNewUser();
    header();
    oneUserData();
})

// ФЕТЧИ **********************************************************************************
const userFetchService = {

    findAllUsers: async () => await fetch('api/get-all-users'),

    findOneUser: async (id) => await fetch(`api/${id}`),

    addNewUser: async (user) => {
        const body = JSON.stringify(user)
        const response = await fetch('api/new-user', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        console.log(response)
        return response
    },

    editUser: async (user, id) => await fetch(`api/edit-user/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }),

    deleteUser: async (id) => await fetch(`api/delete-user/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),

    getAuthorizedUser: async () => await fetch('api/authorized-user'),

    getAllRoles: async () => await fetch('api/get-all-roles')
}


// ДОБЫТЬ ТАБЛИЦУ *******************************************************************
async function getTableWithUsers() {
    let tableBody = $('#mainTableWithUsers');
    tableBody.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling =
                    `$(<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.lastname}</td>
                    <td>${user.position}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(r => r.role)}</td>
                    <td>
                        <button type="button" data-userid="${user.id}" data-action="edit" class="btn btn-info"
                            data-toggle="modal" data-target="#someDefaultModal">Edit</button>
                    </td>
                    <td>
                        <button type="button" data-userid="${user.id}" data-action="delete" class="btn btn-danger" 
                            data-toggle="modal" data-target="#someDefaultModal">Delete</button>
                    </td>
                </tr> )`;
                tableBody.append(tableFilling);
            })
        })

    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let target = event.target
        let targetButton = $(target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.attr('data-action', buttonAction);
        defaultModal.modal('show');
    })
}

// Добавление нового ******************************************************************
async function addNewUser() {

    let fetchedRoles = await userFetchService.getAllRoles();
    let rolesD = await fetchedRoles.json();
    let list = document.querySelector('.alll')
    let key;
    for (key in rolesD){
        list.innerHTML += `
          <option value="${rolesD[key].role}">${rolesD[key].role}</option>
        `
    }

    $('#addNewUserButton').click(async () => {
        let addUserForm = $('#newUserForm')
        let name = addUserForm.find('#newName').val().trim();
        let lastname = addUserForm.find('#newLastname').val().trim();
        let position = addUserForm.find('#newPosition').val().trim();
        let username = addUserForm.find('#newUsername').val().trim();
        let password = addUserForm.find('#newPassword').val().trim();
        let rolesFromForm = addUserForm.find('#newRoles').val();

        function getRoles(rolesFromForm) {
            let roles = [];
            if (rolesFromForm.indexOf("ROLE_USER") >= 0) {
                roles.push({"id": 2, "role": "ROLE_USER"});
            }
            if (rolesFromForm.indexOf("ROLE_ADMIN") >= 0) {
                roles.push({"id": 1, "role": "ROLE_ADMIN"});
            }
            return roles;
        }

        let rolesWithId = getRoles(rolesFromForm)

        let data = {
            name: name,
            lastname: lastname,
            position: position,
            username: username,
            password: password,
            roles: rolesWithId
        }

        const response = await userFetchService.addNewUser(data);
        if (response.ok) {
            await getTableWithUsers();
            addUserForm.find('#newName').val('');
            addUserForm.find('#newLastname').val('');
            addUserForm.find('#newPosition').val('');
            addUserForm.find('#newUsername').val('');
            addUserForm.find('#newRoles').val('');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert)
        }
    })
}

// ПЕРЕКЛЮЧАТЕЛЬ МОДАЛКИ **********************************************************

// что то деалем при открытии модалки и при закрытии
// основываясь на ее дата атрибутах
async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');
        switch (action) {
            case 'edit':
                editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    })
}

// РЕДАКТИРОВАТЬ ЮЗЕРА **********************************************************
// редактируем юзера из модалки редактирования, забираем данные, отправляем
async function editUser(modal, id) {
    let preuser = await userFetchService.findOneUser(id);
    let user = preuser.json();



    modal.find('.modal-title').html('Edit user');

    let editButton = `<button  class="btn btn-outline-success" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(editButton);
    modal.find('.modal-footer').append(closeButton);

    user.then(user => {
        let bodyForm = `
            <form class="form-group" id="editUserForm">
                <div class="modal-body">
    
                    <div class="d-flex justify-content-center">
                        <div class="form-group text-center">
                            <label for="id-edit" class="font-weight-bold">ID</label>
                            <input type="text" class="form-control col-sm-12" id="id-edit" name="id" value="${user.id}" readonly>
                        </div>
                    </div>
    
                    <div class="d-flex justify-content-center">
                        <div class="form-group text-center">
                            <label for="firstname-edit" class="font-weight-bold">First name</label>
                            <input type="text" class="form-control col-sm-12" id="firstname-edit" name="name" value="${user.name}" required>
                        </div>
                    </div>
    
                    <div class="d-flex justify-content-center">
                        <div class="form-group text-center">
                            <label for="lastname-edit" class="font-weight-bold">Last name</label>
                            <input type="text" class="form-control col-sm-12" id="lastname-edit" name="lastName" value="${user.lastname}" required>
                        </div>
                    </div>
    
                    <div class="d-flex justify-content-center">
                        <div class="form-group text-center">
                            <label for="position-edit" class="font-weight-bold">Position</label>
                            <input type="text" class="form-control col-sm-12" id="position-edit" name="position" value="${user.position}" required>
                        </div>
                    </div>
    
                    <div class="d-flex justify-content-center">
                        <div class="form-group text-center">
                            <label for="username-edit" class="font-weight-bold">Username</label>
                            <input type="text" class="form-control col-sm-12" id="username-edit" name="username" value="${user.username}" required>
                        </div>
                    </div>
    
                    <div class="d-flex justify-content-center">
                        <div class="form-group text-center">
                            <label for="password-edit" class="font-weight-bold">Password</label>
                            <input type="text" class="form-control col-sm-12" id="password-edit" name="password">
                        </div>
                    </div>
    
                    <div class="d-flex justify-content-center">
                        <div class="form-group text-center">
                            <label for="roles-edit" class="font-weight-bold">Roles</label>
<!--                            <select multiple size="2" class="form-control" id="roles-edit" name="roles" required>-->
                            <select multiple class="all-roles-edit" id="roles-edit" name="roles" required>
<!--                                <option value="ROLE_ADMIN">ADMIN</option>-->
<!--                                <option value="ROLE_USER" selected="selected">USER</option>-->
                            </select>
                        </div>
                    </div>
    
                </div>
            </form>
        `;
        modal.find('.modal-body').append(bodyForm);
    })

    let fetchedRoles = await userFetchService.getAllRoles();
    let rolesD = await fetchedRoles.json();
    let list = document.querySelector('.all-roles-edit')
    let key;
    for (key in rolesD){
        list.innerHTML += `
          <option value="${rolesD[key].role}">${rolesD[key].role}</option>
        `
    }

    $("#editButton").on('click', async () => {


        let id = modal.find("#id-edit").val().trim();
        let name = modal.find("#firstname-edit").val().trim();
        let lastname = modal.find("#lastname-edit").val().trim();
        let position = modal.find("#position-edit").val().trim();
        let username = modal.find("#username-edit").val().trim();
        let password = modal.find("#password-edit").val().trim();
        let rolesFromForm = modal.find("#roles-edit").val();

        function getRoles(rolesFromForm) {
            let roles = [];
            if (rolesFromForm.indexOf("ROLE_USER") >= 0) {
                roles.push({"id": 2, "role": "ROLE_USER"});
            }
            if (rolesFromForm.indexOf("ROLE_ADMIN") >= 0) {
                roles.push({"id": 1, "role": "ROLE_ADMIN"});
            }
            return roles;
        }

        let rolesWithId = getRoles(rolesFromForm)

        let data = {
            id: id,
            name: name,
            lastname: lastname,
            position: position,
            username: username,
            password: password,
            roles: rolesWithId
        }

        const response = await userFetchService.editUser(data, id);

        if (response.ok) {
            getTableWithUsers();
            modal.modal('hide');
        } else {
            let body = await response.json();
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="sharaBaraMessageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            modal.find('.modal-body').prepend(alert);
        }
    })
}

// УДАЛИТЬ ЮЗЕРА ********************************************************************************
async function deleteUser(modal, id) {
    await userFetchService.deleteUser(id);
    getTableWithUsers();
    modal.find('.modal-title').html('');
    modal.find('.modal-body').html('User was deleted');
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').append(closeButton);
}

// Инфа в шапку *************************************************************************************
async function header() {
    let rawUser = await userFetchService.getAuthorizedUser();
    let user = rawUser.json();
    user.then(user => {

        document.getElementById("header-username").innerHTML
            = user.username;

        let rolesList = document.createElement('ul');

        for (let i = 0; i < user.roles.length; i++) {
            let role = document.createElement('li');
            role.textContent = user.roles[i].role + " ";
            rolesList.appendChild(role);
        }

        document.getElementById("header-rolesAsString").innerHTML
            = rolesList.textContent;
    })
}

// ОДИН ЮЗЕР *********************************************************************************
async function oneUserData() {
    let userBody = $('#userTable');
    userBody.empty();

    await userFetchService.getAuthorizedUser()
        .then(res => res.json())
        .then(user => {
            let bodyFilling =
                `$(<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.lastname}</td>
                        <td>${user.position}</td>
                        <td>${user.username}</td>
                        <td>${user.roles.map(r => r.role)}</td>
                    </tr> )`;
            userBody.append(bodyFilling);
        })
}





























