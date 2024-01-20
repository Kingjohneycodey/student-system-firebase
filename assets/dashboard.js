// Assuming you have the Firebase authentication and Firestore instances
const auth = firebase.auth();
const db = firebase.firestore();

const uid  = localStorage.getItem('uid')

console.log(uid)

if(!uid){
    alert('Not authenticated')
    location.href = "./"
}

// Function to fetch user details from Firestore
const getUserDetails = async () => {
  try {
    const userDocRef = db.collection('students').doc(uid);
    const userDocSnap = await userDocRef.get();

    if (userDocSnap.exists) {
      // Document exists, return user details
      const userDetails = userDocSnap.data();

      // Assuming you have a div with id 'userDetails' to display user details
      const userDetailsContainer = document.getElementById('userDetails');

      document.getElementById('loader').style.display = "none"
      
      // Update the UI with user details
      userDetailsContainer.innerHTML = `
      

      <div class="profile-photo">
      <img src="${userDetails.photoURL}" alt="User Photo">
        </div>
        <div class="profile-info">
        <h2>Welcome, ${userDetails.username}!</h2>
        <p class="profile-detail"><strong>Name:</strong> ${userDetails.fullname}</p>
        <p class="profile-detail"><strong>Email:</strong> ${userDetails.email}</p>
        <p class="profile-detail"><strong>Department:</strong> ${userDetails.department}</p>
        <p class="profile-detail"><strong>Course:</strong> ${userDetails.course}</p>
        <p class="profile-detail"><strong>Matric Number:</strong> ${userDetails.matricnumber}</p>
        <p class="profile-detail"><strong>Phone:</strong> ${userDetails.phone}</p>
        </div>
      `;
    } else {
      // Document does not exist
      throw new Error('User document not found');
    }
  } catch (error) {
    throw error;
  }
};

getUserDetails()

// // Listen for authentication state changes
// auth.onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, get the UID
//     const uid = user.uid;

//     // Use the UID to fetch user details from Firestore
//     getUserDetails(uid)
//       .then((userDetails) => {
//         // Assuming you have a div with id 'dashboard' to display user details
//         const dashboardContainer = document.getElementById('dashboard');
//         dashboardContainer.innerHTML = `
//           <h2>Welcome, ${userDetails.fullName}!</h2>
//           <p><strong>Email:</strong> ${userDetails.email}</p>
//           <p><strong>Department:</strong> ${userDetails.department}</p>
//           <p><strong>Matric Number:</strong> ${userDetails.matricnumber}</p>
//           <p><strong>Phone:</strong> ${userDetails.phone}</p>
//         `;
//       })
//       .catch((error) => {
//         console.error('Error fetching user details:', error);
//       });
//   } else {
//     // User is signed out
//     console.log('User is signed out');
//   }
// });


function logout(){
    localStorage.clear()
    alert('Logout successful')
    location.href = './index.html'
}