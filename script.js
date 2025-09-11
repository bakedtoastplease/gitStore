// Подгрузка категорий
async function loadCategories() {
  try {
    const res = await fetch("categories.json");
    const categories = await res.json();
    const container = document.getElementById("categories");

    container.innerHTML = ""; // очистка

    categories.forEach((cat, index) => {
      const btn = document.createElement("button");
      btn.textContent = cat.name;
      btn.dataset.id = cat.id;

      if (index === 0) btn.classList.add("active");

      btn.addEventListener("click", () => {
        document.querySelectorAll(".categories button")
          .forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterApps(cat.id);
      });

      container.appendChild(btn);
    });
  } catch (err) {
    console.error("Ошибка загрузки категорий:", err);
  }
}

// Подгрузка приложений
async function loadApps() {
  try {
    const res = await fetch("apps.json");
    const apps = await res.json();
    const grid = document.getElementById("appGrid");

    grid.innerHTML = ""; // очистка

    apps.forEach(app => {
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("data-category", app.category || "other");

      card.innerHTML = `
        <img src="${app.icon}" alt="${app.name}" 
             onerror="this.src='images/404.png'">
        <h2>${app.name}</h2>
        <p>${app.desc}</p>
        ${app.file 
          ? `<a href="${app.file}" class="btn">Скачать</a>` 
          : `<a href="#" class="btn disabled">Недоступно</a>`}
      `;

      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Ошибка загрузки приложений:", err);
  }
}

// Фильтрация приложений
function filterApps(category) {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Инициализация
document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadApps();
});