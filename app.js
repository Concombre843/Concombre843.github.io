// Variables globales
let accessToken = '';

// Fonction pour gérer l'authentification
function handleAuth() {
    const clientId = '23PGTQ'; // Remplacez par votre vrai Client ID Fitbit
    const redirectUri = encodeURIComponent('https://[votre-nom-utilisateur].github.io/callback.html');
    const scope = encodeURIComponent('sleep profile');
    const authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
}

// Fonction pour récupérer les données de sommeil
async function getSleepData() {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${today}.json`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    return await response.json();
}

// Fonction pour afficher les données de sommeil
function displaySleepData(data) {
    const sleepSummary = data.summary;
    const ctx = document.getElementById('sleepChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Éveil', 'REM', 'Léger', 'Profond'],
            datasets: [{
                data: [
                    sleepSummary.stages.wake,
                    sleepSummary.stages.rem,
                    sleepSummary.stages.light,
                    sleepSummary.stages.deep
                ],
                backgroundColor: ['red', 'blue', 'yellow', 'green']
            }]
        }
    });
}

// Fonction pour définir une alarme (à implémenter)
async function setAlarm(time) {
    console.log('Alarme définie pour', time);
    // Implémentation à venir
}

// Écouteurs d'événements
document.getElementById('authButton').addEventListener('click', handleAuth);
document.getElementById('setAlarmButton').addEventListener('click', () => {
    // Logique pour définir l'alarme intelligente (à implémenter)
    console.log('Bouton d\'alarme cliqué');
});

// Vérifiez si l'utilisateur est déjà authentifié
if (localStorage.getItem('fitbitToken')) {
    accessToken = localStorage.getItem('fitbitToken');
    document.getElementById('dataContainer').style.display = 'block';
    getSleepData().then(displaySleepData);
}
