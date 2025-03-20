// Avatar Upload
const avatarUpload = document.getElementById('avatarUpload');
const uploadBox = document.getElementById('uploadBox');
const uploadedImage = document.getElementById('uploadedImage');
const uploadText = document.getElementById('uploadText');
const uploadActions = document.querySelector('.upload-actions');
const changeImageButton = document.getElementById('changeImage');
const removeImageButton = document.getElementById('removeImage');
const fileError = document.getElementById('fileError');

// Trigger file input when clicking the upload box
uploadBox.addEventListener('click', function () {
    avatarUpload.click(); // Simulate a click on the hidden file input
});

// Handle file upload
avatarUpload.addEventListener('change', function () {
    const file = avatarUpload.files[0];
    if (file) {
        // Validate file size
        if (file.size > 500 * 1024) { // Check if file size exceeds 500KB
            fileError.textContent = 'File size must be less than 500KB.';
            fileError.style.display = 'block'; // Show the error message
            fileError.setAttribute('aria-live', 'assertive'); // Announce error to screen readers
            return; // Stop further execution
        }

        // Validate file type
        if (!['image/png', 'image/jpeg'].includes(file.type)) { // Check if file type is valid
            fileError.textContent = 'Only JPG or PNG files are allowed.';
            fileError.style.display = 'block'; // Show the error message
            fileError.setAttribute('aria-live', 'assertive'); // Announce error to screen readers
            return; // Stop further execution
        }

        // Clear any previous errors
        fileError.textContent = '';
        fileError.style.display = 'none';

        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result; // Update the image to the uploaded file
            uploadText.style.display = 'none'; // Hide the "Add Avatar" text
            uploadActions.style.display = 'flex'; // Show the "Change Image" and "Remove Image" buttons
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        // If no file is selected, show an error
        fileError.textContent = 'Please upload an avatar.';
        fileError.style.display = 'block';
        fileError.setAttribute('aria-live', 'assertive'); // Announce error to screen readers
    }
});

// Change Image
changeImageButton.addEventListener('click', function () {
    avatarUpload.click(); // Trigger the file input
});

// Remove Image
removeImageButton.addEventListener('click', function () {
    avatarUpload.value = ''; // Clear the file input
    uploadedImage.src = 'assets/images/icon-upload.svg'; // Reset to the default icon
    uploadText.style.display = 'block'; // Show the upload text
    uploadActions.style.display = 'none'; // Hide the buttons
    fileError.textContent = ''; // Clear any error messages
    fileError.style.display = 'none';
});

// Generate Ticket
document.getElementById('generateTicket').addEventListener('click', function () {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const github = document.getElementById('githubUsername').value.trim();
    const avatarUrl = uploadedImage.src;

    // Clear previous error messages
    document.getElementById('fullNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('githubError').textContent = '';
    document.getElementById('fileError').textContent = '';

    let isValid = true;

    // Validate Full Name
    if (!fullName) {
        document.getElementById('fullNameError').textContent = 'Full Name is required.';
        document.getElementById('fullNameError').setAttribute('aria-live', 'assertive'); // Announce error
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required.';
        document.getElementById('emailError').setAttribute('aria-live', 'assertive'); // Announce error
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        document.getElementById('emailError').setAttribute('aria-live', 'assertive'); // Announce error
        isValid = false;
    }

    // Validate GitHub Username
    if (!github) {
        document.getElementById('githubError').textContent = 'GitHub Username is required.';
        document.getElementById('githubError').setAttribute('aria-live', 'assertive'); // Announce error
        isValid = false;
    }

    // Validate Avatar Upload
    if (uploadedImage.src === 'assets/images/icon-upload.svg') {
        document.getElementById('fileError').textContent = 'Please upload an avatar.';
        document.getElementById('fileError').style.display = 'block';
        document.getElementById('fileError').setAttribute('aria-live', 'assertive'); // Announce error
        isValid = false;
    }

    // Stop if validation fails
    if (!isValid) {
        return;
    }

    // Hide logo-container and heading-container
    const logoContainer = document.querySelector('.logo-container');
    const headingContainer = document.querySelector('.heading-container');
    if (logoContainer) logoContainer.style.display = 'none';
    if (headingContainer) headingContainer.style.display = 'none';

    // Generate the ticket
    generateTicket(fullName, email, github, avatarUrl);
});

function generateTicket(name, email, github, avatarUrl) {
    document.getElementById('ticketName').textContent = name;
    document.getElementById('ticketEmail').textContent = email;
    document.getElementById('ticketFullName').textContent = name;
    document.getElementById('ticketGithub').textContent = github;
    document.getElementById('ticketAvatar').src = avatarUrl;

    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('ticketContainer').style.display = 'block';

    populateTicketNumber();
}

// function populateTicketNumber() {
//     const ticketNumber = `#${Math.floor(10000 + Math.random() * 90000)}`;
//     document.getElementById('ticketNumber').textContent = ticketNumber;
// }