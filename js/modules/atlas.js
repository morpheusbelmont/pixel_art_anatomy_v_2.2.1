(() => {
  const mount = document.getElementById("atlas-mount");
  if (!mount) return;
  const fields = {
    name: document.getElementById("muscle-name"),
    region: document.getElementById("muscle-region"),
    fn: document.getElementById("muscle-function"),
    art: document.getElementById("muscle-art")
  };
  const status = document.getElementById("atlas-status");
  const viewButtons = [...document.querySelectorAll("[data-atlas-view]")];
  let view = "front";
  const labels = { front: "FRONTAL", back: "POSTERIOR", side: "LATERAL", iso: "ISOMÉTRICA" };
  const sprites = {
    front: "assets/anatomy/human-male-front.png",
    back: "assets/anatomy/human-male-back.png",
    side: "assets/anatomy/human-male-side.png",
    iso: "assets/anatomy/human-male-iso.png"
  };
  const info = {
    front: {name:"Vista frontal", region:"Cuerpo completo · anterior", fn:"Referencia visual del personaje desde el frente.", art:"Observa la simetría, la silueta y la distribución de luces y sombras."},
    back: {name:"Vista posterior", region:"Cuerpo completo · posterior", fn:"Referencia visual de la parte posterior del personaje.", art:"Compara el contorno del cabello, hombros, torso y piernas con la vista frontal."},
    side: {name:"Vista lateral", region:"Cuerpo completo · perfil", fn:"Referencia del perfil y la profundidad de la silueta.", art:"Usa esta vista para comprobar el perfil de la cabeza, el torso y la posición de las extremidades."},
    iso: {name:"Vista isométrica", region:"Cuerpo completo · perspectiva", fn:"Referencia del personaje en una vista de volumen estilizada.", art:"Conserva la proporción y el pixel art original; no estires la imagen al ajustar el espacio."}
  };
  function render() {
    const src = sprites[view];
    mount.innerHTML = `
      <div class="character-controls"><div class="character-control-group" aria-label="Modelo seleccionado"><strong class="character-model-label">PERSONAJE PIXEL ART</strong></div></div>
      <div class="character-stage">
        <div class="character-pixel-stack">
          <img class="character-base" src="${src}" alt="Personaje pixel art, vista ${labels[view].toLowerCase()}" draggable="false">
        </div>
      </div>
      <p class="character-caption">PERSONAJE PIXEL ART / ${labels[view]} / REFERENCIA ORIGINAL</p>
      <p class="character-note">Selecciona otra vista para comparar la silueta del personaje.</p>`;
    const img = mount.querySelector('.character-base');
    img.addEventListener('load', () => { if (status) status.textContent = `IMAGEN CARGADA // ${labels[view]}`; }, {once:true});
    img.addEventListener('error', () => {
      if (status) status.textContent = 'ERROR DE CARGA';
      const stage = mount.querySelector('.character-stage');
      stage.innerHTML = `<div class="sprite-error">No se pudo cargar la imagen:<br><code>${src}</code><br><br>Verifica que la carpeta <code>assets/anatomy</code> esté en el mismo nivel que <code>index.html</code>.</div>`;
    }, {once:true});
    if (status) status.textContent = 'CARGANDO IMAGEN…';
    viewButtons.forEach(btn => {
      const active = btn.dataset.atlasView === view || (view === 'iso' && btn.dataset.atlasView === 'isometric');
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    const data = info[view];
    if (fields.name) fields.name.textContent = data.name;
    if (fields.region) fields.region.textContent = data.region;
    if (fields.fn) fields.fn.textContent = data.fn;
    if (fields.art) fields.art.textContent = data.art;
  }
  viewButtons.forEach(btn => btn.addEventListener('click', () => {
    view = btn.dataset.atlasView === 'isometric' ? 'iso' : btn.dataset.atlasView;
    render();
  }));
  render();
})();
