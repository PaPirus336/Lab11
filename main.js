document.addEventListener("DOMContentLoaded", async () => {
    const page = new URLSearchParams(window.location.search).get('page') || 1;
    const links = document.getElementById('links');
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
    const { data: articles } = await response.json();
    links.innerHTML = articles.map(({ id, title }) => `
        <div>
            <a href="page.html?id=${id}">${title}</a>
        </div>
    `).join('');
});