
// Function to fetch attendance forms by lecturer ID
function getAttendanceFormsByLecturerId(lecturerId) {
    // Reference to the "attendanceForms" collection
    const attendanceFormsRef = firebase.firestore().collection('attendanceForms');

    // Query documents where lecturerId field matches the provided lecturerId
    return attendanceFormsRef.where('lecturerId', '==', lecturerId)
        .get()
        .then((querySnapshot) => {
            const attendanceForms = [];
            querySnapshot.forEach((doc) => {
                // For each document in the query result, push it to the array
                attendanceForms.push({ id: doc.id, ...doc.data() });
            });
            return attendanceForms; // Return array of attendance forms
        })
        .catch((error) => {
            console.error("Error fetching attendance forms:", error);
            throw error; // Throw the error to handle it in the calling function
        });
}


function displayAttendanceForms() {
    const attendanceTable = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];

    const lecturerId = localStorage.getItem("lecturerId")
    
    getAttendanceFormsByLecturerId(lecturerId)
        .then((attendanceForms) => {
            // Clear existing table rows
            attendanceTable.innerHTML = '';

            // Populate table with attendance forms
            attendanceForms.forEach((attendanceForm) => {
                const row = attendanceTable.insertRow();
                const dateCell = row.insertCell(0);
                const idCell = row.insertCell(1);
                const viewCell = row.insertCell(2); // New cell for View button

                // Populate cells with data
                dateCell.textContent = attendanceForm.date;
                idCell.innerHTML = 'https://student-registration-system1.vercel.app/student-attendance-form.html?id='+attendanceForm.id;
               
                // Create a View button and wrap it with a link
                const viewButton = document.createElement('button');
                viewButton.textContent = 'View';
                const viewLink = document.createElement('a');
                viewLink.href = 'view-attendance-details.html?id=' + attendanceForm.id; // Link to view details page with attendance form ID
                viewLink.appendChild(viewButton);
                viewCell.appendChild(viewLink);
            });
        })
        .catch((error) => {
            console.error("Error fetching attendance forms:", error);
            // Handle error
        });
}

// Example usage: Replace 'your-lecturer-id' with actual lecturer ID
displayAttendanceForms();