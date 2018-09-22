console.log('Service worker loaded.');
self.addEventListener('push', e => {
    const data = e.data.json;
    console.log('Push Recieved.');
    debugger
    self.registration.showNotification(data.title, {
        body: 'Notified by Eagle Eye Security and Semantics',
        icon: "./eagle_eye_logo.png"

    });


})