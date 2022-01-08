//Manipulating the DOM
const quoteContainer = document.querySelector("#quote-container")
const quote = document.querySelector("#quote")
const author = document.querySelector("#author")
const newQuote = document.querySelector("#new-quote")
const twitterBtn = document.querySelector("#twitter-btn")
const loader = document.querySelector("#loader")

let apiQuotes = []
//loading function
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}
function complete(){
    loader.hidden = true
    quoteContainer.hidden = false
}
//getting new quotes
function newQuotes(array){
    let random = Math.floor(Math.random() * array.length)
    //checking the quote length to detemine the styling
    if(array[random].text.length > 100){
        quote.classList.add(".long-quote")
    }else{
        quote.classList.remove(".long-quote")
    }
    quote.textContent = array[random].text
    author.textContent = array[random].author
}

//Getting the Quotes from the API
async function getQuotes(){
    loading()
    const apiUrl = "https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        complete()
        newQuotes(apiQuotes)
    } catch (error) {
        alert("Error: " + error)
    }
}

getQuotes()


//Tweeting Quotes
function tweetQuote(){
    const tweetQuote = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`
    window.open(tweetQuote, "_blank")
}

twitterBtn.addEventListener("click", tweetQuote)

newQuote.addEventListener("click", getQuotes)