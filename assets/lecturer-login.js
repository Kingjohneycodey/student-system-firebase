const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve login credentials
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in with Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const { user } = userCredential;

            // Check if user is a lecturer
            firebase.firestore().collection('lecturers').where('email', '==', email).get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        // User is a lecturer, get lecturer details
                        const lecturerDoc = querySnapshot.docs[0]; // Assuming only one document matches email
                        const lecturerData = lecturerDoc.data();
                        const lecturerId = lecturerDoc.id;

                        console.log('Lecturer details:', lecturerData);
                        console.log('Lecturer ID:', lecturerId);

                        // Store lecturer ID and details in local storage
                        localStorage.setItem('lecturerId', lecturerId);
                        localStorage.setItem('lecturerData', JSON.stringify(lecturerData));

                        // Redirect to dashboard or user-specific page
                        alert('Login Successful 🎉🎉');
                        location.href = './lecturer-dashboard.html';
                    } else {
                        // User is not a lecturer
                        console.log('Unauthorized access');
                        alert('Unauthorized access');
                        // Handle unauthorized access (display error message to the user)
                    }
                })
                .catch((error) => {
                    console.error('Error fetching lecturer details: ', error);
                    // Handle errors (display error messages to the user)
                });
        })
        .catch((error) => {
            console.error('Error signing in: ', error);
            // Handle errors (display error messages to the user)
        });
});
