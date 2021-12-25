$(async function () {

    console.log("Hello world")

    const userFetchService = {
        head: {
            'Accept': 'application/json',
            'Content-Type': 'application-json',
            'Referer': null
        },
        findAllUsers: async () => await fetch('api/v1/get-all-users')
        // ,
        // findOneUser: async (id) => await fetch('get-user/${id}'),
        // addNewUser: async (user) => await fetch('new-user',
        //     {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
        // editUser: async (user, id) => await fetch('edit-user/${id}',
        //     {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
        // deleteUser: async (id) => await fetch('delete-user/${id}',
        //     {method: 'DELETE', headers: userFetchService.head})
    }

    getTableWithUsers();

    async function getTableWithUsers() {
        let table = $('#mainTableWithUsers tbody');
        table.empty();

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
                        <td>${user.roles}</td>
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
                    table.append(tableFilling);
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
});


































