const apiUrl = "./api";
const userList = $("#user-list");

function syncUserList() {
    $.ajax({
        url: apiUrl,
        dataType: 'json',
        type: 'GET',
        success: (users) => {
            userList.html("");
            users.forEach((user) => {
                userList.append($(`<li class="row p-1"><span class="col-3">${user.login}</span></li>`)
                    .append($('<a class="btn btn-danger btn-sm text-white">Delete</a>').on('click', () => {
                        deleteUserById(user.id);
                        syncUserList();
                    })));
            });
        },
        error: (XHR) => {
            console.log(XHR);
        }
    });
}

function deleteUserById(id) {
    $.ajax({
        url: apiUrl,
        type: 'DELETE',
        data: {
            id: id
        },
        success: (data) => {
        },
        error: (XHR) => {
            console.log(XHR)
        }
    });
}

$("#user-add").on("submit", ev => {
    ev.preventDefault();
    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: {
            login: $("#username").val(),
            password: $("#password").val()
        },
        success: () => {
            syncUserList();
        },
        error: (XHR) => {
            console.log(XHR)
        }
    });
});

$(() => {
    syncUserList();
});