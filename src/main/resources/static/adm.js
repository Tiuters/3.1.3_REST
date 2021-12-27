$(async function () {
    await getTableWithUsers();
    // getNewUserForm();
    // getDefaultModal();
    addNewUser();
})

const userFetchService = {

    findAllUsers: async () => await fetch('api/get-all-users'),

    findOneUser: async (id) => await fetch('get-user/${id}'),

    addNewUser: async (user) => {
        const body = JSON.stringify(user)
        const response = await fetch('api/new-user', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: body
        })
        console.log(response)
        return response
    }

    // ,editUser: async (user, id) => await fetch('edit-user/${id}',
    //     {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),

    // deleteUser: async (id) => await fetch('delete-user/${id}',
    //     {method: 'DELETE', headers: userFetchService.head})
}

    getTableWithUsers();


// ДОБЫТЬ ТАБЛИЦУ *******************************************************************
async function getTableWithUsers() {
    let tableBody = $('#mainTableWithUsers');
    tableBody.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let tableFilling = `$(
                <tr>
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
                </tr>
            )`;
                tableBody.append(tableFilling);
            })
        })

    $("#mainTableWithUsers").find('button').on('click', (event) => {
        let defaultModal = $('#someDefaultModal');

        let targetButton = $(event.target);
        let buttonUserId = targetButton.attr('data-userid');
        let buttonAction = targetButton.attr('data-action');

        defaultModal.attr('data-userid', buttonUserId);
        defaultModal.on('data-action', buttonAction);
        defaultModal.modal('show');
    })
}



// Добавление нового ******************************************************************
async function addNewUser() {
    $('#addNewUserButton').click(async () =>  {
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

// РЕДАКТИРОВАТЬ ЮЗЕРА **********************************************************































