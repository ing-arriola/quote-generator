const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

const getQuote = async () => {
  const proxyUrl = "https://secure-gorge-04157.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const res = await fetch(proxyUrl + apiUrl);
    const data = await res.json();
    console.log(data);
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
  } catch (err) {
    console.log("whoops there is no quote", err);
    getQuote();
  }
};

getQuote();
