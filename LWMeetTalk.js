document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const nextButton = document.getElementById("next-message-btn");
  const music = document.getElementById("background-music");
  const phoneGone = document.getElementById("phoneGone");
  const screamer = document.getElementById("screamerImage");
  const screamerSound = document.getElementById("screamerSound");

  // Les messages à afficher

  screamer.style.display = "none";

  const messages = [
    { type: "user", text: "Allô ! Est-ce qu'il y a quelqu'un ?" },
    { type: "bot", text: "Enfin, je t'ai retrouvé !" },
    { type: "user", text: "Qui êtes-vous ?" },
    {
      type: "bot",
      text: "Je ne peux révéler mon identité, mais sache que je suis le même, et je suis l'autre.",
    },
    { type: "user", text: "Je ne comprends pas !" },
    { type: "bot", text: "Patience, tu le sauras bien assez tôt." },
    {
      type: "user",
      text: "C'est vous qui avez laissé ces indices ? Vous vouliez que quelqu'un vous contacte.",
    },
    {
      type: "bot",
      text: 'Pas "quelqu\'un", pour moi "quelqu\'un" veut dire n\'importe qui.',
    },
    { type: "user", text: "Vous parlez toujours de manière si énigmatique ?" },
    {
      type: "bot",
      text: "C'est ce qui fait mon charme, mais avoue que ça t'intrigue, n'est-ce pas ?",
    },
    {
      type: "user",
      text: "Pourriez-vous, au moins, me donner un nom, pour que je puisse mettre quelque chose sur vous ?",
    },
    {
      type: "bot",
      text: "Impossible, mais tu peux me donner un surnom.",
    },
    { type: "user", text: 'Très bien, pourquoi pas "L\'énigmatique" ?' },
    { type: "bot", text: "Charmant." },
    {
      type: "user",
      text: "Et maintenant, pouvez-vous m'expliquer tout ça ? Quel est cet endroit ? Pourquoi vous ? Que faites-vous ?",
    },
    {
      type: "bot",
      text: "Beaucoup de questions pour une première rencontre. Disons que tu es dans un endroit qui fait office de passerelle, qui mène à d'autres réalités alternatives.",
    },
    {
      type: "user",
      text: "Des réalités alternatives ? Alors ça existe pour de vrai ?",
    },
    {
      type: "bot",
      text: "En effet, je sais que tu t'intéresse beaucoup à ça.",
    },
    {
      type: "user",
      text: "Je ne sais pas comment nous sommes arrivés ici ? Nous y étions en voiture en direction de Black Peaks, on a vu un loup au plein milieu de la route. Il faisait nuit, il y avait du brouillard, on a voulu se décaler pour ne pas le percuter, mais on a quitté la route et....nous voilà.",
    },
    {
      type: "bot",
      text: "Si tu es là, c'est qu'il y a une bonne raison, sinon je ne t'aurais pas retrouvé.",
    },
    {
      type: "user",
      text: "J'ignore pourquoi je suis là, je vis quelque chose très perturbante et angoissante. Tout à commencé lorsque j'ai trouvé ce journal.",
    },
    {
      type: "bot",
      text: "Un journal ? Alors, tu es bien l'homme de la situation !",
    },
    {
      type: "user",
      text: "Mouais, je dois faire cette même impression à ces types.",
    },
    {
      type: "bot",
      text: "Quels types ?",
    },
    {
      type: "user",
      text: "Des foux furieux ! J'en ai rencontré un, hier soir. Il a.... Il a décapité la tête d'un professeur. Il y avait du sang partout. Il s'en est pris à moi et à...",
    },
    {
      type: "bot",
      text: "...Jodie ?",
    },
    {
      type: "user",
      text: "Ouais, comment vous le savez ? Vous la connaissez ?",
    },
    {
      type: "bot",
      text: "On peut dire ça. Et ce type ? Est-ce qu'il avait le visage très tiré, les yeux rouges, le regard haineux ? Du sang partout, qui sortent des yeux et de la bouche ? Une voix bizarre ?",
    },
    {
      type: "user",
      text: "Oui, c'est exact ! Comment vous savez tout ça ? Qui êtes-vous, bon sang ?",
    },
    {
      type: "bot",
      text: "Tout ce que tu dois savoir, c'est que je suis quelqu'un qui pourrait être la conclusion de tout ça. Si toutes les pièces se mettent en place, et que ma réalité puisse exister, que je puisse exister.",
    },
    { type: "user", text: "J'ai vraiment du mal à vous suivre !" },
    {
      type: "bot",
      text: "Ecoute, t. v.. ...o.r être très .r..nt .i t. n. veux pas ..nir ..... ... ....sseur.",
    },
    {
      type: "user",
      text: "Allô ! Je vous entends mal ! Vous êtes toujours là ??",
    },
    {
      type: "bot",
      text: "...",
    },
    {
      type: "bot",
      text: "...",
    },
    {
      type: "bot",
      text: "...",
    },
    {
      type: "bot",
      text: "...",
    },
    {
      type: "user",
      text: "Bon sang ! Je l'ai perdu !",
    },
    {
      type: "bot",
      text: "Pas vraiment, mais c'était trop beau pour durer, ce téléphone commence à se fatiguer, et c'est la seule qui permet de te contacter.",
    },
    {
      type: "bot",
      text: "La construire m'a pris beaucoup de temps, et je n'ai ni le temps, ni les moyens, ni l'envie d'en construire une autre.",
    },
    {
      type: "user",
      text: "Où est-ce que vous êtes ? Est-ce qu'on peut se voir ? J'ignore où nous sommes, on dirait une rue d'une ville très New-Yorkaise. Il fait nuit et la pluie devient de plus en dense.",
    },
    {
      type: "bot",
      text: "Impossible ! Nous ne devons pas nous voir, les conséquences seront terribles, et les enjeux sont trop importants, pas question d'échouer à nouveau.",
    },
    {
      type: "user",
      text: "Que voulez-vous dire ?",
    },
    {
      type: "bot",
      text: "T'occupes ! Je n'ai plus beaucoup de temps, tu dois te rendre au cinéma Moonlight, il doit y avoir quelque chose pour avancer. Mais fais gaffe, je ne serais pas étonné que quelques tarés trainent dans le coin. En effet, ils sont partout, même ici.",
    },
    { type: "user", text: "Et vous ?" },
    {
      type: "bot",
      text: "T'occupes, je t'ai dis. J'ai d... .. ..a. .... .l faut que .... .... ... ..... .. .......",
    },
    {
      type: "user",
      text: "Allô ! Allô !!",
    },
    {
      type: "bot",
      text: "Une dernière chose, fais gaffe avec Jodie, j'ignore ce qu'il pourrait se passer avec elle, après ce qu'elle a vécue.",
    },
    {
      type: "bot",
      text: "C'est justement ce que veut La Haine. C'est comme ça qu'il possède les gens et les rend violents et dangereux. Il se sert de leurs peurs, leurs traumatismes et de leurs pensées négatives.",
    },
    {
      type: "bot",
      text: "Et comme si ce n'était pas assez pénible, si La Délivrance apprend que telle ou telle personne est possédée par la Haine, il les libère.",
    },
    {
      type: "user",
      text: "C'est plutôt une bonne nouvelle, non ?",
    },
    {
      type: "bot",
      text: "Non, au contraire ! Méfie-toi de son apparance et de son nom. Il les libère de La Haine, en effet, mais pas de la bonne manière. Il leur offre un choix, vivre dans la Haine, ou se libérer de tout, en s'otant la vie.",
    },
    {
      type: "user",
      text: "Attendez, vous dites que Jodie a vécu quelque chose ? Qu'est ce que qu'elle a vécu ? Vous croyez qu'elle est en danger ?",
    },
    {
      type: "user",
      text: "Vous croyez qu'elle....peut s'en prendre à moi ?",
    },
    {
      type: "bot",
      text: "J'espère vraiment que tout se passera bien, mais j'ai vu beaucoup de personnes souffrir et avoir l'une des deux fins : La vie avec la haine, ou \"la paix\" par la mort. Si Jodie se fait posséder, je crains qu'on ne peut plus rien faire pour elle.",
    },
    {
      type: "bot",
      text: "Si par malheur ça arrive, sois La Délivrance la trouve, sois......sois on doit la....",
    },
    {
      type: "user",
      text: "Vous ne....parlez de la....",
    },
    {
      type: "bot",
      text: "...",
    },
    {
      type: "bot",
      text: "...",
    },
    {
      type: "bot",
      text: "...",
    },
    {
      type: "user",
      text: "Allô ! ALLÔ !!! ATTENDEZ !!! J'ai encore d'autres questions, ne me quittez pas comme...",
    },
    {
      type: "bot",
      text: "Connexion interrompue.......",
    },
    {
      type: "user",
      text: "Merde !",
    },
  ];

  const glitchPeriods = [
    { start: 30, end: 37 }, // Premier passage de glitch
    { start: 45, end: 46 }, // Deuxième passage de glitch
    { start: 57, end: messages.length - 2 }, // Troisième passage de glitch
  ];

  let messageIndex = 0;
  let musicPlayed = false;
  let glitchActive = false;
  let currentGlitch = null;

  function addMessage(message, callback) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${message.type}`;

    const textSpan = document.createElement("span");
    textSpan.className = "text";
    textSpan.textContent = message.text;

    if (message.type === "bot" && isInGlitchPeriod(messageIndex)) {
      textSpan.classList.add("glitch");
      messageDiv.classList.add("glitch-border");
    }

    messageDiv.appendChild(textSpan);
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight; // Défiler vers le bas

    if (message.type === "bot" && isInGlitchPeriod(messageIndex)) {
      typeWriterEffect(textSpan, callback);
    } else {
      // Si ce n'est pas un message du bot ou en dehors des périodes de glitch
      typeWriterEffect(textSpan, callback);
    }
  }

  function typeWriterEffect(element, callback) {
    const text = element.textContent;
    element.textContent = "";
    let index = 0;

    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 25);
  }

  function startGlitchEffect() {
    glitchActive = true;
    currentGlitch = setInterval(() => {
      if (music.paused) {
        music.play(); // Reprendre la musique
      } else {
        music.pause(); // Couper la musique
      }
    }, Math.random() * 300 + 150); // Pause/replay toutes les 150ms à 450ms (intervalle aléatoire)
  }

  function stopGlitchEffect() {
    glitchActive = false;
    clearInterval(currentGlitch);
    music.play(); // Reprendre la musique normalement
  }

  function fadeOutMusic() {
    let volume = music.volume;
    const fadeInterval = setInterval(() => {
      volume -= 0.1;
      if (volume <= 0) {
        volume = 0;
        clearInterval(fadeInterval);
        music.pause();
      }
      music.volume = volume;
    }, 100);
  }

  function fadeOutSound() {
    let volume = phoneGone.volume;
    const fadeInterval = setInterval(() => {
      volume -= 0.1;
      if (volume <= 0) {
        volume = 0;
        clearInterval(fadeInterval);
        phoneGone.pause();
      }
      phoneGone.volume = volume;
    }, 200);
  }

  function showScreamer() {
    screamer.style.display = "flex";
    music.pause();
    screamerSound.play();
    screamerSound.volume = 1;
    setTimeout(() => {
      hideScreamer(); // Cacher le screamer après 2 secondes
    }, 2000);
  }

  function hideScreamer() {
    screamer.style.display = "none";
    music.play();
    screamerSound.pause();
  }

  function isInGlitchPeriod(index) {
    return glitchPeriods.some(
      (period) => index >= period.start && index <= period.end
    );
  }

  nextButton.addEventListener("click", () => {
    if (!musicPlayed) {
      music.play().catch((e) => console.error("Erreur:", e));
      musicPlayed = true;
    }

    if (messageIndex < messages.length) {
      const message = messages[messageIndex];

      if (message.type === "bot" && isInGlitchPeriod(messageIndex)) {
        if (!glitchActive) {
          startGlitchEffect();
        }
      } else if (glitchActive) {
        stopGlitchEffect();
      }
      if (messageIndex === 61) {
        fadeOutMusic();
        phoneGone.play();
      }

      addMessage(message, () => {
        if (messageIndex === 28) {
          setTimeout(() => {
            showScreamer();
          }, 2000);
        }
        nextButton.style.display = "block";
      });
      messageIndex++;
    } else {
      nextButton.style.display = "none";
      fadeOutSound();

      setTimeout(() => {
        nextPage();
      }, 3000);
    }
  });

  // Initialiser le premier message
  addMessage(messages[messageIndex], () => {
    setTimeout(() => {
      nextButton.style.opacity = 1;
    }, 3000);
  });
  messageIndex++;

  function nextPage() {
    window.location.replace("LWMeetConclusion.html");
  }
});
