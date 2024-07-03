// src/hooks/utils.jsx

// Exemple de fonction utilitaire pour trouver tous les rendez-vous pour un jour donné
export function findAllAppointmentsForDay(date, tasks) {
    // Implémentation de la logique pour trouver les rendez-vous pour la journée spécifiée
    const appointments = tasks.filter(task => {
      // Comparaison de la date de début de la tâche avec la date spécifiée
      return task.startDate.toDateString() === date.toDateString();
    });
  
    return appointments;
  }
  
  // Exemple d'une autre fonction utilitaire
  export function formatDate(date) {
    // Implémentation pour formater la date selon vos besoins
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  
  // Vous pouvez ajouter d'autres fonctions ou modules ici selon vos besoins
  
  // Export par défaut d'une constante ou d'une fonction
  export const utilityConstant = 'some value';
  