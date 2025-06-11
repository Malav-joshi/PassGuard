function showStrengthChecker() {
    document.getElementById("strengthChecker").style.display = "block";
    document.getElementById("generator").style.display = "none";
}

function showGenerator() {
    document.getElementById("strengthChecker").style.display = "none";
    document.getElementById("generator").style.display = "block";
}

function togglePassword() {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

function checkStrength() {
    const password = document.getElementById("password").value;
    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");
    const crackTime = document.getElementById("crackTime");

    let charsetSize = 0;
    if (password.match(/[a-z]/)) charsetSize += 26;
    if (password.match(/[A-Z]/)) charsetSize += 26;
    if (password.match(/[0-9]/)) charsetSize += 10;
    if (password.match(/[^A-Za-z0-9]/)) charsetSize += 32;

    if (password.length > 0 && charsetSize > 0) {
        const entropy = password.length * Math.log2(charsetSize);
        const guessesPerSecond = 1e9; // 1 billion guesses/sec
        let secondsToCrack = Math.pow(2, entropy) / guessesPerSecond;

        // Convert seconds to human-readable time
        let time;
        if (secondsToCrack < 60) {
            time = `${Math.floor(secondsToCrack)} seconds`;
        } else if (secondsToCrack < 3600) {
            time = `${Math.floor(secondsToCrack / 60)} minutes`;
        } else if (secondsToCrack < 86400) {
            time = `${Math.floor(secondsToCrack / 3600)} hours`;
        } else if (secondsToCrack < 31536000) {
            time = `${Math.floor(secondsToCrack / 86400)} days`;
        } else if (secondsToCrack < 31536000 * 100) {
            time = `${Math.floor(secondsToCrack / 31536000)} years`;
        } else {
            time = `centuries+`;
        }

        crackTime.textContent = "Estimated crack time: " + time;

        // Strength levels based on entropy:
        let strength;
        if (entropy < 28) strength = 0;           // very weak
        else if (entropy < 36) strength = 1;      // weak
        else if (entropy < 60) strength = 2;      // moderate
        else if (entropy < 80) strength = 3;      // strong
        else strength = 4;                        // very strong

        const strengthMsg = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
        const colors = ["#FF4C4C", "#FF9900", "#FFD700", "#7CFC00", "#00C853"];

        strengthText.textContent = strengthMsg[strength];
        strengthBar.style.width = (strength + 1) * 20 + "%";
        strengthBar.style.backgroundColor = colors[strength];
    } else {
        crackTime.textContent = "";
        strengthText.textContent = "";
        strengthBar.style.width = "0%";
    }
}


function generatePassword() {
    const length = document.getElementById("length").value;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~";
    let password = "";

    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    document.getElementById("generatedPassword").value = password;
}

function copyPassword() {
    const generatedPassword = document.getElementById("generatedPassword");
    generatedPassword.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}
