const uid = localStorage.getItem("uid");
const isAdmin = localStorage.getItem("isAdmin");

if (!uid || !isAdmin) {
  alert("Not authenticated");
  location.href = "./";
}

// Listen for authentication state changes
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log("User is logged in:", user);

    const currentUser = firebase.auth().currentUser;
    console.log('hello', currentUser);
    if (currentUser) {
      // Access Firestore and retrieve user details
      const usersRef = firebase
        .firestore()
        .collection("admin")
        .doc(currentUser.uid);

        console.log(usersRef)

      usersRef
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const userData = doc.data();

            console.log('hi')

            console.log(userData);

            // Check if the user has an 'isAdmin' field and it is true
            if (userData.isAdmin === true) {
              // User is an admin, proceed to access data

              const studentList = document.getElementById("studentList");
              const totalStudent = document.getElementById("totalStudent");
              

              const usersRef = firebase.firestore().collection("students");
              usersRef
                .get()
                .then((querySnapshot) => {
                  document.getElementById("loader").style.display = "none";
                  let index = 1;
                  querySnapshot.forEach((doc) => {
                    const userData = doc.data();

                    // Create a card for each student
                    const card = document.createElement("div");
                    card.classList.add("student-card");

                    // Populate card content
                    card.innerHTML = `
                        <div class="student-photo">
                            <img src=${userData.photoURL} alt="Student's photo">
                         </div>
                        <h2 style="text-transform: uppercase"">${index}) ${userData.fullname}</h2>
                        <p><strong>Username:</strong> ${userData.username}</p>
                        <p><strong>Email:</strong> ${userData.email}</p>
                        <p><strong>Department:</strong> ${userData.department}</p>
                        <p><strong>Course:</strong> ${userData.course}</p>
                        <p><strong>Phone:</strong> ${userData.phone}</p>
                        
                        <p><strong>Matric Number:</strong> ${userData.matricnumber}</p>
                    `;

                    index++;

                    // Append the card to the list
                    studentList.appendChild(card);
                    totalStudent.innerHTML = `<b>Total Number Of Students: ${index - 1}</b>`
                  });
                })
                .catch((error) => {
                  console.error("Error getting student details: ", error);
                });
            } else {
              // User is not an admin, redirect to admin login page
              window.location.href = "admin-login.html";
            }
          } else {
            console.error("User document does not exist");
          }
        })
        .catch((error) => {
          console.error("Error getting user details: ");
        });
    } else {
      // Redirect to the admin login page if not logged in
      //   window.location.href = "admin-login.html";

      console.log("error");
    }
  } else {
    // User is signed out
    console.log("User is logged out");
  }
});

function logout() {
  localStorage.clear();
  alert("Logout successful");
  location.href = "./index.html";
}
