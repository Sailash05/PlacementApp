self.addEventListener("push", event => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: "/Resource/college logo/college-logo.jpeg"
    };

    event.waitUntil(
        self.registration.showNotification(data.title || "New Notification", options)
    );
});

self.addEventListener("notificationclick", event => {
    event.notification.close();  // Close the notification

    // Open a new window or focus the existing one
    event.waitUntil(
        clients.openWindow("http://192.168.1.6:5500/index.html")   // Redirect to a specific URL
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});
