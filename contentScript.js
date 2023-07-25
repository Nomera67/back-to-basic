function replaceSVGWithPNG() {
  const twitterLink = document.querySelector('a[aria-label="Twitter"][role="link"]');
  if (twitterLink) {
    //Create new image with src needed and attribute width to be used. Here we use logo from Wikipedia and small size to be light and usefull
    const newImage = document.createElement("img");
    newImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/292px-Logo_of_Twitter.svg.png";
    newImage.setAttribute("width", "50px");

    //Delete all childs of the <a> designated before
    //On Twitter, this a got a <g>, <svg> and <path> in there
    while (twitterLink.firstChild) {
      twitterLink.removeChild(twitterLink.firstChild);
    }

    // Add a new img in the <a> to conserve the "back home" function
    twitterLink.appendChild(newImage);

    return true;
  }
  return false;
}


function changeFavicon() {
  //search the <link> with shortcut icon rel
  const faviconLink = document.querySelector('link[rel="shortcut icon"]');

  //search the link for Apple because it contain exactly the href needed
  const appleTouchIconLink = document.querySelector('link[rel="apple-touch-icon"]');

  if (faviconLink && appleTouchIconLink) {
    //get the href of this one
    const newFaviconURL = appleTouchIconLink.getAttribute("href");

    //and use it there
    faviconLink.setAttribute("href", newFaviconURL);
  }
}

changeFavicon();


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