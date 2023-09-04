function passwordValidator (password) {
    let isValidLength = (pass) => pass.length >= 6 && pass.length <= 10;
    let isValidConsistency = (pass) => /^[A-Za-z0-9]+$/g.test(pass);
    let isValidDigits = (pass) => [...pass.matchAll(/\d/g)].length >= 2;

    let isValidPassword = true;

    if (!isValidLength(password)) {
        console.log("Password must be between 6 and 10 characters");
        isValidPassword = false;
    }
    if (!isValidConsistency(password)) {
        console.log("Password must consist only of letters and digits");
        isValidPassword = false;
    }
    if (!isValidDigits(password)) {
        console.log("Password must have at least 2 digits");
        isValidPassword = false;
    }
    if (isValidPassword) {
        console.log("Password is valid");
    }
}

passwordValidator("logIn");
passwordValidator("MyPass123");
passwordValidator("Pa$s$s");