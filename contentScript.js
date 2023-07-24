function replaceSVGWithPNG() {
  const twitterLink = document.querySelector('a[aria-label="Twitter"][role="link"]');
  if (twitterLink) {
    // Créez un nouvel élément image pour le PNG souhaité
    const newImage = document.createElement("img");
    newImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/292px-Logo_of_Twitter.svg.png";
    newImage.setAttribute("width", "50px");

    // Supprimez tous les enfants de l'élément <a> (le SVG)
    while (twitterLink.firstChild) {
      twitterLink.removeChild(twitterLink.firstChild);
    }

    // Ajoutez le nouvel élément image à l'élément <a>
    twitterLink.appendChild(newImage);

    return true;
  }
  return false;
}

function observeDOMChange() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        if (replaceSVGWithPNG()) {
          observer.disconnect();
          break;
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (!replaceSVGWithPNG()) {
  observeDOMChange();
}
