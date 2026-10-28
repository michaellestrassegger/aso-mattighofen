
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.createElement("div");
  overlay.id = "lightbox";

  overlay.innerHTML = `
    <button id="lightbox-close" aria-label="Bild schließen">&times;</button>
    <img id="lightbox-bild" src="" alt="">
  `;

  document.body.appendChild(overlay);

  const style = document.createElement("style");

  style.textContent = `
    #lightbox {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.85);
      justify-content: center;
      align-items: center;
      padding: 60px 20px 20px;
      box-sizing: border-box;
    }

    #lightbox.aktiv {
      display: flex;
    }

    #lightbox-bild {
      display: block;
      max-width: 95vw;
      max-height: 95vh;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
    }

    #lightbox-close {
      position: absolute;
      top: 15px;
      right: 25px;
      color: white;
      background: transparent;
      border: none;
      font-size: 42px;
      line-height: 1;
      cursor: pointer;
      padding: 5px 10px;
    }

    #lightbox-close:hover {
      color: #c8ecff;
    }

    #lightbox-close:focus-visible {
      outline: 2px solid white;
      outline-offset: 4px;
    }

    body.lightbox-offen {
      overflow: hidden;
    }
  `;

  document.head.appendChild(style);

  const lightboxBild = document.querySelector("#lightbox-bild");
  const schliessen = document.querySelector("#lightbox-close");

  // Jedes Foto auf der Seite anklickbar machen
  document.addEventListener("click", function (event) {
    const foto = event.target.closest("img");

    if (!foto || !foto.src || overlay.contains(foto)) {
      return;
    }

    // Falls das Foto in einem Link steckt, nicht dem Link folgen
    event.preventDefault();

    lightboxBild.src = foto.currentSrc || foto.src;
    lightboxBild.alt = foto.alt || "Vergrößertes Foto";

    overlay.classList.add("aktiv");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Bildansicht");

    document.body.classList.add("lightbox-offen");
    schliessen.focus();
  });

  // Bildansicht schließen
  function lightboxSchliessen() {
    overlay.classList.remove("aktiv");
    document.body.classList.remove("lightbox-offen");
    lightboxBild.src = "";
  }

  schliessen.addEventListener("click", lightboxSchliessen);

  // Schließen, wenn auf den Hintergrund geklickt wird
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      lightboxSchliessen();
    }
  });

  // Schließen mit Escape
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && overlay.classList.contains("aktiv")) {
      lightboxSchliessen();
    }
  });
});

//Slyder

document.querySelectorAll(".slider").forEach(function (slider) {
  const bilder = slider.querySelectorAll(".slider-bilder img");
  const zurueck = slider.querySelector(".slider-zurueck");
  const weiter = slider.querySelector(".slider-weiter");

  let aktuellesBild = 0;

  function bildAnzeigen(index) {
    bilder[aktuellesBild].classList.remove("aktiv");

    if (index >= bilder.length) {
      aktuellesBild = 0;
    } else if (index < 0) {
      aktuellesBild = bilder.length - 1;
    } else {
      aktuellesBild = index;
    }

    bilder[aktuellesBild].classList.add("aktiv");
  }

  if (bilder.length > 0) {
    bilder[0].classList.add("aktiv");
  }

  weiter.addEventListener("click", function () {
    bildAnzeigen(aktuellesBild + 1);
  });

  zurueck.addEventListener("click", function () {
    bildAnzeigen(aktuellesBild - 1);
  });
});

