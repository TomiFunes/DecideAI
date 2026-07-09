window.onload = function () {
  resetDecision();

  const savedLanguage = localStorage.getItem("language") || "en";

  setLanguage(savedLanguage);
};

const translations = {
  en: {
    decisionQuestion: "What decision are you trying to make?",
    q1: "Why are you unsure?",
    q2: "What do you want to achieve?",
    q3: "What worries you most?",
    recommendationTitle: "Recommendation",
    recommendationLabel: "Recommendation",
    confidenceLabel: "Decision clarity",
    factorsLabel: "Key Factors",
    prosLabel: "Pros",
    consLabel: "Risks",
    futureYesLabel: "Recommended Path",
    futureNoLabel: "Alternative Path",
    newDecisionLabel: "New Decision",
    loadingTitle: "Analyzing...",
    loadingText: "Evaluating factors, risks and outcomes.",
    heroTitle: "Make better decisions",
    heroTyping: "with AI",
    heroDescription:
      "Analyze complex decisions, evaluate risks and win confidence before making your next important decision.",
    startBtn: "Start analysis",
    tagline: "Intelligent Decision Support",
    subtitle:
      "Make important decisions with confidence using AI-powered analysis, scenario simulation and structured reasoning.",
    clarityDescription:
      "Decision Clarity reflects how reliable the recommendation is based on the information provided. The more complete and consistent the information, the higher the confidence and precision of the recommendation.",
    continueBtn: "Continue",
    analyzeBtn: "Analyze",
    backBtn: "Back",
    newDecisionBtn: "New Decision",
    decisionAlert: "Please enter a decision.",
    answersAlert: "Please answer all questions.",
  },

  es: {
    continueBtn: "Continuar",
    analyzeBtn: "Analizar",
    backBtn: "Atrás",
    newDecisionBtn: "Nueva decisión",
    decisionAlert: "Por favor introduce una decisión.",
    answersAlert: "Por favor responde todas las preguntas.",
    heroTitle: "Toma Mejores Decisiones",
    heroTyping: "con IA",
    heroDescription:
      "Analiza decisiones complejas, evalúa riesgos y gana confianza antes de tomar tu próxima decisión importante.",
    startBtn: "Comenzar Análisis",
    decisionQuestion: "¿Cuál es la decisón que estas intentando tomar?",
    q1: "¿Por qué tienes dudas?",
    q2: "¿Qué deseas conseguir?",
    q3: "¿Qué es lo que más te preocupa?",
    recommendationTitle: "Recomendación",
    recommendationLabel: "Recomendación",
    confidenceLabel: "Claridad de la decisión",
    factorsLabel: "Factores clave",
    prosLabel: "Ventajas",
    consLabel: "Riesgos",
    clarityDescription:
      "La claridad de la decisión refleja qué tan fiable es la recomendación según la información proporcionada. Cuanto más completa y consistente sea la información, mayor será la confianza y precisión de la recomendación.",
    futureYesLabel: "Ruta recomendada",
    futureNoLabel: "Ruta alternativa",
    tagline: "Asistente Inteligente para la Toma de Decisiones",
    subtitle:
      "Toma decisiones importantes con confianza mediante análisis impulsado por IA, simulación de escenarios y razonamiento estructurado.",

    newDecisionLabel: "Nueva decisión",
    loadingTitle: "Analizando...",
    loadingText: "Evaluando factores, riesgos y posibles resultados.",
  },
};

function setLanguage(lang) {
  localStorage.setItem("language", lang);

  document
    .querySelectorAll(".language-selector button")
    .forEach((btn) => btn.classList.remove("active"));

  document.getElementById(`lang-${lang}`).classList.add("active");

  animateHeroTyping(lang);

  document.getElementById("heroTitle").innerText = translations[lang].heroTitle;

  document.getElementById("heroDescription").innerText =
    translations[lang].heroDescription;

  document.getElementById("startBtn").innerText = translations[lang].startBtn;

  document.getElementById("decisionQuestion").innerText =
    translations[lang].decisionQuestion;

  document.getElementById("q1").innerText = translations[lang].q1;

  document.getElementById("q2").innerText = translations[lang].q2;

  document.getElementById("q3").innerText = translations[lang].q3;

  document.getElementById("recommendationTitle").innerText =
    translations[lang].recommendationTitle;

  document.getElementById("continueBtn").innerText =
    translations[lang].continueBtn;

  document.getElementById("analyzeBtn").innerText =
    translations[lang].analyzeBtn;

  document.getElementById("backBtn1").innerText =
    `← ${translations[lang].backBtn}`;

  document.getElementById("backBtn2").innerText =
    `← ${translations[lang].backBtn}`;

  document.getElementById("newDecisionBtn").innerText =
    `🔄 ${translations[lang].newDecisionBtn}`;
}

function resetDecision() {
  document.getElementById("decision").value = "";
  document.getElementById("answer1").value = "";
  document.getElementById("answer2").value = "";
  document.getElementById("answer3").value = "";

  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.add("hidden");

  const lang = localStorage.getItem("language") || "en";

  document.getElementById("resultText").innerText =
    translations[lang].loadingTitle;
}

function nextStep() {
  const decision = document.getElementById("decision").value.trim();

  if (!decision) {
    const lang = localStorage.getItem("language") || "en";

    showNotification(translations[lang].decisionAlert);

    return;
  }

  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}
function animateHeroTyping(lang) {
  const element = document.getElementById("heroTyping");

  element.textContent = "";

  const text = translations[lang].heroTyping;

  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;

      setTimeout(type, 120);
    }
  }

  type();
}

function backToStep1() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
}

function backToStep2() {
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function generateResult() {
  const a1 = document.getElementById("answer1").value.trim();
  const a2 = document.getElementById("answer2").value.trim();
  const a3 = document.getElementById("answer3").value.trim();

  if (!a1 || !a2 || !a3) {
    const lang = localStorage.getItem("language") || "en";

    showNotification(translations[lang].answersAlert);

    return;
  }

  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  const decision = document.getElementById("decision").value;

  const lang = localStorage.getItem("language") || "en";
  const t = translations[lang];

  document.getElementById("resultText").innerText = t.loadingTitle;

  fetch("https://hook.eu1.make.com/2eat334qinikqczl6mi7pup9eylj3o5h", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: localStorage.getItem("language") || "en",
      decision,
      a1,
      a2,
      a3,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      const cleanJson = data.trim().replace(/^{{{/, "{").replace(/}}}$/, "}");

      const result = JSON.parse(cleanJson);

      let html = `<div class="result-grid">`;

      html += `
      <div class="result-card recommendation-card">
        <h2>📌 ${t.recommendationLabel}</h2>
        <p>${result.recommendation}</p>
      </div>

      <div class="result-card confidence-card">
        <h2>📊 ${t.confidenceLabel}</h2>

        <div class="confidence-bar">
          <div
            class="confidence-fill"
            style="width:${result.confidence}%">
          </div>
        </div>

        <p class="confidence-score">
          ${result.confidence}%
        </p>

        <p class="confidence-description">
          ${t.clarityDescription}
        </p>
      </div>
      `;

      html += `
                  <div class="result-card">
                  <h2>🎯 ${t.factorsLabel}</h2>
                  <ul>
                  `;

      result.keyFactors.forEach((factor) => {
        html += `<li>${factor}</li>`;
      });

      html += `
                  </ul>
                  </div>
                  `;

      html += `
                  <div class="result-card pros-card">
                  <h2>✅ ${t.prosLabel}</h2>
                  <ul>
                  `;

      result.pros.forEach((pro) => {
        html += `<li>${pro}</li>`;
      });

      html += `
                  </ul>
                  </div>
                  `;

      html += `
                  <div class="result-card cons-card">
                  <h2>⚠️ ${t.consLabel}</h2>
                  <ul>
                  `;

      result.cons.forEach((con) => {
        html += `<li>${con}</li>`;
      });

      html += `
                  </ul>
                  </div>
                  `;
      html += `
                  <div class="result-card">

                  <h2>🚀 ${t.futureYesLabel}</h2>

                  <p>${result.futureScenarioIfYes}</p>

                  </div>
                  `;

      html += `
                  <div class="result-card">

                  <h2>🛑 ${t.futureNoLabel}</h2>

                  <p>${result.futureScenarioIfNo}</p>

                  </div>
                  `;

      html += `
                  </div>
                  `;

      document.getElementById("resultText").innerHTML = html;
    })
    .catch((error) => {
      console.error(error);

      document.getElementById("resultText").innerHTML = `
                      <h2>❌ Error</h2>
                      <pre>${error}</pre>
                    `;
    });
}

document.querySelectorAll("textarea").forEach((textarea) => {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

function startApp() {
  history.pushState({ page: "app" }, "");
  document.getElementById("heroSection").classList.add("hidden");

  document.getElementById("mainApp").classList.remove("hidden");
}
window.addEventListener("popstate", () => {
  document.getElementById("mainApp").classList.add("hidden");

  document.getElementById("heroSection").classList.remove("hidden");
});

function showNotification(message) {
  const notification = document.getElementById("notification");

  notification.textContent = message;

  notification.classList.remove("hidden");

  setTimeout(() => {
    notification.classList.add("hidden");
  }, 3000);
}
