document.addEventListener('DOMContentLoaded', function() {
  var isAutoScrolling = false;
  var scrollInterval;
  var scrollBtnId = "auto-scroll-ss";
  var fasterBtnId = "auto-scroll-ss-plus-plus";
  var slowerBtnId = "auto-scroll-ss-less-less";
  var scrollIcon = "↓";
  var stopIcon = "===";
  var slow = 0.5;
  var normal = 2;
  var fast = 5;
  var speed = normal; // Vitesse par défaut

  var container = document.createElement("div");
  // Création de la div de contrôle du défilement

  var scrollBtn = document.createElement('btn');
  scrollBtn.id = scrollBtnId;
  scrollBtn.innerText = "↓";
  scrollBtn.style.position = 'fixed';
  scrollBtn.style.top = `${window.innerHeight/2}` + "px";
  scrollBtn.style.right = '10px';
  scrollBtn.style.backgroundColor = 'rgba(240, 240, 240, 0.8)'; // Fond avec opacité pour le flou
  scrollBtn.style.padding = '10px';
  scrollBtn.style.cursor = 'pointer';
  scrollBtn.style.borderRadius = '10px'; // Coins arrondis
  scrollBtn.style.backdropFilter = 'blur(5px)';

  var fasterBtn = document.createElement("btn");
  fasterBtn.id = fasterBtnId;
  fasterBtn.innerText = "+";
  fasterBtn.style.position = 'fixed';
  fasterBtn.style.top = `${window.innerHeight/2 + 50}` + "px";
  fasterBtn.style.right = '10px';
  fasterBtn.style.backgroundColor = 'rgba(240, 240, 240, 0.8)'; // Fond avec opacité pour le flou
  fasterBtn.style.padding = '10px';
  fasterBtn.style.cursor = 'pointer';
  fasterBtn.style.borderRadius = '10px'; // Coins arrondis
  fasterBtn.style.backdropFilter = 'blur(5px)';

  var slowerBtn = document.createElement("btn");
  slowerBtn.id = slowerBtnId;
  slowerBtn.innerText = "-";
  slowerBtn.style.position = 'fixed';
  slowerBtn.style.top = `${window.innerHeight/2 - 50}` + "px";
  slowerBtn.style.right = '10px';
  slowerBtn.style.backgroundColor = 'rgba(240, 240, 240, 0.8)'; // Fond avec opacité pour le flou
  slowerBtn.style.padding = '10px';
  slowerBtn.style.cursor = 'pointer';
  slowerBtn.style.borderRadius = '10px'; // Coins arrondis
  slowerBtn.style.backdropFilter = 'blur(5px)';
  
  container.appendChild(scrollBtn);
  container.appendChild(slowerBtn);
  container.appendChild(fasterBtn);
  document.body.appendChild(container);

  // Fonction pour arrêter le défilement
  function stopScroll() {
      clearInterval(scrollInterval);
  }

  // Fonction pour faire défiler la fenêtre vers le bas
  function scroll() {
      var windowHeight = window.innerHeight;
      var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      var remainingDistance = documentHeight - windowHeight - window.pageYOffset;

      // Si nous sommes déjà au bas de la page, arrêter le défilement
      if (remainingDistance <= 0) {
          stopScroll();
          return;
      }

      // Déterminer le nombre de pixels à faire défiler
      var pixelsToScroll = Math.min(speed, remainingDistance);

      // Faire défiler la fenêtre
      window.scrollBy(0, pixelsToScroll);
  }

  // Fonction pour démarrer ou arrêter le défilement automatique
  function toggleAutoScroll() {
      // Inverser l'état du défilement automatique
      isAutoScrolling = !isAutoScrolling;

      // Mettre à jour le texte de la scrollBtn de contrôle
      document.getElementById(scrollBtnId).innerText = isAutoScrolling ? stopIcon : scrollIcon;

      // Commencer ou arrêter le défilement selon l'état actuel
      if (isAutoScrolling) {
          // Commencer le défilement automatique
          scrollInterval = setInterval(scroll, 10);
      } else {
          // Arrêter le défilement automatique
          stopScroll();
      }
  }

  // Attacher l'événement de clic à la scrollBtn de contrôle du défilement
  document.getElementById(scrollBtnId).addEventListener("click", toggleAutoScroll);

  // Bouton pour augmenter la vitesse
  document.getElementById(fasterBtnId).addEventListener("click", function() {
      if (speed === slow) {
          speed = normal;
      } else if (speed === normal) {
          speed = fast;
      }
  });

  // Bouton pour diminuer la vitesse
  document.getElementById(slowerBtnId).addEventListener("click", function() {
      if (speed === fast) {
          speed = normal;
      } else if (speed === normal) {
          speed = slow;
      }
  });

  window.addEventListener("beforeunload", function() {
      stopScroll();
  });
});
