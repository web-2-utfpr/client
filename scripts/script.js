
const url = 'https://inst4gram.herokuapp.com';

TOKEN_HEADER = {
    'Authorization': localStorage.getItem("token")
}

function handleError (err) {
    $("<div/>", { text: err.responseJSON}).appendTo("body");
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
                $("<div/>", { text: element.created_at}).appendTo("#feed");
                $("<div/>", { text: element.user.nome}).appendTo("#feed");
                $("<img/>", { src: element.url}).appendTo("#feed");
            });
        })
        .fail(handleError);
})

$("#profile").click(() => {
    fetch(`/api/profile/me`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            $("<div/>", { text: data.nome}).appendTo("#profile");
            $("<div/>", { text: data.email}).appendTo("#profile");
        })
        .fail(handleError);
})

$("#imagens").click(() => {
    let username = $("#search").val();
    fetch(`/api/profile/images/${username}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("#imagens");
                $("<div/>", { text: element.user.nome}).appendTo("#imagens");
                $("<img/>", { src: element.url}).appendTo("#imagens");
            })
        })
        .fail(handleError);
})

$("#myfeed").click(() => {
    fetch(`/api/profile/images/`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("#myfeed");
                $("<div/>", { text: element.user.nome}).appendTo("#myfeed");
                $("<img/>", { src: element.url}).appendTo("#myfeed");
            })
        })
        .fail(handleError);
})

$("#add").click(() => {
    let image = $("#url").val();
    fetch(`/api/profile/images`, 'GET', `url=${image}`, TOKEN_HEADER)
        .done((data) => {
            $("<div/>", { text: 'A imagem foi adicionada'}).appendTo("#add");
        })
        .fail(handleError);
    
});

$("#searchuser").click(() => {
    let user = $("#usersearch").val();
    fetch(`/api/profile/find/${user}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
            $("<div/>", { text: element.nome }).appendTo("#searchuser");
        })
        })
        .fail(handleError);
});
