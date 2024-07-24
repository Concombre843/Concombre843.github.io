// Fonction pour définir une alarme (à implémenter)
   async function setAlarm(time) {
       // Implémentation à venir
       console.log('Alarme définie pour', time);
   }

   // Écouteurs d'événements
   document.getElementById('authButton').addEventListener('click', handleAuth);
   document.getElementById('setAlarmButton').addEventListener('click', () => {
       // Logique pour définir l'alarme intelligente (à implémenter)
   });

   // Vérifiez si l'utilisateur est déjà authentifié
   if (localStorage.getItem('fitbitToken')) {
       accessToken = localStorage.getItem('fitbitToken');
       document.getElementById('dataContainer').style.display = 'block';
       getSleepData().then(displaySleepData);
   }
