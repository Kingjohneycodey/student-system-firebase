
// Function to add attendance record to Firestore
function addAttendanceRecord(attendanceFormId, fullname, matricnumber) {
    // Reference to the "attendanceRecords" collection
    const attendanceRecordsRef = firebase.firestore().collection('attendanceRecords');

    // Check if a record with the same matric number and attendance form ID already exists
    return attendanceRecordsRef.where('attendanceFormId', '==', attendanceFormId)
                                .where('matricnumber', '==', matricnumber)
                                .get()
                                .then((querySnapshot) => {
                                    if (!querySnapshot.empty) {
                                        // If a record already exists, return an error or handle it accordingly
                                        alert('You have already attended the class');
    throw new Error('Duplicate attendance record');

                                    }

                                    // If no record exists, add a new document
                                    return attendanceRecordsRef.add({
                                        attendanceFormId: attendanceFormId,
                                        fullname: fullname,
                                        matricnumber: matricnumber
                                    });
                                })
                                .then((docRef) => {
                                    console.log("Attendance record added with ID: ", docRef.id);

                                    alert("Attendance recorded successfully")
                                    location.href='index.html'
                                    return docRef.id; // Return the ID of the newly created document
                                })
                                .catch((error) => {
                                    console.error("Error adding attendance record: ", error);
                                    throw error; // Throw the error to handle it in the calling function
                                });
}


// Function to parse parameters from URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to handle form submission
const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', function (event) {

    event.preventDefault();
    // Parse attendance form ID from URL
    const attendanceFormId = getUrlParameter('id');

    // Gather input data from form fields
    const fullname = document.getElementById('fullname').value;
    const matricnumber = document.getElementById('matricnumber').value;

    // Add attendance record to Firestore
    addAttendanceRecord(attendanceFormId, fullname, matricnumber)
        .then((recordId) => {
            console.log("Attendance record added with ID:", recordId);
            // Optionally, redirect to a success page or display a success message
        })
        .catch((error) => {
            // Handle error
        });
})
