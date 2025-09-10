// === Фон матрицы ===
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const symbols = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = symbols[Math.floor(Math.random() * symbols.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// === Загрузка категорий и приложений ===
let apps = [];
let categories = [];
let currentCategory = null;

async function loadData() {
  categories = await (await fetch("categories.json")).json();
  apps = await (await fetch("apps.json")).json();

  renderCategories();
  renderApps();
}

function renderCategories() {
  const nav = document.getElementById("categories");
  nav.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.onclick = () => {
      currentCategory = cat.id;
      document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderApps();
    };
    nav.appendChild(btn);
  });
}

function renderApps() {
  const container = document.getElementById("app-list");
  container.innerHTML = "";

  apps
    .filter(app => !currentCategory || app.category === currentCategory)
    .forEach(app => {
      const card = document.createElement("div");
      card.className = "app-card";

      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = app.icon || generateIcon();

      const title = document.createElement("h3");
      title.textContent = app.name;

      const pkg = document.createElement("small");
      pkg.textContent = app.id;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(pkg);

      if (app.secure === 0) {
        card.onclick = () => openTerminal(app);
      }

      container.appendChild(card);
    });
}

// === Генерация пиксельных иконок ===
function generateIcon() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(128, 128);
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = Math.random() * 255;
    imageData.data[i+1] = Math.random() * 255;
    imageData.data[i+2] = Math.random() * 255;
    imageData.data[i+3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

// === Терминал ===
function openTerminal(app) {
  document.getElementById("terminal").classList.remove("hidden");
  const output = document.getElementById("terminal-output");
  output.textContent = `⚠️ Приложение ${app.name} небезопасно.\nДля установки введите:\n\n git clone ${app.id}\n`;
}

loadData();async function loadData() {
  categories = await (await fetch("categories.json")).json();
  apps = await (await fetch("apps.json")).json();

  renderCategories();
  renderApps();
}

function renderCategories() {
  const nav = document.getElementById("categories");
  nav.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;
    btn.onclick = () => {
      currentCategory = cat.id;
      renderApps();
    };
    nav.appendChild(btn);
  });
}

function renderApps() {
  const container = document.getElementById("app-list");
  container.innerHTML = "";

  apps
    .filter(app => !currentCategory || app.category === currentCategory)
    .forEach(app => {
      const card = document.createElement("div");
      card.className = "app-card";

      const img = document.createElement("img");
      if (app.icon) {
        img.src = app.icon;
      } else {
        img.src = generateIcon();
      }

      const title = document.createElement("h3");
      title.textContent = app.name;

      const pkg = document.createElement("small");
      pkg.textContent = app.id;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(pkg);

      if (app.secure === 0) {
        card.onclick = () => openTerminal(app);
      }

      container.appendChild(card);
    });
}

// === Генерация пиксельных иконок ===
function generateIcon() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(128, 128);
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = Math.random() * 255;
    imageData.data[i+1] = Math.random() * 255;
    imageData.data[i+2] = Math.random() * 255;
    imageData.data[i+3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

// === Терминал ===
function openTerminal(app) {
  document.getElementById("terminal").classList.remove("hidden");
  const output = document.getElementById("terminal-output");
  output.textContent = `⚠️ Приложение ${app.name} небезопасно.\nДля установки введите:\n\n git clone ${app.id}\n`;
}

loadData();
