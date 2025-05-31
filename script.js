window.addEventListener("submit", function (e) {
  e.preventDefault(); // empêche tout rechargement
}, true);

const quizData = [
  {
    question: "Qui a inventé le World Wide Web ?",
    choices: ["Steve Jobs", "Tim Berners-Lee", "Elon Musk", "Mark Zuckerberg"],
    answer: 1,
    points: 3
  },
  {
    question: "Le Web 1.0 se distingue du Web 2.0 principalement par :",
    choices: ["Une meilleure vitesse", "L'interactivité", "Le design responsive", "L'usage de CSS"],
    answer: 1,
    points: 4
  },
  {
    question: "Quel est le rôle principal d’un développeur back-end ?",
    choices: ["Créer l’interface graphique", "Gérer les réseaux sociaux", "Coder la logique serveur", "Tester le produit"],
    answer: 2,
    points: 4
  },
  {
    question: "Que représente le DOM en JavaScript ?",
    choices: ["Une base de données", "Structure de navigation", "Arborescence de la page", "Langage de style"],
    answer: 2,
    points: 3
  },
  {
    question: "Quel avantage majeur apportent React ou Vue.js ?",
    choices: ["Ils remplacent HTML", "Réduisent le chargement", "Créent des interfaces complexes", "Ajoutent des images"],
    answer: 2,
    points: 4
  },
  {
    question: "Quels langages sont indispensables pour le front-end ?",
    choices: ["Python, PHP", "HTML, CSS, JS", "C++, Rust", "Bash, Ruby"],
    answer: 1,
    points: 3
  },
  {
    question: "À quoi sert le CSS ?",
    choices: ["Stocker les données", "Logique serveur", "Interactivité", "Styliser HTML"],
    answer: 3,
    points: 4
  },

    {
    question: "Quelle est la structure minimale correcte d’un fichier HTML ?",
    choices: [
      "<head> <body> <html>",
      "<html> <head> <footer>",
      "<!DOCTYPE html> <html> <head> <body>",
      "<html> <div> <section>"
    ],
    answer: 2,
    points: 5
  },
  {
    question: "La balise <script> en HTML permet de :",
    choices: [
      "Ajouter des styles CSS",
      "Lier une base de données",
      "Exécuter du code JavaScript",
      "Ajouter des images"
    ],
    answer: 2,
    points: 3
  },
  {
    question: "Que fait un sélecteur CSS ?",
    choices: [
      "Il sélectionne des fichiers",
      "Il cible des éléments HTML à styliser",
      "Il trie les résultats",
      "Il remplace des images"
    ],
    answer: 1,
    points: 4
  },
  {
    question: "Quelle règle CSS colore un h1 en bleu ?",
    choices: [
      "h1:color=blue;",
      "h1 { background: blue; }",
      "h1 { color: blue; }",
      "#h1 { style: blue; }"
    ],
    answer: 2,
    points: 5
  },
  {
    question: "Un événement JavaScript est :",
    choices: [
      "Une commande terminal",
      "Une interaction déclenchée par l’utilisateur",
      "Une structure CSS",
      "Une variable JS"
    ],
    answer: 1,
    points: 3
  },
  {
    question: "Quelle méthode JS permet d’écouter un clic sur un bouton ?",
    choices: [
      "addClass()",
      "onClickHandler()",
      "addEventListener(\"click\", ...)",
      "setTimeout(\"click\")"
    ],
    answer: 2,
    points: 6
  },
  {
    question: "Qu’est-ce qu’une requête asynchrone ?",
    choices: [
      "Une requête bloquante",
      "Une requête qui recharge toute la page",
      "Une requête qui s’exécute en arrière-plan",
      "Une requête non sécurisée"
    ],
    answer: 2,
    points: 3
  },
  {
    question: "Quelle méthode JS est utilisée pour faire une requête HTTP moderne ?",
    choices: [
      "sendData()",
      "postRequest()",
      "fetch()",
      "writeData()"
    ],
    answer: 2,
    points: 6
  },
  {
    question: "Dans le modèle client-serveur, le client est :",
    choices: [
      "Le serveur de base de données",
      "L’utilisateur final",
      "Le back-end",
      "Le système d’exploitation"
    ],
    answer: 1,
    points: 3
  },
  {
    question: "Quel est le rôle de PostgreSQL ?",
    choices: [
      "Styliser les pages",
      "Gérer les certificats",
      "Stocker et gérer les données",
      "Créer des animations"
    ],
    answer: 2,
    points: 3
  },
  {
    question: "Django interagit avec une base de données via :",
    choices: [
      "Des fichiers texte",
      "Des fichiers JSON",
      "Le modèle MVC et ORM",
      "Le fichier HTML"
    ],
    answer: 2,
    points: 5
  },
  {
    question: "Dans un modèle Django, chaque champ est :",
    choices: [
      "Une image",
      "Une vue",
      "Un attribut de classe représentant une colonne",
      "Un fichier CSS"
    ],
    answer: 2,
    points: 5
  },
  {
    question: "Quel code définit un modèle `Participant` en Django ?",
    choices: [
      "Une balise HTML",
      "Un objet JavaScript",
      "Une classe Python avec des champs de modèle",
      "Une table Excel"
    ],
    answer: 2,
    points: 10
  }

];

let currentQuestion = 0;
let totalScore = 0;
let selectedAnswer = null;

let questionTimerInterval; // Pour stocker l'ID de l'intervalle du timer
let timeLeftForQuestion;   // Temps restant pour la question actuelle
const TIME_PER_QUESTION = 65; // 1 minute et 5 secondes = 65 secondes

const timerQuestionEl = document.getElementById('timer-question'); // NOUVEAU

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const resultBox = document.getElementById('result-box');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = '';

  q.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.onclick = () => {
      document.querySelectorAll('li').forEach(el => el.style.background = '#222');
      li.style.background = '#00f7ff';
      li.style.color = '#000';
      selectedAnswer = index;
      nextBtn.disabled = false;
    };
    choicesEl.appendChild(li);
  });

  nextBtn.disabled = true;
}
nextBtn.onclick = () => {
  stopQuestionTimer(); // Arrêter le timer quand on clique sur "Suivant"

  const q = quizData[currentQuestion];

  // Si le temps n'était pas écoulé ET qu'aucune réponse n'a été sélectionnée,
  // on pourrait considérer cela comme une réponse incorrecte ou invalide.
  // Cependant, le bouton "Suivant" est désactivé jusqu'à sélection ou temps écoulé.
  // Si le temps s'est écoulé, `selectedAnswer` pourrait être null ou la dernière réponse cliquée.

  // Stocker la réponse sélectionnée (si une réponse a été sélectionnée)
  // Si selectedAnswer est null (temps écoulé sans clic, ou non sélectionné), il sera stocké comme null
  userResponses.push({
    question: q.question,
    selected: selectedAnswer, // peut être null si le temps s'est écoulé sans sélection
    correct: q.answer
  });

  // Ajouter des points seulement si une réponse correcte a été sélectionnée activement
  if (selectedAnswer !== null && selectedAnswer === q.answer) {
    totalScore += q.points;
  }

  selectedAnswer = null; // Réinitialiser pour la prochaine question
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    // Quiz terminé
    document.getElementById("quiz-box").classList.add("hidden");
    const scoreElementForLoading = document.getElementById("score");
    if (scoreElementForLoading) {
      const maxScore = quizData.reduce((acc, q) => acc + q.points, 0); // Calculer le score max possible
      scoreElementForLoading.textContent = `Quiz terminé ! Calcul de votre score final... Votre score actuel est de ${totalScore} / ${maxScore}.`;
    }
    showSection("result-box");
    console.log("LOG: Fin du quiz. Tentative de soumission des résultats...");

    fetch(`${API_BASE}/submit-quiz/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify({
        email: currentEmail,
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        note: totalScore,
        reponses: userResponses
      })
    })
    .then(res => {
      console.log(`LOG: Réponse de /submit-quiz/ reçue. Statut: ${res.status}`);
      if (!res.ok) {
        return res.json().then(errData => {
            console.error("Erreur de sauvegarde du quiz (détails du serveur):", errData);
            throw new Error(errData.message || `Erreur HTTP ${res.status} lors de la soumission du quiz.`);
        }).catch(() => {
            console.error(`Erreur de sauvegarde du quiz. Statut: ${res.status} ${res.statusText}`);
            throw new Error(`Erreur HTTP ${res.status} ${res.statusText} lors de la soumission du quiz.`);
        });
      }
      console.log("LOG: Quiz soumis avec succès au backend.");
      return res.json();
    })
    .then(data => {
      console.log("LOG: Données reçues après soumission du quiz:", data);
      return afficherResultatsComplet();
    })
    .catch(error => {
      console.error("LOG ERREUR: Échec lors de la soumission du quiz ou de l'affichage des résultats finaux:", error);
      const scoreEl = document.getElementById("score");
      if (scoreEl) {
        scoreEl.innerHTML = `Une erreur est survenue lors de la finalisation de votre quiz : <br><i>${error.message}</i><br>Veuillez contacter l'administrateur.`;
      }
    });
  }
};


let API_BASE;
const githubPagesHostname = "shegoub.github.io"; // **METTEZ VOTRE VRAI NOM D'UTILISATEUR**
const renderApiHostname = "sitersv.onrender.com";   // **METTEZ VOTRE URL RENDER (sans /api)**

if (window.location.hostname === githubPagesHostname || window.location.hostname.endsWith(`.${githubPagesHostname}`)) {
    API_BASE = `https://${renderApiHostname}/api`; 
    console.log("Mode Production détecté. API_BASE:", API_BASE);
} else {
    API_BASE = "http://127.0.0.1:8000/api"; // Dev locale
    console.log("Mode Développement détecté. API_BASE:", API_BASE);
}

async function checkStartTime() {
  const res = await fetch(`${API_BASE}/quiz/time/`);
  const data = await res.json();
  if (data.start_time) {
    const start = new Date(data.start_time);
    const now = new Date();
    if (now >= start) {
      document.getElementById("quiz-box").classList.remove("hidden");
      document.getElementById("timer").classList.add("hidden");
    } else {
      const diff = Math.floor((start - now) / 1000);
      document.getElementById("timer").textContent = "Le quiz démarre dans : " + diff + " secondes";
      setTimeout(checkStartTime, 1000);
    }
  } else {
    document.getElementById("timer").textContent = "Quiz non encore programmé.";
  }
}



let currentEmail = "";
let currentPrenom = "";
let userResponses = [];

async function checkIfAdmin() {
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("email-msg");

  if (!email) {
    msg.textContent = "Veuillez entrer un e-mail.";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/is-admin/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (data.is_admin) {
      const customAdminUrl = '/app/admin-panel/'; // **ADAPTEZ CETTE URL**
      window.location.href = `https://${renderApiDomain}/admin/login/?next=${encodeURIComponent(customAdminUrl)}`;
      return;
    }

    if (!data.exists) {
      msg.textContent = "Adresse e-mail non reconnue.";
      return;
    }

    if (data.a_participe) {
  // Construire l'URL avec l'email en paramètre
  const resultsUrl = `result_public.html?email=${encodeURIComponent(email)}`;
  msg.innerHTML = `Vous avez déjà participé au quiz. <br><a href="${resultsUrl}">Cliquez ici pour voir vos résultats.</a>`;
  msg.style.color = "lightgreen";
  // Plus besoin d'event listener ici, le lien redirige directement.
  return;
    }

    currentEmail = email;
    msg.textContent = "";
    showSection("identity-form");
  } catch (err) {
    msg.textContent = "Erreur de connexion au serveur.";
  }
}


function verifyUser() {
  console.log("Bouton Valider cliqué !");
}

async function verifyUser() {
  const email = document.getElementById("email").value.trim();
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const msg = document.getElementById("user-message");

  try {
    const res = await fetch(`${API_BASE}/verify-email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , 'X-CSRFToken': getCookie('csrftoken') },
      body: JSON.stringify({ email: email })
    });

    if (!res.ok) {
      msg.textContent = "Erreur " + res.status + " lors de la vérification.";
      return;
    }

    const data = await res.json();
    if (!data.exists) {
      msg.textContent = "Adresse e-mail non enregistrée.";
      return;
    }

    msg.textContent = "Email vérifié ! Bienvenue " + prenom;

    // Enregistrement du nom/prénom
    await fetch(`${API_BASE}/save-name/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , 'X-CSRFToken': getCookie('csrftoken')},
      body: JSON.stringify({ email, nom, prenom })
    });

    // Transition vers le quiz
    document.getElementById("user-form").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    loadQuestion();

  } catch (error) {
    console.error(error);
    msg.textContent = "Erreur lors de la connexion au serveur.";
  }
}


function submitIdentity() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const msg = document.getElementById("name-msg");

  if (!nom || !prenom) {
    msg.textContent = "Tous les champs sont obligatoires.";
    return;
  }

  console.log("Soumission du nom et prénom", nom, prenom);

  fetch(`${API_BASE}/save-name/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" , 'X-CSRFToken': getCookie('csrftoken') },

    body: JSON.stringify({ email: currentEmail, nom, prenom })
  })
  .then(response => {
    if (!response.ok) {
      // Si le serveur renvoie une erreur (4xx, 5xx)
      // On la transforme en erreur JavaScript pour qu'elle soit attrapée par le .catch()
      return response.json().then(errData => { // Essayez de récupérer plus de détails de l'erreur
         throw new Error(errData.message || `Erreur HTTP ${response.status}`);
      });
    }
    return response.json(); // Ou response.text() si le serveur ne renvoie pas de JSON en cas de succès
  })
  .then(data => { // data contient la réponse du serveur en cas de succès
    console.log("Nom sauvegardé avec succès:", data); // Loggez la réponse pour voir
    currentPrenom = prenom;
    document.getElementById("user-prenom").textContent = prenom;
    showSection("welcome-box");
    checkQuizAvailability();
  })
  .catch(error => {
    console.error("Erreur lors de la soumission de l'identité (save-name):", error);
    msg.textContent = `Erreur: ${error.message}. Veuillez réessayer.`;
  });
}

async function checkQuizAvailability() {
  const status = document.getElementById("quiz-status");
  const btn = document.getElementById("startBtn");
  console.log("LOG: checkQuizAvailability() appelée - DÉBUT");

  if (!status || !btn) {
    console.error("LOG ERREUR: Éléments DOM 'quiz-status' ou 'startBtn' non trouvés !");
    return;
  }

  try {
    console.log(`LOG: Tentative de fetch vers ${API_BASE}/quiz/time/`);
    const res = await fetch(`${API_BASE}/quiz/time/`);
    console.log(`LOG: Réponse de fetch reçue pour /quiz/time/. Statut HTTP: ${res.status}`);

    if (!res.ok) {
      let errorBody = "Impossible de lire le corps de l'erreur.";
      try {
        errorBody = await res.text(); // Essayer de lire le corps de l'erreur comme texte
      } catch (e) {
        console.warn("LOG ATTENTION: Impossible de lire le corps de la réponse d'erreur pour /quiz/time/", e);
      }
      console.error(`LOG ERREUR: Échec du fetch vers /quiz/time/. Statut ${res.status}. Réponse: ${errorBody}`);
      throw new Error(`Erreur HTTP ${res.status} lors de la récupération du temps du quiz. Détails: ${errorBody}`);
    }

    // Important: Vérifier le Content-Type avant de parser en JSON
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        console.log("LOG: La réponse est de type JSON. Tentative de parsing...");
        const data = await res.json();
        console.log("LOG: Données JSON parsées avec succès pour /quiz/time/:", data);

        if (!data || typeof data.start_time === 'undefined') { // Vérification plus robuste
          console.warn("LOG ATTENTION: 'start_time' est manquant ou undefined dans la réponse de /quiz/time/.", data);
          status.textContent = "Le quiz n’est pas encore programmé (données invalides reçues).";
          btn.classList.add("hidden"); // S'assurer que le bouton reste caché
          return;
        }
        
        console.log("LOG: Start time reçu de l'API :", data.start_time);

        const now = new Date();
        const start = new Date(data.start_time);

        if (isNaN(start.getTime())) { // Vérifier si la date est valide
            console.error("LOG ERREUR: 'start_time' reçu n'est pas une date valide:", data.start_time);
            status.textContent = "Erreur de format de date pour le début du quiz.";
            btn.classList.add("hidden");
            return;
        }

        console.log("LOG: Date actuelle:", now.toISOString(), "Date de début du quiz:", start.toISOString());

        if (now >= start) {
          console.log("LOG: Le quiz est disponible MAINTENANT.");
          status.textContent = "Le quiz est disponible.";
          btn.classList.remove("hidden");
        } else {
          const seconds = Math.floor((start - now) / 1000);
          console.log(`LOG: Le quiz sera disponible dans ${seconds} secondes.`);
          status.textContent = `Le quiz sera disponible dans ${seconds} secondes...`;
          btn.classList.add("hidden"); // S'assurer que le bouton est caché si le quiz n'est pas encore prêt

          // setTimeout(checkQuizAvailability, 10000); // Laissons ceci commenté pour l'instant pour éviter des complexités
        }
    } else {
        const responseText = await res.text();
        console.error("LOG ERREUR: La réponse de /quiz/time/ n'est pas du JSON. Content-Type:", contentType, "Réponse:", responseText);
        status.textContent = "Erreur: format de réponse inattendu du serveur pour l'heure du quiz.";
        btn.classList.add("hidden");
    }

  } catch (err) {
    console.error("LOG ERREUR détaillée dans checkQuizAvailability:", err);
    // Afficher l'erreur à l'utilisateur de manière plus informative
    if (status) { // Vérifier si status existe toujours
        status.textContent = `Erreur lors de la vérification de la disponibilité du quiz: ${err.message}. Vérifiez la console pour plus de détails.`;
    }
    if (btn) btn.classList.add("hidden"); // Cacher le bouton en cas d'erreur
  }
  console.log("LOG: checkQuizAvailability() appelée - FIN");
}


function startQuiz() {
  stopQuestionTimer(); // Arrêter tout timer précédent au cas où
  showSection("quiz-box");
  currentQuestion = 0;
  totalScore = 0;
  userResponses = [];
  selectedAnswer = null; // S'assurer que selectedAnswer est null au début du quiz
  loadQuestion();
}
function checkAdminOrQuizUser() {
  const email = document.getElementById("email").value.trim();
  checkIfAdmin(email);  // <- la fonction ci-dessus
}


function verifyUserAsParticipant(email) {
  currentEmail = email;
  showSection("identity-form");
}



function showSection(idToShow) {
  console.log(`LOG: showSection appelée pour l'ID : ${idToShow}`);

  // Cacher toutes les sections qui ont la classe .form-step
  // (Ces sections sont maintenant à l'intérieur de <main class="quiz-content">)
  document.querySelectorAll('.form-step').forEach(section => {
    section.classList.add('hidden');    // Applique le style .hidden (ex: display: none ou opacity:0, max-height:0)
    section.classList.remove('visible'); // Retire le style .visible (qui pourrait forcer l'affichage)
  });

  // Afficher la section cible
  const sectionTarget = document.getElementById(idToShow);

  if (sectionTarget) {
    // S'assurer que la section cible a bien la classe .form-step si elle ne l'a pas déjà
    // (Normalement, elle devrait l'avoir si elle fait partie des étapes du quiz)
    if (!sectionTarget.classList.contains('form-step')) {
        console.warn(`ATTENTION: La section ${idToShow} n'a pas la classe .form-step. L'affichage pourrait ne pas être optimal.`);
    }

    sectionTarget.classList.remove('hidden'); // Retire le style .hidden
    sectionTarget.classList.add('visible');   // Applique le style .visible (ex: display: block, opacity: 1)
    console.log(`LOG: Section ${idToShow} rendue visible.`);
  } else {
    console.error(`LOG ERREUR: showSection - Élément avec ID '${idToShow}' non trouvé !`);
  }
}


async function afficherResultatsComplet() {
  const res = await fetch(`${API_BASE}/score-details/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: currentEmail })
  });

  if (!res.ok) {
        const errData = await res.json().catch(() => ({})); // Essayez de lire le corps de l'erreur
        throw new Error(errData.message || `Erreur HTTP ${res.status} lors de la récupération des détails du score.`);
    }

  const data = await res.json();

  const resultBox = document.getElementById("result-box");
  const score = document.getElementById("score");

  

  score.innerHTML = `
    Note théorique : <b>${data.note_theorique} / 100</b><br>
    Note pratique : <b>${data.note_pratique > 0 ? data.note_pratique : "pas encore disponible"}</b><br>
  `;

  if (data.note_pratique > 0) {
    const finale = data.note_finale;
    score.innerHTML += `Note finale : <b>${finale} / 100</b><br>Mention : <b>${data.mention}</b><br><br>`;

    if (data.certificat) {
      const btn = document.createElement("button");
      btn.textContent = "📄 Télécharger mon certificat";
      btn.onclick = () => {
        window.open(`${API_BASE}/certificat/${currentEmail}/`, "_blank");
      };
      resultBox.appendChild(btn);
    } else {
      score.innerHTML += `<p style="color: red;">Vous n'avez pas atteint le score requis pour obtenir un certificat.</p>`;
    }
  } else {
    score.innerHTML += `<p style="color: orange;">Le score final sera affiché une fois la note pratique ajoutée par l'administrateur.</p>`;
    
  }
}


function updateTimerDisplay() {
  const minutes = Math.floor(timeLeftForQuestion / 60);
  const seconds = timeLeftForQuestion % 60;
  if (timerQuestionEl) { // Vérifier si l'élément existe
    timerQuestionEl.textContent = `Temps restant : ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

function stopQuestionTimer() {
  clearInterval(questionTimerInterval);
  if (timerQuestionEl) timerQuestionEl.textContent = ""; // Effacer l'affichage du timer
}

function handleTimeUp() {
  stopQuestionTimer();
  const q = quizData[currentQuestion];

  // Afficher la bonne réponse
  choicesEl.childNodes.forEach((li, index) => {
    li.onclick = null; // Désactiver les clics sur les choix
    li.style.cursor = 'default';
    if (index === q.answer) {
      li.style.background = '#4CAF50'; // Vert pour la bonne réponse
      li.style.color = 'white';
    } else {
      li.style.background = '#333'; // Un gris plus foncé pour les autres
      li.style.color = 'grey';
    }
    // Si une réponse avait été sélectionnée par l'utilisateur avant la fin du temps, la marquer aussi
    if (selectedAnswer !== null && index === selectedAnswer && selectedAnswer !== q.answer) {
        li.style.background = '#f44336'; // Rouge pour une mauvaise réponse sélectionnée
        li.style.color = 'white';
    }
  });

  // Indiquer que la réponse pour cette question est incorrecte (ou non répondue à temps)
  // Tu peux décider si ne pas répondre à temps compte comme 0 point ou si selectedAnswer reste null
  // Ici, on considère que si le temps est écoulé, la réponse n'est pas comptée (sauf si une avait été sélectionnée avant)
  // Si aucune réponse n'a été sélectionnée, selectedAnswer reste null.
  // Si une réponse a été sélectionnée, elle sera évaluée normalement par nextBtn.onclick

  questionEl.textContent = `Temps écoulé ! La bonne réponse était : ${q.choices[q.answer]}`;
  nextBtn.disabled = false; // Permettre de passer à la question suivante
}

function startQuestionTimer() {
  timeLeftForQuestion = TIME_PER_QUESTION;
  updateTimerDisplay(); // Afficher le temps initial

  questionTimerInterval = setInterval(() => {
    timeLeftForQuestion--;
    updateTimerDisplay();
    if (timeLeftForQuestion <= 0) {
      handleTimeUp();
    }
  }, 1000);
}

function loadQuestion() {
  stopQuestionTimer(); // Arrêter le timer précédent s'il y en avait un
  selectedAnswer = null; // Réinitialiser la réponse sélectionnée pour la nouvelle question

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = '';

  q.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.onclick = () => {
      // Si le temps est écoulé, ne plus rien faire en cliquant sur les choix
      if (timeLeftForQuestion <= 0) return;

      document.querySelectorAll('#choices li').forEach(el => {
          el.style.background = '#222'; // Couleur de fond par défaut
          el.style.color = 'white'; // Couleur de texte par défaut
        });
      li.style.background = '#00f7ff'; // Couleur de fond pour sélection
      li.style.color = '#000';     // Couleur de texte pour sélection
      selectedAnswer = index;
      nextBtn.disabled = false;
    };
    choicesEl.appendChild(li);
  });

  nextBtn.disabled = true; // Désactiver "Suivant" jusqu'à ce qu'une réponse soit choisie ou que le temps soit écoulé
  startQuestionTimer(); // Démarrer le timer pour la nouvelle question
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
