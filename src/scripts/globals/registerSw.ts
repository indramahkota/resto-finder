export default async function registerSw(): Promise<void> {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
            console.log('Pendaftaran ServiceWorker berhasil');
        } catch (error) {
            console.log(error, 'Pendaftaran ServiceWorker gagal');
        }
    } else {
        console.log('ServiceWorker tidak didukung browser ini.');
    }
}