window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', function () {
            window.location.href = "login.html"
        })
    
        document.querySelector('.btn-primary').addEventListener('click', login);
    }
    else {
        window.location.href = "pokedex.html";
    }    
}

function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data:{
            user_mail : mail,
            user_password: pass
        }
    }).then(function (res) {
        if (res.data.code === 200)
        {
            localStorage.setItem("token", res.data.message);
            window.location.href = "pokedex.html";
        }
        else 
        {
            alert("Usuario y/o password incorrectos");
        }
    }).catch(function (err){
        console.log(err);
    })
}