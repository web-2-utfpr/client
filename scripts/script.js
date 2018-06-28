
const url = 'https://inst4gram.herokuapp.com';

TOKEN_HEADER = {
    'Authorization': localStorage.getItem("token")
}

function handleError (err) {
    $("<div/>", { text: err.responseJSON.message}).appendTo("body");
}

function fetch (path, method='GET', data, headers) {
    let options = {
        url: `${url + path}`,
        type: method,
    };
    if (data) {
        options.data = data;
    }
    if (headers) {
        options.headers = headers;
    }
    console.log(options);
    return $.ajax(options);
}

$("#login").click(() => {
    let nome = $("#user").val();
    let senha = $("#password").val();

    fetch('/api/auth/login', 'POST', `nome=${nome}&senha=${senha}`)
        .done((data) => {
            localStorage.setItem("token", data.token);
        })
        .fail(handleError);
});

$("#register").click(() => {
    let nome = $("#user").val();
    let senha = $("#password").val();
    let email = $("#email").val();
    fetch('/api/auth/register', 'POST', `nome=${nome}&senha=${senha}&email=${email}`)
        .done((data) => {
            console.log(data);
        })
        .fail(handleError);
});

$("#feed").click(() => {
    let page = $("#page").val();

    fetch(`/api/feed/${page}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("body");
                $("<div/>", { text: element.user.nome}).appendTo("body");
                $("<img/>", { src: element.url}).appendTo("body");
            });
        })
        .fail(handleError);
})

$("#profile").click(() => {
    fetch(`/api/profile/me`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            $("<div/>", { text: data.nome}).appendTo("body");
            $("<div/>", { text: data.email}).appendTo("body");
        })
        .fail(handleError);
})

$("#imagens").click(() => {
    let username = $("#search").val();
    fetch(`/api/profile/images/${username}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("body");
                $("<div/>", { text: element.user.nome}).appendTo("body");
                $("<img/>", { src: element.url}).appendTo("body");
            })
        })
        .fail(handleError);
})

$("#myfeed").click(() => {
    fetch(`/api/profile/images/`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("body");
                $("<div/>", { text: element.user.nome}).appendTo("body");
                $("<img/>", { src: element.url}).appendTo("body");
            })
        })
        .fail(handleError);
})

$("#add").click(() => {
    let image = $("#url").val();
    fetch(`/api/profile/images`, 'GET', `url=${image}`, TOKEN_HEADER)
        .done((data) => {
            console.log(data)
        })
        .fail(handleError);
    
});

$("#searchuser").click(() => {
    let user = $("#usersearch").val();
    fetch(`/api/profile/find/${user}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
            $("<div/>", { text: element.nome }).appendTo("body");
        })
        })
        .fail(handleError);
});
