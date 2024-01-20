


const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form data
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    

    // Create a new user in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Get the user ID
            const userId = userCredential.user.uid;
             // Add user details to Firestore 
                    const usersRef = firebase.firestore().collection('admin');
                    usersRef.doc(userId).set({
                        name: fullname,
                        email: email

                    }).then(() => {
                        console.log('User details added to Firestore');
                        alert('Registration succesful')

                        location.href = './admin-login.html'
                        // Redirect to login page or dashboard
                    }).catch((error) => {
                        console.error('Error adding user details to Firestore: ', error);
                    });
        
        })
        .catch((error) => {
            console.error('Error creating user: ', error);
            // Handle errors (display error messages to the user)
        });
});
