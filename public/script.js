// --- ¡AQUÍ VA TU CARTA! ---
const carta = {
  // ... (tu objeto carta no cambia)
  titulo: "Para mi persona favorita",
  estrofas: [
    { imagen: "./img/escena_1.jpg", texto: "Todo empezó ese 11 de octubre, cuando nos vimos después de hablar por esa app. Mientras comíamos chaufa, me quedé impresionado contigo: tu altura, tu belleza y lo fácil que era hablar de todo. Sentí una conexión real, como nunca antes, y supe que ese día era importante." },
    { imagen: "./img/escena_2.jpg", texto: "Recuerdo ese Halloween. Por dentro, yo estaba lleno de inseguridades de mis relaciones pasadas y reconozco que dudé. Pero ese día tomé una decisión firme: iba a dejar mis miedos atrás y me iba a comprometer de verdad contigo, porque valías toda la pena." },
    { imagen: "./img/escena_3.jpg", texto: "Nuestro primer mes, en noviembre, marcó un antes y un después. Cuando estuvimos juntos por primera vez, no fue solo algo físico, sentí que te entregaba todo de mí, en cuerpo y alma. En ese momento supe que nuestro lazo se había vuelto inquebrantable y real." },
    { imagen: "./img/Escena_4.jpg", texto: "Luego llegó diciembre y tu cumpleaños número 19. Fue el primer cumpleaños tuyo que pasamos juntos y me hizo inmensamente feliz estar a tu lado. Me hizo pensar en todos los que quiero celebrar contigo en el futuro, y me llenó de alegría imaginarlo." },
    { imagen: "./img/escena_5.jpg", texto: "Ese día de enero en la playa fue otro gran paso. Fue la primera vez que salías con mi familia y verte ahí, riendo con ellos, se sintió tan correcto. Encajaste perfectamente, como si siempre hubieras sido parte de mi vida y de la de ellos." },
    { imagen: "./img/escena_6.jpg", texto: "Y ahora, después de ocho meses, veo las fotos que te he tomado y me doy cuenta de todo. Me has enseñado lo que es amar de verdad, a valorar a alguien y a querer ser mejor persona cada día por ella. Esto es solo el comienzo; quiero que sepas que siempre voy a estar para ti, en las buenas y en las malas. Te amo." }
  ],
  mensajeFinal: "Felices 8 meses, mi amor."
};

// --- LÓGICA DE LA PÁGINA ---
const introScreen = document.getElementById('intro-screen');
const startHeart = document.getElementById('start-heart');
const storyContainer = document.getElementById('story');
const particleContainer = document.getElementById('particle-container');

let fireworksIntervalId = null;
let tituloAnimado = false;
let finalAnimado = false;

const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// --- ¡NUEVA FUNCIÓN DE PRECARGA DE IMÁGENES! ---
function precargarImagenes() {
  // Creamos un array con todas las URLs de las imágenes que necesitamos
  const urlsImagenes = carta.estrofas.map(estrofa => estrofa.imagen);
  urlsImagenes.push("https://i.ibb.co/wNqx54WD/Naty-Fan-Art.jpg"); // Añadimos la imagen final

  // Creamos un array de "promesas". Cada promesa se cumplirá cuando una imagen se cargue.
  const promesas = urlsImagenes.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve; // La promesa se cumple si la imagen carga bien
      img.onerror = reject; // La promesa falla si hay un error
    });
  });

  // Devolvemos una única promesa que solo se cumplirá cuando TODAS las promesas de imágenes se cumplan.
  return Promise.all(promesas);
}


// --- EVENTO DE INICIO (ACTUALIZADO CON EL PRELOADER) ---
startHeart.addEventListener('click', () => {
  // 1. Mostramos el estado de carga en la pantalla de introducción
  introScreen.classList.add('loading');

  // 2. Empezamos a precargar las imágenes
  precargarImagenes()
    .then(() => {
      // 3. ¡ÉXITO! Todas las imágenes se han cargado.
      console.log('Todas las imágenes cargadas correctamente.');

      // Ahora ejecutamos el código que muestra la historia
      renderizarCarta();
      introScreen.style.opacity = '0';
      storyContainer.classList.add('visible');

      if (!tituloAnimado) {
        tituloAnimado = true;
        let fontSize = 60;
        if (window.innerWidth < 768) fontSize = 40;
        new Vara("#titulo-animado", "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json", [{ text: carta.titulo, duration: 3000, textAlign: 'center' }], { strokeWidth: 2, color: "#333333", fontSize: fontSize, textAlign: "center" });
      }

      setTimeout(() => introScreen.remove(), 1500);

      setupIntersectionObserver();
      setupCursorFollow();
    })
    .catch(error => {
      // Opcional: Manejo de errores si alguna imagen no carga
      console.error('Error al precargar una o más imágenes:', error);
      // Podrías mostrar un mensaje de error aquí
      alert("Hubo un error al cargar las imágenes. Por favor, intenta de nuevo.");
    });
});


// El resto del script (renderizarCarta, setupIntersectionObserver, etc.) no necesita cambios.
function renderizarCarta() {
  const tituloWrapper = document.createElement('div');
  tituloWrapper.className = 'story-section';
  const tituloAnimadoContainer = document.createElement('div');
  tituloAnimadoContainer.id = 'titulo-animado';
  tituloWrapper.appendChild(tituloAnimadoContainer);
  storyContainer.appendChild(tituloWrapper);
  carta.estrofas.forEach(estrofa => {
    const estrofaWrapper = document.createElement('div');
    estrofaWrapper.className = 'story-section has-image';
    const imagenContainer = document.createElement('div');
    imagenContainer.className = 'imagen-container';
    const estrofaImg = document.createElement('img');
    estrofaImg.src = estrofa.imagen;
    estrofaImg.alt = "Recuerdo de nuestra historia";
    imagenContainer.appendChild(estrofaImg);
    const estrofaP = document.createElement('p');
    estrofaP.innerText = estrofa.texto;
    estrofaWrapper.appendChild(imagenContainer);
    estrofaWrapper.appendChild(estrofaP);
    storyContainer.appendChild(estrofaWrapper);
  });
  const finalWrapper = document.createElement('div');
  finalWrapper.className = 'story-section';
  finalWrapper.id = 'final-container';
  const finalImage = document.createElement('img');
  finalImage.src = "https://i.ibb.co/wNqx54WD/Naty-Fan-Art.jpg";
  finalImage.alt = "Ilustración de aniversario";
  const finalAnimadoContainer = document.createElement('div');
  finalAnimadoContainer.id = 'final-animado-container';
  finalWrapper.appendChild(finalImage);
  finalWrapper.appendChild(finalAnimadoContainer);
  storyContainer.appendChild(finalWrapper);
}

function setupIntersectionObserver() {
  const options = { root: null, rootMargin: '0px', threshold: 0.4 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.id === 'final-container') {
          if (!fireworksIntervalId) {
            fireworksIntervalId = setInterval(() => {
              const img = entry.target.querySelector('img');
              if (img) {
                const imgRect = img.getBoundingClientRect();
                const randomX = imgRect.left + (Math.random() * imgRect.width);
                const randomY = imgRect.top + (Math.random() * imgRect.height);
                createHeartBurst(randomX, randomY, 8);
              }
            }, 400);
          }
          if (!finalAnimado) {
            finalAnimado = true;
            let fontSize = 50;
            if (window.innerWidth < 768) fontSize = 35;
            new Vara("#final-animado-container", "https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json", [{ text: carta.mensajeFinal, duration: 3000, y: 30 }], { strokeWidth: 2, color: "#333333", fontSize: fontSize, textAlign: "center" });
          }
        }
      } else {
        entry.target.classList.remove('active');
        if (entry.target.id === 'final-container' && fireworksIntervalId) {
          clearInterval(fireworksIntervalId);
          fireworksIntervalId = null;
        }
      }
    });
  }, options);
  const sections = document.querySelectorAll('.story-section');
  sections.forEach(section => { observer.observe(section); });
}

function setupCursorFollow() {
  if (window.matchMedia("(pointer: fine)").matches) {
    const sectionsWithImages = document.querySelectorAll('.story-section.has-image');
    sectionsWithImages.forEach(section => {
      const imgContainer = section.querySelector('.imagen-container');
      section.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = section.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        imgContainer.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      });
      section.addEventListener('mouseleave', () => {
        imgContainer.style.transform = 'translate(0, 0)';
      });
    });
  }
}

function createHeartBurst(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '♥';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 2;
    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;
    particleContainer.appendChild(heart);
    animateParticle(heart, velocityX, velocityY);
  }
}

function animateParticle(particle, vx, vy) {
  let life = 100;
  function update() {
    if (life <= 0) {
      particle.remove(); return;
    }
    let currentX = parseFloat(particle.style.left);
    let currentY = parseFloat(particle.style.top);
    particle.style.left = `${currentX + vx}px`;
    particle.style.top = `${currentY + vy}px`;
    particle.style.opacity = life / 100;
    particle.style.transform = `scale(${life / 100})`;
    life -= 1;
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}