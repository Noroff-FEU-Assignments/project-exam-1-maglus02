import { API_URL } from "./config.js";

const postFeaturedContainer = document.querySelector(".left");
const postsFeaturedContainer = document.querySelector(".featured-posts-container");
const slideContainer = document.querySelector(".carousel-container");
const postToDisplayFeatured = [8];
const postsToDisplayFeatured = [7, 9];
const postsToDisplayCarousel = [0, 1, 2, 3, 4, 5, 6, 7, 8];

async function fetchPosts() {
    const loader = document.querySelector(".loader-container");
    loader.style.display = "flex";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const json = await response.json();

        loader.style.display = "none";

        const postFeatured = postToDisplayFeatured.map(position => json[position]).filter(Boolean);
        const postsFeatured = postsToDisplayFeatured.map(position => json[position]).filter(Boolean);
        const carousel = postsToDisplayCarousel.map(position => json[position]).filter(Boolean);

        postFeatured.forEach(function (post) {
            const rawDate = new Date(`${post.date}`);
            const displayDate = rawDate.toDateString();
            postFeaturedContainer.innerHTML += ` <a href="posts/post.html?id=${post.id}">
            <div class="post">
                <img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post._embedded['wp:featuredmedia'][0].alt_text}">
                <div class="txt">
                    <p class="f">Featured</p>
                    <h2>${post.title.rendered}</h2>
                    <div class="author-date">
                        <p class="name">${post._embedded.author[0].name}</p>
                        <p>${displayDate}</p>
                    </div>
                </div>
            </div>
        </a>`
        })

        postsFeatured.forEach(function (post) {
            const rawDate = new Date(`${post.date}`);
            const displayDate = rawDate.toDateString();
            postsFeaturedContainer.innerHTML += `<a href="posts/post.html?id=${post.id}">
            <div class="post">
                <div class="author-date">
                    <p class="name">${post._embedded.author[0].name}</p>
                    <p>${displayDate}</p>
                </div>
                <h3>${post.title.rendered}</h3>
            </div>
        </a>`
        })

        carousel.forEach(function (post) {
            const rawDate = new Date(`${post.date}`);
            const displayDate = rawDate.toDateString();
            slideContainer.innerHTML += `<a href="posts/post.html?id=${post.id}">
            <div class="card"
                style='background-image: linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url("${post._embedded['wp:featuredmedia'][0].source_url}");'>
                <h2>${post.title.rendered}</h2>
                <div class="author-date">
                    <p class="name">${post._embedded.author[0].name}</p>
                    <p>${displayDate}</p>
                </div>
            </div>
        </a>`
        })

    } catch (error) {
        loader.style.display = "none";
        postFeaturedContainer.innerHTML = displayError(error);
    }

}

fetchPosts();

/*Carousel*/
const gap = 20;
const nextBtn = document.querySelector(".arrow-next");
const prevBtn = document.querySelector(".arrow-prev");
const content = document.querySelector(".carousel-container");

nextBtn.addEventListener("click", e => {
    content.scrollBy(width + gap, 0);
});
prevBtn.addEventListener("click", e => {
    content.scrollBy(-(width + gap), 0);
});

let width = content.offsetWidth;
window.addEventListener("resize", e => (width = content.offsetWidth));
