// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj0FBoiBhr6OArs9cJa3ULkm6GazukKes",
  authDomain: "trailmax2-dbce1.firebaseapp.com",
  projectId: "trailmax2-dbce1",
  storageBucket: "trailmax2-dbce1.firebasestorage.app",
  messagingSenderId: "669853183120",
  appId: "1:669853183120:web:6660e4a55220f3a8f4bc15",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// get all necessary variables from Html
const authForm = document.querySelector("form#auth-form");
const userFullName = document.querySelector("input#full-name");
const userName = document.querySelector("input#username");
const userEmail = document.querySelector("input#email");
const userPassword = document.querySelector("input#password");
const signOutBtn = document.querySelector(
  ".nav-items-container .nav-items .nav-element button#sign-out"
);

// Signup a new user
const userSignUp = async () => {
  createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      user.displayName = userName.value;
      user.fullName = userFullName.value;
      user.playlist = [];
      user.likedMovies = [];
      user.watchHistory = [];

      const loginModal = document.querySelector(".login-modal");
      loginModal.classList.add("active");

      setTimeout(() => {
        loginModal.classList.remove("active");
        location.replace("/");
        console.log("registered successfully");
      }, 1500);
    })
    .catch((error) => {
      console.log("Error");
      console.log(error.code + error.message);
      console.log(error);
    });
};

const userLogIn = async () => {
  signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then((userCredential) => {
      const user = userCredential.user;
      location.replace("/");
    })
    .catch((error) => {
      console.log("Error");
      console.log(error.code + error.message);
      console.log(error);
    });
};

const userLogOut = async () => {
  await signOut(auth);
};

const checkAuthState = async () => {
  const userLibrary = document.querySelector(
    ".nav-items-container .nav-items #user-library"
  );
  const loginLink = document.querySelector(
    ".nav-items-container .nav-items .nav-element #login"
  );
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userLibrary ? (userLibrary.style.display = "block") : null;
      loginLink ? (loginLink.style.display = "none") : null;
      signOutBtn ? (signOutBtn.style.display = "inline-block") : null;
      console.log("User Signed In");
    } else {
      userLibrary ? (userLibrary.style.display = "none") : null;
      loginLink ? (loginLink.style.display = "block") : null;
      signOutBtn ? (signOutBtn.style.display = "none") : null;
      console.log("User Not signed In");
    }
  });
};

checkAuthState();

authForm
  ? authForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (authForm.classList.contains("signup-form")) {
        userSignUp();
      } else {
        userLogIn();
      }
      // handle submit
    })
  : null;

signOutBtn ? signOutBtn.addEventListener("click", userLogOut) : null;
