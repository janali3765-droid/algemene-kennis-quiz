:root {
  --bg-1: #050b16;
  --bg-2: #111827;
  --bg-3: #1f1635;
  --card: rgba(15, 23, 42, 0.88);
  --card-strong: rgba(17, 24, 39, 0.96);
  --panel: rgba(31, 41, 55, 0.88);
  --primary: #8b5cf6;
  --primary-strong: #7c3aed;
  --accent: #34d399;
  --accent-strong: #10b981;
  --danger: #f87171;
  --text: #eef2ff;
  --muted: #cbd5e1;
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 24px 60px rgba(15, 23, 42, 0.5);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: Arial, Helvetica, sans-serif;
  background: radial-gradient(circle at top, rgba(139, 92, 246, 0.18), transparent 20%),
    linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 42%, var(--bg-3) 100%);
  color: var(--text);
}

.page-shell {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 20px 70px;
}

.topbar {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.brand {
  padding: 12px 24px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.75);
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: var(--shadow);
}

.quiz-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 30px 24px 26px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
}

.intro {
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #c4b5fd;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.75rem;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 3rem);
  line-height: 1.2;
}

.subtitle {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.6;
}

.meta-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 22px;
  font-size: 0.95rem;
}

.questions {
  display: grid;
  gap: 18px;
}

.question {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px 18px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.question:hover {
  border-color: rgba(139, 92, 246, 0.55);
  transform: translateY(-1px);
}

.question h2 {
  margin: 0 0 14px;
  font-size: 1.08rem;
  line-height: 1.5;
}

.options {
  display: grid;
  gap: 10px;
}

.option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  background: rgba(15, 23, 42, 0.68);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.option:hover {
  border-color: rgba(52, 211, 153, 0.7);
  background: rgba(15, 23, 42, 0.9);
}

.option input {
  accent-color: var(--primary);
  width: 18px;
  height: 18px;
  margin: 0;
}

.option span {
  color: var(--text);
  font-size: 0.98rem;
}

.actions {
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

button {
  border: none;
  border-radius: 14px;
  padding: 16px 30px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  box-shadow: 0 18px 30px rgba(124, 58, 237, 0.35);
  transition: transform 0.15s ease, opacity 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  opacity: 0.98;
}

button:active {
  transform: translateY(0);
}

.result {
  min-height: 42px;
  margin-top: 22px;
  text-align: center;
  font-weight: 700;
  font-size: 1.04rem;
  line-height: 1.5;
  color: var(--accent);
}

.result.error {
  color: var(--danger);
}

@media (max-width: 640px) {
  .page-shell {
    padding-inline: 14px;
  }

  .quiz-card {
    padding: 22px 14px 18px;
  }

  .question {
    padding: 16px 12px;
  }

  .meta-bar {
    justify-content: center;
    text-align: center;
  }

  button {
    width: 100%;
  }
}
