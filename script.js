const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const whatsappBtn = document.getElementById("whatsapp");
const spinner = document.getElementById("loader");

let errorCounter = 0;

const loading = () => {
  spinner.hidden = false;
  quoteContainer.hidden = true;
};

const loaded = () => {
  if (!spinner.hidden) {
    spinner.hidden = true;
    quoteContainer.hidden = false;
  }
};

const getQuote = async () => {
  loading();
  const proxyUrl = "https://secure-gorge-04157.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const res = await fetch(proxyUrl + apiUrl);
    const data = await res.json();

    //If a quote is too long then modify its size
    if (data.quoteText.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    //If there is no author, then show Anonymous
    if (data.quoteAuthor === "") {
      authorText.innerText = "Anonymous";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    loaded();
  } catch (err) {
    errorCounter++;
    console.log(errorCounter);
    if (errorCounter < 10) {
      getQuote();
    }
    console.log("Ooops! There aren't quotes for now :(" + err);
  }
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
  window.open(twitterUrl, "_blank");
};

const whatsappQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const whats = `whatsapp://send?text="${quote}" - ${author}`;
  window.open(whats, "_blank");
};

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
whatsappBtn.addEventListener("click", whatsappQuote);
getQuote();
