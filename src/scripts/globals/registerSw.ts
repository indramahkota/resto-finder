const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export async function register(swUrl: string): Promise<void> {
    if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        await checkValidServiceWorker(swUrl);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        try {
            const registration = await navigator.serviceWorker.ready;
            if (registration !== undefined) {
                console.log(
                    'This web app is being served cache-first by a service ' +
                    'worker. To learn more, visit https://bit.ly/CRA-PWA'
                );
            }
        } catch (error) {
            console.error(error.message);
        }
    } else {
        // Is not localhost. Just register service worker
        await registerValidSW(swUrl);
    }
}

export async function unregister(): Promise<void> {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.ready;
            if (registration !== undefined) {
                await registration.unregister();
            }
        } catch (error) {
            console.error(error.message);
        }
    } else {
        console.log('ServiceWorker not supported.');
    }
}

async function checkValidServiceWorker(swUrl: string): Promise<void> {
    try {
        const swFileResponse = await fetch(swUrl, { headers: { 'Service-Worker': 'script' } });
        const contentType = swFileResponse.headers.get('content-type');
        if ((swFileResponse.status === 404 ||
            (contentType != null && contentType.indexOf('javascript') === -1))) {
            try {
                const registration = await navigator.serviceWorker.ready;
                if (registration !== undefined) {
                    try {
                        const unregister = await registration.unregister();
                        if (unregister) {
                            window.location.reload();
                        }
                    } catch (error) {
                        console.error(error.message);
                    }
                }
            } catch (error) {
                console.error(error.message);
            }
        } else {
            await registerValidSW(swUrl);
        }
    } catch (error) {
        console.log(
            'No internet connection found. App is running in offline mode.',
            error
        );
    }
}

async function registerValidSW(swUrl: string) {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(swUrl);
            if (registration !== undefined) {
                console.log('Success register sw.js');
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;
                    if (installingWorker == null) {
                        return;
                    }
                };
            }
        } catch (error) {
            console.error('Error during service worker registration:', error);
        }
    } else {
        console.log('ServiceWorker not supported');
    }
}