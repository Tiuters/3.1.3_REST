function getAllUsers() {
    fetch("/api/get-all-users")
        .then(res => res.json())
        .then(users => {
            let temp = '';
            users.forEach(function (user) {
                temp += `
                <tr>
                <td id="id${user.id}">${user.id}</td>
                <td id="name${user.id}">${user.name}</td> 
                <td id="lastname${user.id}">${user.lastname}</td> 
                <td id="position${user.id}">${user.position}</td>
                <td id="username${user.id}">${user.username}</td>
                <td id="roles${user.id}">${user.roles.map(r => r.role)}</td>
                <td>
                <button class="btn btn-info btn-md" type="button"
                data-toggle="modal" data-target="#modalEdit" 
                onclick="openModal(${user.id})">Edit</button></td>
                <td>
                <button class="btn btn-danger btn-md" type="button"
                data-toggle="modal" data-target="#modalDelete" 
                onclick="openModal(${user.id})">Delete</button></td>
              </tr>`;
            });
            document.getElementById("mainTableWithUsers").innerHTML = temp;
        });
}

getAllUsers()