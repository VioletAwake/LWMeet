document.addEventListener("DOMContentLoaded", () => {
  const monologueBtn = document.getElementById("monologueBtn");
  const monologueBox = document.getElementById("monologue-box");
  const overlay = document.getElementById("overlay");
  const monologueSong = document.getElementById("monologueSong");
  const repeatLoop = document.getElementById("repeatLoop");
  const loopSong = document.getElementById("loopSong");
  const toBeContinued = document.getElementById("toBeContinued");
  const toBeContinuedMobile = document.getElementById("toBeContinuedMobile");
  const exit = document.getElementById("ending");
  const exitBtn = document.getElementById("exitBtn");

  // Messages du monologue
  const messages = [
    "J'ignore si nous pouvons faire confiance à ce type.",
    "Mais nous n'avons pas d'autre solutions pour sortir de là.",
    "Et qu'est ce qu'il a voulu dire avec Jodie ?",
    "Qu'est ce qu'elle a vécue pour qu'elle puisse devenir une méfiance, voire une menace ?",
    "La Haine, La Délivrance, qu'est ce donc ? Ou plutôt, qui sont-ils ?",
    "Il y a tellement de questions dans ma tête, je ne sais pas par où commencer.",
    "Comment on est arrivé là ? Je me souviens que nous nous sommes décalés de la route pour éviter de percuter un loup noir.",
    "Et si ce n'était pas un hasard ? Et si tout a été manigancé ?",
    "Par qui ? Par quoi ?",
    "Il a dit que nous devons nous rendre à un cinéma qui s'appelle Moonlight.",
    "J'ignore ce qu'il y a là-bas, selon lui, nous se serons pas seuls.",
    "Et ce message que je vois sans arrêt, qu'est ce que ça veut dire ?",
    "Ce message...",
    "...",
    '"Briser la Boucle".',
  ];

  let messageIndex = 0;

  monologueBtn.addEventListener("click", () => {
    startMonologue();
  });

  exitBtn.addEventListener("click", () => {
    handleExit();
  });

  function startMonologue() {
    monologueBtn.style.display = "none";
    monologueBox.style.display = "flex";
    monologueSong.play();
    displayMessages();
  }

  // Fonction pour afficher un message
  function addMessage(message) {
    monologueSong.play();
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;
    monologueBox.appendChild(messageDiv);

    // Animation d'apparition du message
    setTimeout(() => {
      messageDiv.style.opacity = 1;
    }, 100);

    // Défilement automatique vers le bas
    monologueBox.scrollTop = monologueBox.scrollHeight;
  }

  // Fonction pour masquer progressivement les messages
  function fadeOutMessages() {
    const messagesElements = document.querySelectorAll(".message");
    messagesElements.forEach((messageDiv, index) => {
      const delay =
        index === messagesElements.length - 1
          ? index * 2000 + 3000 // Délai supplémentaire pour le dernier message (reste 3 secondes de plus)
          : index * 2000; // Délai normal pour les autres messages

      setTimeout(() => {
        messageDiv.style.opacity = 0; // Disparition progressive du message
      }, delay);
    });

    // Après la disparition du dernier message, fondu en noir
    setTimeout(
      fadeOutSound,
      showOverlay,
      messagesElements.length * 2000 + 10000
    );
    setTimeout(() => {
      overlay.style.opacity = 0;
      showRepeatLoop();
    }, 38000);
    setTimeout(() => {
      repeatLoop.style.background = "#b10404";
      repeatLoop.style.color = "black";
      repeatLoop.style.fontWeight = "bold";
    }, 43000);
  }

  // Fonction pour afficher le fondu en noir
  function showOverlay() {
    overlay.style.opacity = 1;
  }

  function showRepeatLoop() {
    repeatLoop.style.display = "block";

    // Répéter le texte pour remplir l'écran
    const loopText = "Briser la boucle. ".repeat(4000); // Répéter beaucoup de fois
    repeatLoop.querySelector("p").textContent = loopText;

    setTimeout(() => {
      repeatLoop.style.opacity = 1;
      loopSong.play();
    }, 100); // Affichage progressif

    // Masquer après 2 secondes
    setTimeout(() => {
      repeatLoop.style.display = "none";
      loopSong.pause();
    }, 7000);

    setTimeout(() => {
      end();
    }, 9000);
  }

  function end() {
    if (window.matchMedia("(min-width: 768px)").matches) {
      // Afficher la version PC et cacher la version mobile
      toBeContinued.style.display = "block";
      toBeContinuedMobile.style.display = "none";
      toBeContinued.play(); // Jouer la vidéo pour PC
      toBeContinuedMobile.pause(); // S'assurer que la vidéo mobile est en pause
    } else {
      // Afficher la version mobile et cacher la version PC
      toBeContinuedMobile.style.display = "block";
      toBeContinued.style.display = "none";
      toBeContinuedMobile.play(); // Jouer la vidéo pour mobile
      toBeContinued.pause(); // S'assurer que la vidéo PC est en pause
    }

    setTimeout(() => {
      exit.style.display = "flex";
    }, 13000);
    toBeContinued.removeAttribute("controls");
    toBeContinuedMobile.removeAttribute("controls");

    toBeContinuedMobile.addEventListener("ended", function () {
      window.close();
    });
    toBeContinued.addEventListener("ended", function () {
      window.close();
    });
  }

  function handleExit(event) {
    window.close();
  }
  function fadeOutSound() {
    let volume = monologueSong.volume;
    const fadeInterval = setInterval(() => {
      volume -= 0.1;
      if (volume <= 0) {
        volume = 0;
        clearInterval(fadeInterval);
      }
      monologueSong.volume = volume;
    }, 3400);
  }

  // Charger la bonne vidéo au chargement de la page
  window.addEventListener("load", showCorrectVideo);

  // Mettre à jour la vidéo si la taille de la fenêtre change
  window.addEventListener("resize", showCorrectVideo);

  // Fonction principale pour afficher les messages un par un
  function displayMessages() {
    if (messageIndex < messages.length) {
      addMessage(messages[messageIndex]);
      messageIndex++;
      setTimeout(displayMessages, 3000); // Délai entre les messages
    } else {
      // Tous les messages ont été affichés, commencer à les faire disparaître
      setTimeout(fadeOutMessages, 3000); // Attendre 4 secondes avant de commencer la disparition
    }
  }
});
