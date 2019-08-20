const publicVapidKey = 'BIO4gfW0Cv3o7_CCsEbFsWHq4vwZ1ls5DPXrlTvMm9pppRp_jPG8CdMe3KA61H-X-LkT8GR0vNdYANp73xIBxWc';

//check for service worker
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

//Register SW, Register Push, Send Push
async function send(){
    // Register Service Worker
    console.log('Registering Service worker...');
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    console.log('Service worker registered.');


    //Register Push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered.');


    //Send Push Notification
    console.log('Sending Push...');
    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent...');
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
