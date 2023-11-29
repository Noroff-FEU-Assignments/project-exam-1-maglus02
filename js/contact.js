export function validateForm() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;

    document.querySelector('#nameError').innerHTML = "";
    document.querySelector('#emailError').innerHTML = "";
    document.querySelector('#subjectError').innerHTML = "";
    document.querySelector('#messageError').innerHTML = "";

    if (name.length <= 5) {
        document.querySelector('#nameError').innerHTML = "Name should be more than 5 characters.";
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        document.querySelector('#emailError').innerHTML = "Please enter a valid email address.";
        return false;
    }

    if (subject.length <= 15) {
        document.querySelector('#subjectError').innerHTML = "Subject should be more than 15 characters.";
        return false;
    }

    if (message.length <= 25) {
        document.querySelector('#messageError').innerHTML = "Message should be more than 25 characters.";
        return false;
    }

    return true;
}