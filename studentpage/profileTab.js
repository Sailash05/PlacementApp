// Function to enable editing of the profile form
function editProfile() {
    const inputs = document.querySelectorAll('#profileForm input, #profileForm select');
    
    // Enable editing by setting readOnly and disabled properties to false
    inputs.forEach(input => {
      input.readOnly = false;
      input.disabled = false; // Enables the select element as well
    });
  
    // Change button text to "Save Changes"
    const editButton = document.querySelector('.edit-button');
    editButton.textContent = "Save Changes";
    editButton.setAttribute('onclick', 'saveProfile()');
  }
  
  // Function to save profile after editing
  function saveProfile() {
    const inputs = document.querySelectorAll('#profileForm input, #profileForm select');
    
    // Disable editing by setting readOnly and disabled properties to true
    inputs.forEach(input => {
      input.readOnly = true;
      input.disabled = true; // Disables the select element
    });
  
    // Change button text back to "Edit"
    const editButton = document.querySelector('.edit-button');
    editButton.textContent = "Edit Profile";
    editButton.setAttribute('onclick', 'editProfile()');
  
    alert('Profile updated successfully!');
  }