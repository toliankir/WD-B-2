const apiUrl = "./api";


$("#user-add").on("submit", ev => {
    ev.preventDefault();

    $.ajax({
        url: apiUrl,
        type: 'POST',
        data: {
            login: $("#username").val(),
            password: $("#password").val()
        },
        success: (data) => {
            console.log("Request OK");
            console.log(data);
        },
        error: (XHR) => {
            console.log(XHR)
        }
    });
});

