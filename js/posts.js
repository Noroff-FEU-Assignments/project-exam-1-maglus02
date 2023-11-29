import { API_URL } from "./config.js";

const postsContainer = document.querySelector(".posts");
const inital_posts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const extra_posts = [10, 11];

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

        const posts = inital_posts.map(position => json[position]).filter(Boolean);

        posts.forEach(function (post) {
            const rawDate = new Date(`${post.date}`);
            const displayDate = rawDate.toDateString();
            postsContainer.innerHTML += `<a href="posts/post.html?id=${post.id}">
            <div class="post">
                <img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post._embedded['wp:featuredmedia'][0].alt_text}">
                <div class="txt">
                    <h2>${post.title.rendered}</h2>
                    <div class="author-date">
                        <p class="name">${post._embedded.author[0].name}</p>
                        <p>${displayDate}</p>
                    </div>
                </div>
            </div>
        </a>`
        })

    } catch (error) {
        loader.style.display = "none";
        postsContainer.innerHTML = displayError(error);
    }

}

fetchPosts();

export async function fetchMorePosts() {
    const load_more_btn = document.querySelector(".load-more");
    load_more_btn.style.display = "none";

    const loader = document.querySelector(".loader-container-more");
    loader.style.display = "flex";

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const json = await response.json();

        loader.style.display = "none";

        const extraPosts = extra_posts.map(position => json[position]).filter(Boolean);

        extraPosts.forEach(function (post) {
            const rawDate = new Date(`${post.date}`);
            const displayDate = rawDate.toDateString();
            postsContainer.innerHTML += `<a href="posts/post.html?id=${post.id}">
            <div class="post">
                <img src="${post._embedded['wp:featuredmedia'][0].source_url}">
                <div class="txt">
                    <h2>${post.title.rendered}</h2>
                    <div class="author-date">
                        <p class="name">${post._embedded.author[0].name}</p>
                        <p>${displayDate}</p>
                    </div>
                </div>
            </div>
        </a>`
        })
    } catch (error) {
        loader.style.display = "none";
        postsContainer.innerHTML = displayError(error);
    }

}