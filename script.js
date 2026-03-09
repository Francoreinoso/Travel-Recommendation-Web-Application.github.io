/* ====================================================
   TRAVEL RECOMMENDATION WEB APPLICATION – script.js
   ==================================================== */

// ======================================================
// 1. DATA – Travel recommendations database
// ======================================================
const travelData = {
  beaches: [
    {
      name: "Bali, Indonesia",
      country: "Indonesia",
      tag: "Beach",
      description:
        "Bali's beaches are legendary — from the surfer paradise of Kuta to the cliffs of Uluwatu. Crystal-clear waters, golden sands, and a magical sunset every evening make this island a dream destination for beach lovers worldwide.",
      imageUrl:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=80",
      imageAlt: "Bali beach with turquoise water and palm trees",
    },
    {
      name: "Maldives",
      country: "Maldives",
      tag: "Beach",
      description:
        "The Maldives is the ultimate tropical escape — a chain of coral islands boasting powder-white sand beaches, overwater bungalows, and some of the most vibrant coral reefs on the planet. Pure paradise.",
      imageUrl:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&q=80",
      imageAlt: "Maldives overwater bungalows and turquoise lagoon",
    },
  ],
  temples: [
    {
      name: "Angkor Wat, Cambodia",
      country: "Cambodia",
      tag: "Temple",
      description:
        "Angkor Wat is the world's largest religious monument and one of the most breathtaking archaeological sites on Earth. Built in the 12th century, this Khmer temple complex is a UNESCO World Heritage Site surrounded by a vast moat and dense jungle.",
      imageUrl:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=700&q=80",
      imageAlt: "Angkor Wat temple reflected in water at sunrise",
    },
    {
      name: "Sensō-ji Temple, Japan",
      country: "Japan",
      tag: "Temple",
      description:
        "Sensō-ji is Tokyo's oldest temple and one of Japan's most visited spiritual sites. Located in the historic Asakusa district, it draws millions each year with its iconic Kaminarimon gate, traditional market lane, and peaceful five-story pagoda.",
      imageUrl:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&q=80",
      imageAlt: "Senso-ji temple gate in Asakusa Tokyo at night",
    },
  ],
  countries: [
    {
      name: "Japan",
      country: "Japan",
      tag: "Country",
      description:
        "Japan is a captivating blend of ancient tradition and futuristic innovation. From the neon-lit streets of Tokyo and the serene temples of Kyoto to Mount Fuji and the deer park of Nara, Japan delivers unforgettable experiences at every turn.",
      imageUrl:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80",
      imageAlt: "Tokyo cityscape at night with Mount Fuji in distance",
    },
    {
      name: "Italy",
      country: "Italy",
      tag: "Country",
      description:
        "Italy is a feast for the senses — world-class art in Florence, ancient history in Rome, romantic canals in Venice, and the Amalfi Coast's dramatic cliffs. Add incredible cuisine, wine, and warm hospitality, and Italy becomes simply irresistible.",
      imageUrl:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=700&q=80",
      imageAlt: "Amalfi Coast colorful village cliffside in Italy",
    },
  ],
};

// ======================================================
// 2. SEARCH LOGIC
// ======================================================

/**
 * Determines which category to show based on the query.
 * Returns 'beaches', 'temples', 'countries', or null.
 */
function categorize(query) {
  const q = query.trim().toLowerCase();

  if (!q) return null;

  if (q.includes("beach") || q.includes("beaches")) return "beaches";
  if (q.includes("temple") || q.includes("temples")) return "temples";

  // Country keywords: explicit or match by country name
  const countryKeywords = ["country", "countries"];
  const countryNames = travelData.countries.map((c) => c.country.toLowerCase());

  if (
    countryKeywords.some((kw) => q.includes(kw)) ||
    countryNames.some((cn) => q.includes(cn))
  ) {
    return "countries";
  }

  return null;
}

/** Creates a single recommendation card element. */
function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.imageAlt}" loading="lazy" />
    <div class="card-body">
      <span class="card-tag">${item.tag}</span>
      <h3 class="card-title">${item.name}</h3>
      <p class="card-desc">${item.description}</p>
      <a href="#" class="card-btn" aria-label="Learn more about ${item.name}">Learn More</a>
    </div>
  `;

  // Prevent default on "Learn More" (static site, no detail pages yet)
  card.querySelector(".card-btn").addEventListener("click", (e) => {
    e.preventDefault();
  });

  return card;
}

/** Renders results into the DOM. */
function renderResults(category) {
  const grid = document.getElementById("resultsGrid");
  const titleEl = document.getElementById("resultsTitle");
  const noResults = document.getElementById("noResults");
  const resultsSection = document.getElementById("results-section");

  if (!grid) return; // Not on index.html

  grid.innerHTML = "";

  if (!category) {
    titleEl.style.display = "none";
    noResults.style.display = "block";
    resultsSection.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const items = travelData[category];
  const labels = {
    beaches: "Beaches",
    temples: "Temples",
    countries: "Countries",
  };

  titleEl.textContent = `Recommended: ${labels[category]}`;
  titleEl.style.display = "block";
  noResults.style.display = "none";

  items.forEach((item) => {
    grid.appendChild(createCard(item));
  });

  resultsSection.scrollIntoView({ behavior: "smooth" });
}

/** Clears search input and results. */
function resetSearch() {
  const input = document.getElementById("searchInput");
  const grid = document.getElementById("resultsGrid");
  const titleEl = document.getElementById("resultsTitle");
  const noResults = document.getElementById("noResults");

  if (!input) return;

  input.value = "";
  if (grid) grid.innerHTML = "";
  if (titleEl) titleEl.style.display = "none";
  if (noResults) noResults.style.display = "none";

  input.focus();
}

// ======================================================
// 3. SEARCH EVENT LISTENERS (index.html only)
// ======================================================
function initSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const searchInput = document.getElementById("searchInput");

  if (!searchBtn || !searchInput) return; // Not on index.html

  searchBtn.addEventListener("click", () => {
    const category = categorize(searchInput.value);
    renderResults(category);
  });

  resetBtn.addEventListener("click", resetSearch);

  // Allow pressing Enter in the search input
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const category = categorize(searchInput.value);
      renderResults(category);
    }
  });
}

// ======================================================
// 4. CONTACT FORM VALIDATION (contact.html only)
// ======================================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    let valid = true;

    // Clear previous errors
    [nameInput, emailInput, messageInput].forEach((el) =>
      el.classList.remove("error"),
    );
    [nameError, emailError, messageError].forEach(
      (el) => (el.textContent = ""),
    );

    // Validate name
    if (nameInput.value.trim().length < 2) {
      nameInput.classList.add("error");
      nameError.textContent =
        "Please enter your full name (at least 2 characters).";
      valid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add("error");
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      messageInput.classList.add("error");
      messageError.textContent = "Message must be at least 10 characters long.";
      valid = false;
    }

    if (valid) {
      form.style.display = "none";
      document.getElementById("formSuccess").style.display = "block";
    }
  });
}

// ======================================================
// 5. MOBILE NAV TOGGLE
// ======================================================
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggle || !navLinks) return;

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    toggle.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("open") ? "true" : "false",
    );
  });

  // Close menu when a link is clicked (mobile UX)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// ======================================================
// 6. NAVBAR SEARCH (all pages)
// ======================================================
function initNavSearch() {
  const navInput = document.getElementById("navSearchInput");
  const navSearchBtn = document.getElementById("navSearchBtn");
  const navClearBtn = document.getElementById("navClearBtn");

  if (!navInput) return;

  const isHome = !!document.getElementById("resultsGrid");

  function doNavSearch() {
    const q = navInput.value.trim();
    if (!q) return;

    if (isHome) {
      // Sync with the main search input and trigger results
      const mainInput = document.getElementById("searchInput");
      if (mainInput) mainInput.value = q;
      renderResults(categorize(q));
    } else {
      // Redirect to Home with query param
      window.location.href = "index.html?q=" + encodeURIComponent(q);
    }
  }

  navSearchBtn.addEventListener("click", doNavSearch);

  navClearBtn.addEventListener("click", () => {
    navInput.value = "";
    if (isHome) {
      const mainInput = document.getElementById("searchInput");
      if (mainInput) mainInput.value = "";
      resetSearch();
    }
    navInput.focus();
  });

  navInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doNavSearch();
  });
}

// ======================================================
// 7. HANDLE ?q= QUERY PARAM ON HOME PAGE
// ======================================================
function handleQueryParam() {
  if (!document.getElementById("resultsGrid")) return;

  const params = new URLSearchParams(window.location.search);
  const q = params.get("q");
  if (!q) return;

  const navInput = document.getElementById("navSearchInput");
  const mainInput = document.getElementById("searchInput");
  if (navInput) navInput.value = q;
  if (mainInput) mainInput.value = q;
  renderResults(categorize(q));
}

// ======================================================
// 8. INIT – runs on every page
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initNavSearch();
  handleQueryParam();
  initSearch();
  initContactForm();
});
