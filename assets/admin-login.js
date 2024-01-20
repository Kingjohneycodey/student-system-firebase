const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve login credentials
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Redirect to dashboard or user-specific page
            console.log('Login successful!');

            console.log(userCredential);

            const { user } = userCredential;

            // Store UID in local storage
            localStorage.setItem('uid', user.uid);
            localStorage.setItem('email', user.email);
            localStorage.setItem('isAdmin', true);

            alert('Login Successful 🎉🎉')

            location.href = './admin-dashboard.html'

        })
        .catch((error) => {
            console.error('Error signing in: ', error);
            // Handle errors (display error messages to the user)
        });
});
