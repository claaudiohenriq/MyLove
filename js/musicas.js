const musicas = [
  {
    titulo: "Birds Of a feather",
    artista: "Billie Eilish",
    arquivo: "./musicas/Billie Eilish - BIRDS OF A FEATHER.mp3",
    capa: "imagensMusicas/birds.jpg"
  },
  {
    titulo: "Die With A Smile",
    artista: "Lady Gaga & Bruno Mars",
    arquivo: "./musicas/Lady Gaga, Bruno Mars - Die With A Smile.mp3",
    capa: "imagensMusicas/dieSmile.jpg"
  },
  {
    titulo: "Ordinary",
    artista: "Alex  Warren",
    arquivo: "./musicas/Alex Warren - Ordinary.mp3",
    capa: "imagensMusicas/ordinary.jpeg"
  },
  {
    titulo: "Glue Song",
    artista: "Beabadoobee",
    arquivo: "./musicas/beabadoobee - Glue Song.mp3",
    capa: "imagensMusicas/glue.jpeg"
  },{
    titulo: "Cor de Marte",
    artista: "ANAVITÓRIA",
    arquivo: "./musicas/ANAVITÓRIA - Cor de Marte.mp3",
    capa: "imagensMusicas/cordemarte.jpeg"
  },
  {
    titulo: "Amor Puro",
    artista: "Djavan",
    arquivo: "./musicas/Djavan - Um Amor Puro.mp3",
    capa: "imagensMusicas/amorpuro.jpg"
  }
];

let index = 0;
const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const capa = document.getElementById("capa");
const volume = document.getElementById("volume");
const lista = document.getElementById("lista-musicas");
const playPauseBtn = document.getElementById("playPauseBtn");
const progresso = document.getElementById("progresso");
const tempoAtual = document.getElementById("tempo-atual");
const tempoTotal = document.getElementById("tempo-total");


function carregarMusica(i) {
  const musica = musicas[i];
  titulo.textContent = musica.titulo;
  artista.textContent = musica.artista;
  capa.src = musica.capa;
  audio.src = musica.arquivo;
  atualizarLista(i);
}

function playPause() {
  if (audio.paused) {
    audio.play()
    playPauseBtn.textContent = "⏸"
  } else {
    audio.pause()
    playPauseBtn.textContent = "⏯"
  }
}

function proxima() {
  index = (index + 1) % musicas.length;
  carregarMusica(index);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

function anterior() {
  index = (index - 1 + musicas.length) % musicas.length;
  carregarMusica(index);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

function atualizarLista(atual) {
  lista.innerHTML = "";
  musicas.forEach((m, i) => {
    const li = document.createElement("li");
    li.textContent = `${m.titulo} - ${m.artista}`;
    li.className = i === atual ? "playing" : "";
    li.style.opacity = i === atual ? "1" : "0.4";
    li.onclick = () => {
      index = i;
      carregarMusica(index);
      audio.play();
      playPauseBtn.textContent = "⏸";
    };
    lista.appendChild(li);
  });
}


volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  proxima();
});

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg < 10 ? "0" + seg : seg}`;
}

audio.addEventListener("loadedmetadata", () => {
  progresso.max = Math.floor(audio.duration);
  tempoTotal.textContent = formatarTempo(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progresso.value = Math.floor(audio.currentTime);
  tempoAtual.textContent = formatarTempo(audio.currentTime);
});

progresso.addEventListener("input", () => {
  audio.currentTime = progresso.value;
});

let timeoutScroll;

lista.addEventListener("scroll", () => {
  lista.classList.add("scrolling");
  clearTimeout(timeoutScroll);
  timeoutScroll = setTimeout(() => {
    lista.classList.remove("scrolling");
  }, 500); // Remove classe após meio segundo sem rolagem
});


carregarMusica(index);
