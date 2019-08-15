const apiUrl = "./api";
const userList = $("#user-list");

async function syncUserList() {
    const apiResponse = await fetch(apiUrl);
    const users = await apiResponse.json();
    userList.html("");
    users.forEach((user) => {
        userList.append($(`<li class="row p-1"><span class="col-3">${user.login}</span></li>`)
            .append($('<a class="btn btn-danger btn-sm text-white">Delete</a>').on('click', () => {
                deleteUserById(user.id);
                syncUserList();
            })));
    });
}


async function deleteUserById(id) {
    const apiResponse = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    });
}

$("#user-add").on("submit", async (ev) => {
    ev.preventDefault();

    const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: $("#username").val(),
            password: $("#password").val()
        })
    });
    syncUserList();
});

$(() => {
    syncUserList();
});