const apiUrl = "./api";
const userList = $("#user-list");

async function syncUserList() {
    const apiResponse = await $.ajax(apiUrl);
    const users = JSON.parse(apiResponse);
    userList.html("");
    users.forEach(user => {
        userList.append($(`<li class="row p-1"><span class="col-3">${user.login}</span></li>`)
            .append($('<a class="btn btn-danger btn-sm text-white">Delete</a>').on('click', async () => {
                await deleteUserById(user.id);
                syncUserList();
            })));
    });
}

async function deleteUserById(id) {
    await $.ajax({
        method: 'DELETE',
        url: apiUrl,
        data: { id }
    });
}

$("#user-add").on("submit", async (ev) => {
    ev.preventDefault();

    await $.ajax({
        method: 'POST',
        url: apiUrl,
        data: {
            login: $("#username").val(),
            password: $("#password").val()
        }
    })
    syncUserList();
});

$(() => {
    syncUserList();
});
