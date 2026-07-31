const app = document.getElementById("app");

const data = {
  signin: ["User Account", "Sign In"],
  forgot: ["User Account › Sign In", "Forget Password"],
  reset: ["User Account › Sign In › Forget Password", "Reset Password"],
  signup: ["User Account", "Sign Up"],
  verify: ["Sign Up", "Email Verification"],
  faq: ["Pages", "FAQs"]
};

function field(placeholder = "", password = false) {
  return `<div class="${password ? "password" : ""}">
    <input type="${password ? "password" : "text"}" placeholder="${placeholder}">
    ${password ? "<span>⊙</span>" : ""}
  </div>`;
}

function tabs(active) {
  return `<div class="tabs">
    <a class="${active === "signin" ? "selected" : ""}" href="#signin">Sign In</a>
    <a class="${active === "signup" ? "selected" : ""}" href="#signup">Sign Up</a>
  </div>`;
}

function social(text) {
  return `<div class="or">or</div>
    <button class="social">G　${text} with Google</button>
    <button class="social">●　${text} with Apple</button>`;
}

function signIn() {
  return `<article class="card">
    ${tabs("signin")}
    <div class="label">Email Address</div>
    ${field()}
    <div class="label">Password <a href="#forgot">Forget Password</a></div>
    ${field("", true)}
    <button class="primary">SIGN IN　→</button>
    ${social("Login")}
  </article>`;
}

function forgot() {
  return `<article class="card">
    <h2>Forget Password</h2>
    <p class="intro">Enter the email address or mobile phone number<br>associated with your Clicon account.</p>
    <div class="label">Email Address</div>
    ${field()}
    <button class="primary" onclick="location.hash='reset'">SEND CODE　→</button>
    <p class="small">Already have account? <a href="#signin">Sign In</a><br>Don't have account? <a href="#signup">Sign Up</a></p>
    <hr class="line">
    <p class="small">You may contact <a>Customer Service</a> for help restoring access to your account.</p>
  </article>`;
}

function reset() {
  return `<article class="card">
    <h2>Reset Password</h2>
    <p class="intro">Create a new password for your account.</p>
    <div class="label">Password</div>${field("8+ characters", true)}
    <div class="label">Confirm Password</div>${field("", true)}
    <button class="primary" onclick="location.hash='signin'">RESET PASSWORD　→</button>
  </article>`;
}

function signUp() {
  return `<article class="card">
    ${tabs("signup")}
    <div class="label">Name</div>${field()}
    <div class="label">Email Address</div>${field()}
    <div class="label">Password</div>${field("8+ characters", true)}
    <div class="label">Confirm Password</div>${field("", true)}
    <label class="check"><input type="checkbox" checked> Are you agree to Clicon Terms of Condition and Privacy Policy.</label>
    <button class="primary" onclick="location.hash='verify'">SIGN UP　→</button>
    ${social("Sign up")}
  </article>`;
}

function verify() {
  return `<article class="card">
    <h2>Verify Your Email Address</h2>
    <p class="intro">Enter the verification code sent to your email address.</p>
    <div class="label">Verification Code <a>Resend Code</a></div>
    ${field()}
    <button class="primary" onclick="location.hash='signin'">VERIFY ME　→</button>
  </article>`;
}

function faq() {
  const questions = [
    "Suspendisse ultrices pharetra libero sed interdum.",
    "Fusce molestie condimentum facilisis.",
    "Quisque quis nunc quis urna tempor lobortis vel non orci.",
    "Donec rutrum ultrices ante nec malesuada."
  ];

  return `<section class="faq">
    <div>
      <h1>Frequently Asked Questions</h1>
      ${questions.map((q, i) => `<div class="question ${i === 1 ? "open" : ""}">
        <div class="q">${q}<b>${i === 1 ? "−" : "+"}</b></div>
        ${i === 1 ? `<div class="answer">Nulla malesuada iaculis nisi, vitae sagittis lacus lorem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed mollis accumsan dui, non iaculis magna mattis id.</div>` : ""}
      </div>`).join("")}
    </div>
    <aside class="support">
      <h3>Don't find your answer, Ask for support.</h3>
      <p>Send us your question and our support team will help you.</p>
      <input placeholder="Email address">
      <input placeholder="Subject">
      <textarea placeholder="Message (Optional)"></textarea>
      <button class="primary">SEND MESSAGE　→</button>
    </aside>
  </section>`;
}

const pages = { signin: signIn, forgot, reset, signup: signUp, verify, faq };

function render() {
  let key = location.hash.replace("#", "") || "signin";
  if (!pages[key]) key = "signin";

  document.getElementById("section").textContent = data[key][0];
  document.getElementById("page").textContent = data[key][1];
  app.innerHTML = pages[key]();
}

window.addEventListener("hashchange", render);
render();