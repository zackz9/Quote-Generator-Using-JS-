//Getting elements from dOM
const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newQuote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Getting newQuote from API
async function getNewQuote() {

    showLoadingSpinner();
    // Setting a proxy url for api to skip CORS error fetching 
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiLink = 'https://api.forismatic.com/api/1.0/?method=getNewQuote&lang=en&format=json'

    try {
        const response = await fetch(proxyUrl + apiLink);
        const data = await response.json();


        //If the author's name is not defined, then add a unknown name
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor ;
        }
        // dynamically reduce font size of quote if it's so long
        if(data.quoteText.length > 70 ) {
            quoteText.classList.add('longQuote');
        } else {
            quoteText.classList.remove('longQuote');

        }

        quoteText.innerText = data.quoteText;
        hideLoadingSpinner();
        throw new Error('error in process');       
    } catch (error) {

        console.log( error);
        getNewQuote();

    }
}

function tweetingQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');   
}

newQuoteBtn.addEventListener('click', getNewQuote);
twitterBtn.addEventListener('click', tweetingQuote);

getNewQuote();
