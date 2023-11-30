import { POST_API_URL } from "./config.js";

const postContainer = document.querySelector(".main");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = POST_API_URL + id + "?_embed";

async function fetchPost() {

    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        document.title = `${data.title.rendered} | Quantum Realm`;
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        const descriptionText = `${data.title.rendered}` + ` | Quantum Realm`;
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute('content', descriptionText);
        }

        const rawDate = new Date(`${data.date}`);
        const displayDate = rawDate.toDateString();

        postContainer.innerHTML = `<h1 class="page-title">${data.title.rendered}</h1>
        <div class="author-date">
            <p class="name">${data._embedded.author[0].name}</p>
            <p>${displayDate}</p>
        </div>
        <div class="content">
            <img class="img" src="${data._embedded['wp:featuredmedia'][0].source_url}" alt="${data._embedded['wp:featuredmedia'][0].alt_text}">
            <div class="img_modal">
                <img class="modal_content">
            </div>
            ${data.content.rendered}
        </div>`

        /*Image modal*/
        var modal = document.querySelector(".img_modal");
        var img = document.querySelector(".img");
        var modal_img = document.querySelector(".modal_content");

        img.onclick = function () {
            modal.style.display = "block";
            modal_img.src = this.src;
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    } catch (error) {
        loader.style.display = "none";
        postContainer.innerHTML = displayError(error);
    }
}

fetchPost();