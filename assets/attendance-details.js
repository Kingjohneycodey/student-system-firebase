// Function to get attendance records by attendance form ID
function getAttendanceRecordsByFormId(attendanceFormId) {
    // Reference to the "attendanceRecords" collection
    const attendanceRecordsRef = firebase.firestore().collection('attendanceRecords');

    // Query documents where attendanceFormId field matches the provided attendanceFormId
    return attendanceRecordsRef.where('attendanceFormId', '==', attendanceFormId)
        .get()
        .then((querySnapshot) => {
            const attendanceRecords = [];
            querySnapshot.forEach((doc) => {
                // For each document in the query result, push it to the array
                attendanceRecords.push({ id: doc.id, ...doc.data() });
            });
            return attendanceRecords; // Return array of attendance records
        })
        .catch((error) => {
            console.error("Error fetching attendance records:", error);
            throw error; // Throw the error to handle it in the calling function
        });
}


// Function to display attendance records in a table
function displayAttendanceRecords(attendanceRecords) {
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Matric Number</th>
                <!-- Add more table headers as needed -->
            </tr>
        </thead>
        <tbody>
            <!-- Table body will be dynamically populated here -->
        </tbody>
    `;
    
    const tbody = table.querySelector('tbody');

    // Populate table with attendance records
    attendanceRecords.forEach((record) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.fullname}</td>
            <td>${record.matricnumber}</td>
            <!-- Add more table cells for additional fields -->
        `;
        tbody.appendChild(row);
    });

    // Clear previous table, if any
    const previousTable = document.getElementById('attendanceRecordsTable');
    if (previousTable) {
        previousTable.remove();
    }

    // Append the new table to the document
    table.id = 'attendanceRecordsTable';
    document.body.appendChild(table);
}


function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


// Example usage: Replace 'your-attendance-form-id' with actual attendance form ID
 const attendanceFormId = getUrlParameter('id');

getAttendanceRecordsByFormId(attendanceFormId)
    .then((attendanceRecords) => {
        console.log("Attendance records for attendance form ID:", attendanceRecords);
        displayAttendanceRecords(attendanceRecords);
    })
    .catch((error) => {
        console.error("Error fetching attendance records:", error);
        // Handle error
    });
