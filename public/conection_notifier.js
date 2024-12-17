window.addEventListener('offline', () => {
    alert('Se ha perdido la conexión');
});

window.addEventListener('online', () => {
    alert('Se ha reestablecido la conexión');
});