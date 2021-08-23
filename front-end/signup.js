(function () {
    //import router from '../routes/login';
    const form = document.getElementById("signup-form");
    form.addEventListener('submit', signup);
    function signup() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let signupBody = new FormData();
        signupBody.append("email", email);
        signupBody.append("password", password);

        fetch('/signup', { method: "POST", body: signupBody })
            .then(checkStatus)
            .catch(handleError);
    }

    async function checkStatus(res) {
        if (!res.ok) {
            throw new Error(await res.text());
        }
        return res;
    }

    function handleError(err) {
        console.log(err);

    }
})