const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

//rondom Quote Generator 

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerHTML="loading Quote...";
    fetch("http://api.quotable.io/random").then(res=>res.json()).then(result=>{
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote"

    });
}

quoteBtn.addEventListener("click", randomQuote);

//speech Button
speechBtn.addEventListener("click",()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance=new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`)
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speak?speechBtn.classList.remove("active"):speechBtn.classList.add("active");
        },10);
    }
});

//  copy quote content  
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

// share quote in twitter
twitterBtn.addEventListener("click",()=>{
    let tweetUrl =`https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl,"_blank");
});

