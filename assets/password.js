function handlePasswordReset() {
    const email = // Retrieve user's email;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            console.log('Password reset email sent!');
            // Display a message to the user about the email sent
        })
        .catch((error) => {
            console.error('Error sending password reset email: ', error);
            // Handle errors (display error messages to the user)
        });
}