let domain = "http://192.168.1.5:8080/";

let jwt_token = JSON.parse(localStorage.getItem('token')).jwt_token;
let userName = JSON.parse(localStorage.getItem('userName'));
document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the username from localStorage
    let username = localStorage.getItem("username");

    // If a username is found, insert it into the placeholder, otherwise show a default message
    if (username) {
        document.getElementById("username-placeholder").textContent = username;
    } else {
        document.getElementById("username-placeholder").textContent = "Student";
    }

    // Attach click event listener to the bell button
    document.querySelector(".responsive-btn-bell").addEventListener("click", toggleMotionWindow);

    // Check for new announcements and update the red dot
    updateNotificationDot();

    // 🚀 New Code for Navigating to Assessment Page on "Today's Task" Click
    let todaysTaskButton = document.querySelector('.todays-task-btn'); // Update selector here
    if (todaysTaskButton) { 
        todaysTaskButton.addEventListener('click', function() {
            toggleMainBar(2); // Load the Assessment page
        });
    }
});

// Function to toggle the announcement window
function toggleMotionWindow() {
    const motionWindow = document.getElementById("motion-window");
    const overlay = document.getElementById("overlay");

    if (motionWindow.classList.contains("active")) {
        motionWindow.classList.remove("active");
        overlay.classList.remove("active");

        // Remove red dot when the user checks the announcements
        localStorage.setItem("newAnnouncements", "false");
        updateNotificationDot();
    } else {
        motionWindow.classList.add("active");
        overlay.classList.add("active");
    }
}

// Function to check and update the notification red dot
function updateNotificationDot() {
    const notificationDot = document.getElementById("notification-dot");
    const newAnnouncements = localStorage.getItem("newAnnouncements");

    if (newAnnouncements === "true") {
        notificationDot.style.display = "block"; // Show the red dot
    } else {
        notificationDot.style.display = "none"; // Hide the red dot
    }
}

// Function to simulate new announcements
function addNewAnnouncement() {
    console.log("New announcement added!"); // Debugging log
    localStorage.setItem("newAnnouncements", "true");
    updateNotificationDot();
}
// Function to fetch the latest event and display it in the event-box
async function loadLatestEvent() {
    try {
        // Fetch latest event
        const response = await fetch(domain + event/getevent?offset=0&limit=1, {
            method: 'GET',
            headers: {
                "Authorization": Bearer ${jwt_token}, 
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }

        const data = await response.json();
        if (!data.datas || data.datas.length === 0) {
            console.warn("No events found.");
            return;
        }

        let latestEvent = data.datas[0]; // Get the first event

        // Select event-box container
        const eventBox = document.querySelector(".event-box");
        if (!eventBox) {
            console.error("Error: .event-box not found");
            return;
        }

        // Create event poster image
        const posterImage = document.createElement("img");
        posterImage.src = latestEvent.eventFiles.length > 0 
            ? ${domain}event/getimage/${latestEvent.eventFiles[0]} 
            : "https://via.placeholder.com/500"; // Fallback image
        posterImage.alt = "Event Poster";
        posterImage.classList.add("event-poster");

        // Remove existing posters if any
        const existingPoster = eventBox.querySelector(".event-poster");
        if (existingPoster) {
            eventBox.removeChild(existingPoster);
        }

        // Insert the poster before the button
        const button = eventBox.querySelector(".responsive-btn");
        if (button) {
            eventBox.insertBefore(posterImage, button);
        } else {
            eventBox.appendChild(posterImage);
        }

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", loadLatestEvent);
async function loadLatestJobPostTitle() {
    try {
        const response = await fetch(domain + jobpost/getjobpost?offset=0, {
            method: 'GET',
            headers: {
                "Authorization": Bearer ${jwt_token}, 
                'Content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(Error: ${response.status} - ${response.statusText});
        }

        const data = await response.json();

        // Check if job posts exist
        if (data.datas && data.datas.length > 0) {
            let latestJob = data.datas[0]; // Get the latest job post
            let jobTitleElement = document.getElementById("latest-job-title");
            let viewJobBtn = document.getElementById("view-job-btn");

            jobTitleElement.textContent = latestJob.jobTitle; // Insert job title
            viewJobBtn.style.display = "inline-block"; // Show the button

        } else {
            document.getElementById("latest-job-title").textContent = "No recent job posts.";
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        document.getElementById("latest-job-title").textContent = "Failed to load job post.";
    }
}

// Call function when the page loads
document.addEventListener("DOMContentLoaded", loadLatestJobPostTitle);
function toggleDropdown() {
    const menu = document.getElementById("month-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function selectMonth(month) {
    document.getElementById("selected-month").innerText = month + " ⌄";
    document.getElementById("month-menu").style.display = "none";
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    let dropdown = document.querySelector(".month-dropdown");
    if (!dropdown.contains(event.target)) {
        document.getElementById("month-menu").style.display = "none";
    }
});