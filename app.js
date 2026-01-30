const RecipeApp = (() => {
    console.log("RecipeApp initializing...");

    /* ---------- DATA ---------- */
    const recipes = [
        {
            id: 1,
            title: "Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "Creamy pasta with eggs and cheese.",
            ingredients: ["Pasta", "Eggs", "Cheese", "Pepper"],
            steps: [
                "Boil pasta",
                { text: "Prepare sauce", substeps: ["Beat eggs", "Add cheese"] },
                "Combine and serve"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Spiced chicken curry.",
            ingredients: ["Chicken", "Tomato", "Cream", "Spices"],
            steps: ["Marinate chicken", "Cook sauce", "Combine"]
        },
        {
            id: 3,
            title: "Croissants",
            time: 180,
            difficulty: "hard",
            description: "Flaky French pastry.",
            ingredients: ["Flour", "Butter", "Yeast"],
            steps: [
                { text: "Prepare dough", substeps: ["Mix", "Knead", "Rest"] },
                "Layer butter",
                "Bake"
            ]
        },{
                 id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables with feta and olives.",
        ingredients: ["Tomato", "Cucumber", "Olives", "Feta", "Olive Oil"],
        steps: [
            "Chop vegetables",
            "Add feta and olives",
            "Drizzle olive oil and toss"
        ]
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Beef fillet wrapped in pastry.",
        ingredients: ["Beef", "Mushrooms", "Puff Pastry", "Egg"],
        steps: [
            "Prepare mushroom filling",
            "Sear beef",
            { text: "Wrap and bake", substeps: ["Wrap beef", "Brush with egg", "Bake"] }
        ]
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Quick sautéed vegetables.",
        ingredients: ["Broccoli", "Carrot", "Capsicum", "Soy Sauce"],
        steps: [
            "Chop vegetables",
            "Stir fry on high heat",
            "Add sauce and serve"
        ]
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai noodles with peanuts and sauce.",
        ingredients: ["Rice Noodles", "Peanuts", "Eggs", "Sauce"],
        steps: [
            "Soak noodles",
            "Cook noodles with sauce",
            "Garnish with peanuts"
        ]
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic pizza with tomato and basil.",
        ingredients: ["Flour", "Tomato Sauce", "Mozzarella", "Basil"],
        steps: [
            "Prepare dough",
            "Add toppings",
            "Bake until crispy"
        ]
    }
        
    ];

    let currentFilter = "all";
    let currentSort = "none";

    const container = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll("[data-filter]");
    const sortButtons = document.querySelectorAll("[data-sort]");

    /* ---------- PURE FUNCTIONS ---------- */
    const applyFilter = (list) => {
        if (currentFilter === "quick") return list.filter(r => r.time < 30);
        if (currentFilter === "all") return list;
        return list.filter(r => r.difficulty === currentFilter);
    };

    const applySort = (list) => {
        if (currentSort === "name") return [...list].sort((a,b)=>a.title.localeCompare(b.title));
        if (currentSort === "time") return [...list].sort((a,b)=>a.time-b.time);
        return list;
    };

    /* ---------- RECURSION ---------- */
    const renderSteps = (steps) => {
        return `<ul>${steps.map(step => {
            if (typeof step === "string") return `<li>${step}</li>`;
            return `<li>${step.text}${renderSteps(step.substeps)}</li>`;
        }).join("")}</ul>`;
    };

    /* ---------- UI ---------- */
    const createCard = (r) => `
        <div class="recipe-card" data-id="${r.id}">
            <h3>${r.title}</h3>
            <div class="recipe-meta">
                <span>⏱ ${r.time} min</span>
                <span class="difficulty ${r.difficulty}">${r.difficulty}</span>
            </div>
            <p>${r.description}</p>

            <button class="toggle-btn" data-toggle="ingredients">Show Ingredients</button>
            <div class="ingredients-container">
                <ul>${r.ingredients.map(i=>`<li>${i}</li>`).join("")}</ul>
            </div>

            <button class="toggle-btn" data-toggle="steps">Show Steps</button>
            <div class="steps-container steps">
                ${renderSteps(r.steps)}
            </div>
        </div>
    `;

    const render = () => {
        let list = applySort(applyFilter(recipes));
        container.innerHTML = list.map(createCard).join("");
    };

    /* ---------- EVENTS ---------- */
    const updateButtons = () => {
        filterButtons.forEach(b=>b.classList.toggle("active", b.dataset.filter===currentFilter));
        sortButtons.forEach(b=>b.classList.toggle("active", b.dataset.sort===currentSort));
    };

    filterButtons.forEach(btn => btn.onclick = () => {
        currentFilter = btn.dataset.filter;
        updateButtons();
        render();
    });

    sortButtons.forEach(btn => btn.onclick = () => {
        currentSort = btn.dataset.sort;
        updateButtons();
        render();
    });

    container.addEventListener("click", e => {
        if (!e.target.classList.contains("toggle-btn")) return;
        const box = e.target.nextElementSibling;
        box.classList.toggle("visible");
        e.target.textContent = box.classList.contains("visible")
            ? "Hide"
            : e.target.dataset.toggle === "steps" ? "Show Steps" : "Show Ingredients";
    });

    render();
    console.log("RecipeApp ready!");

    return { init: render };
})();
