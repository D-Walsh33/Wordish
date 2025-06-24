# Wordish 🟩🟨⬜

**Wordish** is a simple Wordle-inspired word guessing game built with Node.js, EJS, HTML, CSS, and JavaScript. Players have six tries to guess a randomly selected five-letter word, receiving colored feedback after each attempt.

In addition to classic gameplay, **Wordish** includes a unique twist: the option to reveal a visual hint using the **Unsplash API**. If a matching image is found, it will be shown to help guide your guess!

## 🕹️ Gameplay

- ✅ Guess a **five-letter word** in **six attempts**
- 🟩 Green = correct letter in the correct position
- 🟨 Yellow = correct letter, wrong position
- ⬜ Gray = incorrect letter
- 🌙 Includes a **dark mode** for comfortable play in low-light environments
- 🖼️ Optional image hint from **Unsplash** based on the answer word

## 📸 Screenshot

> _(Add a screenshot or gameplay GIF here)_

---

## ⚙️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/D-Walsh33/Wordish.git
   cd Wordish
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Unsplash API access key:

   ```
   UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

4. Start the server:

   ```bash
   node index.js
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## 🧰 Tech Stack

- **Node.js** – server-side logic
- **EJS** – dynamic templating
- **HTML/CSS** – layout and styling
- **JavaScript** – core game logic and interactivity
- **Unsplash API** – dynamic visual hint generation

---

## 🚧 Future Improvements

- Keyboard input support
- Scoring or streak tracking
- Full mobile responsiveness
- Deployment to Render, Vercel, or GitHub Pages
- Save/share daily puzzle feature

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html) game
- Photo hints powered by [Unsplash](https://unsplash.com/developers)
