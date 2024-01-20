


const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve form data
    const fullname = document.getElementById('fullname').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;
    const course = document.getElementById('course').value;
    const phone = document.getElementById('phone').value;
    const photoFile = document.getElementById('photo').files[0];
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const matricnumber = document.getElementById('matricnumber').value;

    // Create a new user in Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Get the user ID
            const userId = userCredential.user.uid;

            // Upload photo to Firebase Storage
            const storageRef = firebase.storage().ref('profile_pics/' + userId);
            const photoUploadTask = storageRef.put(photoFile);

            photoUploadTask.then((snapshot) => {
                console.log('Image uploaded successfully!');

                // Get the download URL of the uploaded image
                storageRef.getDownloadURL().then((downloadURL) => {
                    console.log('Image download URL:', downloadURL);

                    // Add user details to Firestore 
                    const usersRef = firebase.firestore().collection('students');
                    usersRef.doc(userId).set({
                        fullname: fullname,
                        department: department,
                        course: course,
                        phone: phone,
                        username: username,
                        email: email,
                        photoURL: downloadURL,
                        matricnumber: matricnumber
                    }).then(() => {
                        console.log('User details added to Firestore');
                        alert('Registration succesful')

                        location.href = './login.html'
                        // Redirect to login page or dashboard
                    }).catch((error) => {
                        console.error('Error adding user details to Firestore: ', error);
                    });
                });
            }).catch((error) => {
                console.error('Error uploading image: ', error);
                // Handle image upload errors
            });
        })
        .catch((error) => {
            console.error('Error creating user: ', error);
            // Handle errors (display error messages to the user)
        });
});
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyBFwkJZEgwwE9-XfbOuPPFVKrydVB48q1E",
//     authDomain: "student-registration-system1.firebaseapp.com",
//     projectId: "student-registration-system1",
//     storageBucket: "student-registration-system1.appspot.com",
//     messagingSenderId: "938364638918",
//     appId: "1:938364638918:web:0abc0dcc2f49f6f834e9c7",
//     measurementId: "G-8R9VQJFZ2R"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
