document.addEventListener("DOMContentLoaded", async () => {
    const postId = new URLSearchParams(window.location.search).get('id');
    const articleTitle = document.getElementById('article-title');
    const articleBody = document.getElementById('article-body');
    const commentsList = document.getElementById('comments-list');
    const backButton = document.getElementById('back-button');

    if (!title || !body || !comments || !backButton) {
        console.error('One or more required elements not found.');
        return;
    }

    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    if (!postId) {
        articleTitle.textContent = 'Invalid article ID';
        return;
    }

    try {
        const [articleResponse, commentsResponse] = await Promise.all([
            fetch(`https://gorest.co.in/public-api/posts/${postId}`),
            fetch(`https://gorest.co.in/public-api/comments?post_id=${postId}`)
        ]);

        if (!articleResponse.ok || !commentsResponse.ok) {
            throw new Error('Failed to fetch data.');
        }

        const { data: article } = await articleResponse.json();
        const { data: comments } = await commentsResponse.json();

        title.textContent = article.title;
        body.textContent = article.body;
        comments.innerHTML = comments.map(({ name, body }) => `
            <div>
                <strong>${name}</strong>
                <p>${body}</p>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error fetching article details:', error);
        articleTitle.textContent = 'Failed to load article.';
    }

    backButton.removeEventListener('click', () => {
        window.location.href = 'index.html';
    });
});