let correctAnswers = {};
let errorCounts = {};

// Fonction pour initialiser les boutons pour chaque question
function initializeButtons() {
  for (let i = 1; i <= 9; i++) {
    createButtons(i);
  }
}

function nextPage() {
  window.location.replace("LWMeetTalk.html");
}

// Fonction pour créer les boutons numériques pour une question donnée
function createButtons(indice) {
  const buttonsContainer = document.getElementById(`buttons${indice}`);

  for (let i = 0; i <= 9; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.id = `button${indice}-${i}`;
    button.addEventListener("click", () => {
      if (!correctAnswers.hasOwnProperty(indice)) {
        checkAnswer(indice, i);
      }
    });
    buttonsContainer.appendChild(button);
  }

  errorCounts[indice] = 0; // Initialisation du compteur d'erreurs pour chaque question
}

// Fonction pour vérifier la réponse à une question
function checkAnswer(indice, userAnswer) {
  const feedback = document.getElementById(`feedback${indice}`);
  let correctDigit = getCorrectDigit(indice);

  if (userAnswer === correctDigit) {
    handleCorrectAnswer(indice, userAnswer);
  } else {
    handleIncorrectAnswer(indice);
  }
}

// Fonction pour obtenir le chiffre correct en fonction de l'indice de la question
function getCorrectDigit(indice) {
  switch (indice) {
    case 1:
      return 6;
    case 2:
      return 9;
    case 3:
      return 4;
    case 4:
      return 3;
    case 5:
      return 9;
    case 6:
      return 1;
    case 7:
      return 2;
    case 8:
      return 3;
    case 9:
      return 0;
    default:
      return 0;
  }
}

// Gestion de la réponse correcte à une question
function handleCorrectAnswer(indice, userAnswer) {
  const feedback = document.getElementById(`feedback${indice}`);
  feedback.textContent = "Bonne réponse!";
  feedback.className = "feedback correct";
  correctAnswers[indice] = userAnswer;
  document.getElementById(`digit${indice}`).value = userAnswer;

  const buttonId = `button${indice}-${userAnswer}`;
  const correctButton = document.getElementById(buttonId);
  correctButton.classList.add("correct-button");

  // Désactiver tous les boutons après avoir sélectionné la bonne réponse
  disableButtons(indice);

  // Vérifier si toutes les réponses sont correctes pour appeler handleComplete
  if (Object.keys(correctAnswers).length === 9) {
    handleComplete(); // Appeler la fonction de gestion de l'énigme complète
  } else {
    const nextIndice = indice + 1;
    document.getElementById(`indice${nextIndice}`).style.display = "block";

    // Défilement automatique vers l'indice suivant
    scrollToIndice(nextIndice);
  }
}

// Fonction pour désactiver tous les boutons d'une question donnée
function disableButtons(indice) {
  const buttonsContainer = document.getElementById(`buttons${indice}`);
  const buttons = buttonsContainer.getElementsByTagName("button");
  for (let button of buttons) {
    button.disabled = true;
  }
}

// Gestion de la réponse incorrecte à une question
function handleIncorrectAnswer(indice) {
  errorCounts[indice]++;
  const feedback = document.getElementById(`feedback${indice}`);

  // Vérifier s'il y a déjà un bouton "Un indice ?" dans le feedback
  const existingBtnPopup = feedback.querySelector(".btnPopup");

  if (errorCounts[indice] >= 3 && !existingBtnPopup) {
    feedback.textContent = ""; // Nettoyer le contenu de feedback s'il y a déjà du texte

    // Création du paragraphe pour "Mauvaise réponse !"
    const badAnswerPara = document.createElement("p");
    badAnswerPara.textContent = "Mauvaise réponse !";
    badAnswerPara.className = "bad-answer";
    feedback.appendChild(badAnswerPara);

    // Création du bouton "Un indice ?"
    const btnPopup = document.createElement("button");
    btnPopup.textContent = "Un indice ?";
    btnPopup.classList.add("btnPopup");
    btnPopup.dataset.indice = indice;
    btnPopup.addEventListener("click", openPopup);

    // Ajout du bouton "Un indice ?" sous le paragraphe "Mauvaise réponse !"
    feedback.appendChild(btnPopup);
  } else if (errorCounts[indice] < 3) {
    feedback.textContent = "Mauvaise réponse !";
    feedback.className = "feedback incorrect";
  }
}

// Fonction pour ouvrir la pop-up d'indice
function openPopup(event) {
  const indice = event.target.dataset.indice;
  const popupOverlay = document.getElementById(`popOverlay${indice}`);
  const popup = popupOverlay.querySelector(".popup");
  popup.style.display = "block";
  popupOverlay.style.display = "block";
}

// Fonction pour fermer la pop-up d'indice
function closePopup(event) {
  const popupOverlay = event.target.closest(".popOverlay");
  popupOverlay.style.display = "none";
}

// Fonction appelée lorsque toutes les réponses sont correctes
function handleComplete() {
  // Cacher tous les indices restants
  for (let i = 1; i <= 9; i++) {
    document.getElementById(`indice${i}`).style.display = "none";
  }

  document.getElementById("container").style.display = "none";
  // Afficher la section de numéro complet
  document.getElementById("complete").style.display = "block";

  const overlay = document.getElementById("overlay");
  overlay.classList.remove("active");
}

// Fonction pour afficher les messages après un délai
function displayMessages(messages) {
  const messagesContainer = document.getElementById("messages-container");
  messagesContainer.innerHTML = ""; // Effacer les messages précédents

  messages.forEach((message, index) => {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.classList.add("message");
    messageDiv.style.animationDelay = `${index * 3}s`; // Ajouter un délai d'animation

    messagesContainer.appendChild(messageDiv);
  });

  messagesContainer.style.display = "block"; // Afficher le conteneur de messages
}

// Fonction pour démarrer l'appel après avoir composé le numéro complet
function startCalling() {
  const callText = document.getElementById("callText");
  callText.textContent = "Appel en cours...";

  setTimeout(() => {
    const dial = document.getElementById("dial");
    dial.play();
  }, 3000);

  setTimeout(() => {
    displayMessages([
      "06 : C'est ce que nous sommes !",
      "(19)94 : Ainsi, il est né !",
      "39 : Il est un loup en costume de chauve-souris !",
      "(20)12: Il a rencontré un écrivain, il est devenu écrivain, il a rencontré des poètes, il est devenu poète",
      "30 : Il voulait accomplir plein de chose avant d'atteindre cet âge, mais ça sera à cet âge-là que la boucle sera brisée !",
    ]);
  }, 7000); // Attendre 7 secondes avant d'afficher les messages

  setTimeout(() => {
    const finalMessage = document.getElementById("finalMessage");
    finalMessage.style.display = "block";
    finalMessage.style.color = "white";
  }, 25000);

  setTimeout(() => {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
    const fade = document.getElementById("fade");
    fade.play();
    fade.addEventListener("ended", () => {
      document.body.style.backgroundColor = "black"; // Fondu en noir
    });
  }, 30000);

  setTimeout(() => {
    nextPage();
  }, 40000);
}

// Fonction pour scroller automatiquement vers un indice
function scrollToIndice(indice) {
  const indiceElement = document.getElementById(`indice${indice}`);
  if (indiceElement) {
    indiceElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Initialiser les boutons pour chaque question au chargement de la page
document.addEventListener("DOMContentLoaded", initializeButtons);

// Gestion de la fermeture des pop-ups d'indice
document.querySelectorAll(".btnClose").forEach((btn) => {
  btn.addEventListener("click", closePopup);
});
