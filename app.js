import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 Firebase console se copy kiya hua config yahan paste karo
const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE",
  projectId: "PASTE_HERE",
  appId: "PASTE_HERE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// SIGNUP
window.signup = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: document.getElementById("name").value,
      email: email,
      role: "student",
      createdAt: serverTimestamp()
    });

    alert("Signup successful & data saved ✅");
  })
  .catch((error) => {
    alert(error.message);
  });

};

// LOGIN
window.login = function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Login successful 🎉"))
    .catch(err => alert(err.message));
};
