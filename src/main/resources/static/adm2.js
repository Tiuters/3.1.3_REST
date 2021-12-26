const allUsers = document.querySelector('.mainTableWithUsers');

let output = '';
const url = '/api/get-all-users';

// const renderUsers = (users) => {
//     users.forEach(user => {
//         output +=
//                 `<tr>
//                     <td ${user.id}></td>
//                     <td ${user.name}></td>
//                     <td ${user.lastname}></td>
//                     <td ${user.position}></td>
//                     <td ${user.username}></td>
//                     <td ${user.roles.map(r => r.role)}></td>
//                     <td><button type="button" class="btn btn-info" data-toggle="modal"
//                         data-target="${'#editUser'+ user.id}">Edit</button></td>
//                     <td><button type="button" class="btn btn-danger" data-toggle="modal"
//                         data-target="${'#deleteUser'+ user.id}">Delete</button></td>
//                 </tr>`;
            // `<tr>
            //     <td id="id${user.id}">${user.id}</td>
            //     <td id="name${user.id}">${user.name}</td>
            //     <td id="lastname${user.id}">${user.lastname}</td>
            //     <td id="position${user.id}">${user.position}</td>
            //     <td id="username${user.id}">${user.username}</td>
            //     <td id="roles${user.id}">${user.roles.map(r => r.role)}</td>
            //     <td>
            //     <button class="btn btn-info btn-md" type="button"
            //     data-toggle="modal" data-target="#modalEdit"
            //     onclick="openModal(${user.id})">Edit</button></td>
            //     <td>
            //     <button class="btn btn-danger btn-md" type="button"
            //     data-toggle="modal" data-target="#modalDelete"
            //     onclick="openModal(${user.id})">Delete</button></td>
            //   </tr>`;
//     });
//     allUsers.innerHTML = output;
// }



fetch(url)
    .then(res => res.json())
    .then((users) => {
        users.forEach(user => {
            output +=
              //   `<tr>
              //   <td id="id${user.id}">${user.id}</td>
              //   <td id="name${user.id}">${user.name}</td>
              //   <td id="lastname${user.id}">${user.lastname}</td>
              //   <td id="position${user.id}">${user.position}</td>
              //   <td id="username${user.id}">${user.username}</td>
              //   <td id="roles${user.id}">${user.roles.map(r => r.role)}</td>
              //   <td>
              //   <button class="btn btn-info btn-md" type="button"
              //   data-toggle="modal" data-target="#modalEdit"
              //   onclick="openModal(${user.id})">Edit</button></td>
              //   <td>
              //   <button class="btn btn-danger btn-md" type="button"
              //   data-toggle="modal" data-target="#modalDelete"
              //   onclick="openModal(${user.id})">Delete</button></td>
              // </tr>`;
                `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.lastname}</td>
                    <td>${user.position}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(r => r.role)}</td>
                    <td><button type="button" class="btn btn-info" data-toggle="modal"
                        data-target="${'#editUser'+ user.id}">Edit</button></td>
                    <td><button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="${'#deleteUser'+ user.id}">Delete</button></td>
                </tr>`;
        });
        allUsers.innerHTML = output;
    })


$("#mainTableWithUsers").find('button').on('click', (event) => {
    let defaultModal = $('#someDefaultModal');
    let targetButton = $(event.target);
    let buttonUserId = targetButton.attr('data-userid');
    let buttonAction = targetButton.attr('data-action');
    defaultModal.attr('data-userid', buttonUserId);
    defaultModal.attr('data-action', buttonAction);
    defaultModal.modal('show');
})