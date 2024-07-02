import React from 'react';

function CardInfo() {
  return (
    <div className="py-16">
      <div className="xl:container mx-auto px-6 text-gray-500 md:px-12">
        <div>
          <h2 className="mt-4 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
            Réservez vos séances de sport facilement
          </h2>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png"
                className="w-12 h-12 mx-auto mb-6"
                alt="Icon"
              />
              <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-2">
                Découvrez les séances
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Explorez une variété de séances de sport, des entraînements en salle aux cours de yoga en plein air.
              </p>
              <a
                href="#"
                className="flex items-center mt-4 text-sm text-primary dark:text-primary hover:text-primary-dark transition duration-300"
              >
                Voir les séances
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4341/4341134.png"
                className="w-12 h-12 mx-auto mb-6"
                alt="Icon"
              />
              <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-2">
                Réservez en ligne
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Réservez instantanément vos séances préférées et gérez votre emploi du temps depuis votre appareil.
              </p>
              <a
                href="#"
                className="flex items-center mt-4 text-sm text-primary dark:text-primary hover:text-primary-dark transition duration-300"
              >
                Réserver maintenant
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4341/4341160.png"
                className="w-12 h-12 mx-auto mb-6"
                alt="Icon"
              />
              <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-2">
                Personnalisez votre expérience
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Adaptez votre séance selon vos préférences, de l'intensité à l'instructeur.
              </p>
              <a
                href="#"
                className="flex items-center mt-4 text-sm text-primary dark:text-primary hover:text-primary-dark transition duration-300"
              >
                Découvrir plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4341/4341025.png"
                className="w-12 h-12 mx-auto mb-6"
                alt="Icon"
              />
              <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-2">
                Gérez vos réservations
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Consultez et modifiez vos réservations, et recevez des rappels pour ne rien manquer.
              </p>
              <a
                href="#"
                className="flex items-center mt-4 text-sm text-primary dark:text-primary hover:text-primary-dark transition duration-300"
              >
                Voir mes réservations
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
