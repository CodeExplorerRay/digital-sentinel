<div align="center">
  <img src="public/Images/logo.png" alt="Digital Sentinel Logo" width="150">
  <h1>Digital Sentinel</h1>
  <p><b>Your AI-Powered Password Security Advisor</b></p>
  <p>
    <a href="#-key-features">Key Features</a> •
    <a href="#-how-it-works">How It Works</a> •
    <a href="#-why-it-stands-out">Why It's Different</a> •
    <a href="#-future-vision">Future Vision</a>
  </p>
</div>
<div align="center">
  <p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Jest-C21325?style=flat&logo=jest&logoColor=white" alt="Jest">
  </p>
</div>

---

In a world of constant digital threats, your password is your first line of defense. **Digital Sentinel** is your personal security advisor, designed to help everyone—from the tech-savvy to the everyday internet user—instantly understand and improve their password security.

It demystifies the complex world of cybersecurity by providing clear, actionable intelligence on your passwords, checking for data breach exposure, and offering personalized, AI-powered advice to help you stay one step ahead of threats.

## 🔐 Key Features

- **Password strength analysis:** Calculates a heuristic strength score and
  entropy, reports feedback, and displays an estimated crack time. These are
  educational approximations, not a security guarantee.
- **Breach lookup:** Checks the Have I Been Pwned (HIBP) Passwords service using
  its range API. The browser sends the password to this app's `/api/checkBreach`
  endpoint so the server can hash it. The server sends only the first five
  characters of the SHA-1 hash to HIBP and compares returned suffixes locally;
  the full password is not sent to HIBP.
- **AI security advice:** The `/api/advice` endpoint can request recommendations
  from an Ollama model. If Ollama is unavailable, the endpoint returns built-in
  fallback advice based on the breach status, password-length feedback, and
  strength score. The AI request contains analysis data, not the password.
- **Password generator:** Generates passwords in the browser using the Web
  Crypto API, with configurable character sets and lengths from 8 to 64
  characters.
- **About and legal pages:** Includes informational and policy pages.

## 🛠️ How It Works

1. Password strength analysis and password generation run in the browser.
2. For breach lookup, the app server hashes the submitted password and sends a
   five-character hash prefix to HIBP. It compares the response locally to
   determine whether the complete hash appears in the breach data.
3. When requested, the advice endpoint sends score, entropy, feedback, and
   breach status to the configured Ollama service. If that service cannot
   generate a response, the app uses built-in category-based advice.

## ✨ Why It's Different

- **Privacy-conscious breach checks:** HIBP receives only a partial hash, not
  the password or its complete hash. The password is sent to this application's
  server for hashing, so this is not a claim that the password never leaves the
  browser.
- **Local model option:** During local development, the advice route can use an
  Ollama model running on the developer's computer. The app also has built-in
  advice for when Ollama is unavailable.
- **Practical tools together:** Users can analyze a password, check its breach
  status, request advice, and generate a password from the same application.

## 🚀 Run Locally

Requirements: Node.js, npm, and (optionally) Ollama for model-generated advice.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The advice route defaults to `http://localhost:11434` and the model
`qwen2.5:1.5b`. To use that model, install it in Ollama:

```bash
ollama pull qwen2.5:1.5b
```

You can override the model settings in `.env.local`:

```dotenv
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:1.5b
```

Restart the Next.js server after changing environment variables. Ollama running
on your computer is not reachable from a deployed Vercel function through
`localhost`. For hosted model-generated advice, configure a secured,
network-accessible Ollama-compatible service and set `OLLAMA_BASE_URL` and
`OLLAMA_MODEL` in the hosting provider's environment. Without a reachable model,
the app can return built-in fallback advice.

## 🔭 Future Vision

Potential future work includes hosted AI integrations and additional
security-education features. These are plans, not currently implemented
capabilities.

## ⚠️ Current Limitations

- This checkout has no `Dockerfile`; the included Compose file is not a verified
  way to build or run the application.
- The production build currently fails type validation because
  `app/components/page.jsx` is treated as an App Router page but does not export
  a page module.
- A Jest test file is present, but Jest and its configured
  `jest-environment-jsdom` are not declared in `package.json`; the test command
  has not been verified in this checkout.
- No root-level software license file is present. The in-app legal pages should
  not be treated as a software license.
