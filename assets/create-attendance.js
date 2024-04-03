const attendanceForm = document.getElementById('attendanceForm');

if(attendanceForm){
    attendanceForm.addEventListener('submit', function (event) {
        event.preventDefault();
    
        // Retrieve login credentials
        const date = document.getElementById('date').value;
        const lecturerId = localStorage.getItem("lecturerId")
    
    
        const attendanceFormsRef = firebase.firestore().collection('attendanceForms');
    
        // Add a new document with auto-generated ID
        return attendanceFormsRef.add({
            date: date,
            lecturerId: lecturerId
        })
        .then((docRef) => {
            console.log("Attendance form document written with ID: ", docRef.id);
            alert(`Attendance created for ${date}`); // Return the ID of the newly created document
            location.href = "lecturer-dashboard.html"
        })
        .catch((error) => {
            console.error("Error adding attendance form document: ", error);
            throw error; // Throw the error to handle it in the calling function
        });
    });
}
