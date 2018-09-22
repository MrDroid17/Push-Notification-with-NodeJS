/**
 * Node.JS is a server-side technology, not a browser technology. Thus, Node-specific calls, like * require(), do not work in the browser.
 */
const PUBLIC_VAPID_KEY = 'BPd-Z6q8XOVLyk9FcuWFGEJsKozDpBrb2V_eWkwKX4O3vOZ2-WMUF3Y9rp0OUnze9aiZHdQm6qj7sT9j9WM7-Ds';

// check for serviceWorker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

/***
 * register serviceworker
 * register push notification
 * register push notification
 */
async function send() {
    // register service worker
    console.log('Registering service worker....');
    const register = await navigator.serviceWorker.register('/worker.js', { scope: '/' });
    console.log('service worker Registered.');

    //Register push
    console.log('Registering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerkey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });
    console.log('Push Registered.');

    //Subscribing push
    console.log('Push Subscribing....');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log('Push sent.');
}

/**
 * When using your VAPID key in your web app, you'll need to convert the URL safe base64 string 
 * to a Uint8Array to pass into the subscribe call.
 * @param {*} base64String 
 */
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}