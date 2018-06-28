
const url = 'https://inst4gram.herokuapp.com';

TOKEN_HEADER = {
    'Authorization': localStorage.getItem("token")
}

function handleError (err) {
    $("<div/>", { text: err.responseJSON.error }).appendTo("#auth");
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
            $("<div/>", { text: "Logado" }).appendTo("#auth");
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
            $("<div/>", { text: data.register }).appendTo("#auth");
        })
        .fail(handleError);
});

$("#feed").click(() => {
    let page = $("#page").val();

    fetch(`/api/feed/${page}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("#show-feed");
                $("<div/>", { text: element.user.nome}).appendTo("#show-feed");
                $("<img/>", { src: element.url}).appendTo("#show-feed");
            });
        })
        .fail(handleError);
})

$("#profile").click(() => {
    fetch(`/api/profile/me`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            $("<div/>", { text: data.nome}).appendTo("#show-my-feed");
            $("<div/>", { text: data.email}).appendTo("#show-my-feed");
        })
        .fail(handleError);
})

$("#imagens").click(() => {
    let username = $("#search").val();
    fetch(`/api/profile/images/${username}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("#show-images-user");
                $("<div/>", { text: element.user.nome}).appendTo("#show-images-user");
                $("<img/>", { src: element.url}).appendTo("#show-images-user");
            })
        })
        .fail(handleError);
})

$("#myfeed").click(() => {
    fetch(`/api/profile/images/`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            data.map((element)=> {
                $("<div/>", { text: element.created_at}).appendTo("#show-my-feed");
                $("<div/>", { text: element.user.nome}).appendTo("#show-my-feed");
                $("<img/>", { src: element.url}).appendTo("#show-my-feed");
            })
        })
        .fail(handleError);
})

$("#add").click(() => {
    let image = $("#url").val();
    fetch(`/api/profile/images`, 'POST', `url=${image}`, TOKEN_HEADER)
        .done((data) => {
            $("<div/>", { text: 'A imagem foi adicionada'}).appendTo("#add");
        })
        .fail(handleError);
    
});

$("#searchuser").click(() => {
    let user = $("#usersearch").val();
    fetch(`/api/profile/find/${user}`, 'GET', null, TOKEN_HEADER)
        .done((data) => {
            if (!data.length) {
                $("<div/>", { text: "No user found" }).appendTo("#search-user");    
            }
            data.map((element)=> {
            $("<div/>", { text: element.nome }).appendTo("#search-user");
        })
        })
        .fail(handleError);
});
