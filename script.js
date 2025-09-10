// Подгрузка категорий
fetch("categories.json")
  .then(res => res.json())
  .then(categories => {
    const container = document.getElementById("categories");
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
  });

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
