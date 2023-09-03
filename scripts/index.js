const tbody = document.getElementById('list')
let URL = 'http://localhost:3030/users'

function getUsers() {
    fetch(URL)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td><button class="btn btn-danger" data-btn_id=${user.id}>Delete</button></td>
                    </tr>
                `
                tbody.append(tr)
                deleteUser()
            });
        })
}
getUsers()

function deleteUser() {
    const btn = document.querySelectorAll('.btn')
    btn.forEach(el => {
        el.addEventListener('click', function(event) {
            if (event.target.dataset.btn_id) {
                let URL = `http://localhost:3030/users/${event.target.dataset.btn_id}`
                fetch(URL, {
                    method: "DELETE",
                })
                .then(response => {
                    if (response.ok) {
                        alert("Success delete")
                    }
                    else {
                        alert(`Error: ${response.status}`)
                    }
                })
            }
        })
    })
}