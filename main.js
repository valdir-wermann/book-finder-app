const key = ""; // your key so we can use google books api
const maxResults = ""; // max is 40

const loading = document.querySelector("#loading");
const input = document.querySelector("#inputForm");
const submit = document.querySelector("#buttonForm");
const results = document.querySelector("#results_list");

submit.addEventListener('click', () => onclick());

const onclick = () => {
    loading.style.visibility = 'visible';
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input.value}&key=${key}&maxResults=${maxResults}`)
        .then(_ => _.json())
        .then(_ => load(_.items))
        .catch(_ => { alert("An error happened while fetching the data."); console.error(_); });
}

const load = (list) => {
    results.innerHTML = "";
    list?.forEach(_ => results.innerHTML += result(_));
    console.log("loaded");
    loading.style.visibility = 'hidden';
}

const result = (obj) => {
    return `<div class="result">
    <p id="book_title">${obj.volumeInfo.title}</p>
    <img src="${obj.volumeInfo.imageLinks?.smallThumbnail}"
        onerror="this.onerror=null;this.src='./onerror.png';">
    <p id="author" class="info">Author: ${obj.volumeInfo.authors?.join(" & ")}</p>
    <p id="publisher" class="info">Publisher: ${obj.volumeInfo.publisher}</p>
    <p id="pages" class="info">Pages: ${obj.volumeInfo.pageCount}</p>
    <p id="categories" class="info">Categories: ${obj.volumeInfo.categories?.at(0)}</p>
    <p id="identifier" class="info">Identifier (${obj.volumeInfo.industryIdentifiers?.at(0).type}): ${obj.volumeInfo.industryIdentifiers?.at(0).identifier}</p>
    
    <div class="redirectButton">
        <a target="_blank"
            href="${obj.volumeInfo.canonicalVolumeLink}"
            class="redirect_to_book">Check more!</a>
    </div>
</div>`;
}