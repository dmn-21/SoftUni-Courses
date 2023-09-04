function attachEvents() {
    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const btnViewPost = document.getElementById('btnViewPost');
    const btnPosts = document.getElementById('posts');

    let posts;

    btnLoadPosts.addEventListener('click', postsTitle);
    btnViewPost.addEventListener('click', postsView);

    async function postsView() {
        const result = await
         (await fetch('http://localhost:3030/jsonstore/blog/comments')
         ).json();

         const selectedPost = posts[document.getElementById('posts').value];

         const comments = Object.values(result).filter(
            (comment) => comment.postId === selectedPost.id);

        let postTitle = document.getElementById('post-title');
        postTitle.textContent = selectedPost.title;
        let postBody = document.getElementById('post-body');
        postBody.textContent = selectedPost.body;
        let postComments = document.getElementById('post-comments');
        for (let i = 0; i < comments.length; i++) {
            let li = document.createElement('li');
            li.textContent = comments[i].text;
            postComments.appendChild(li);
        }
    }

    async function postsTitle() {
        const response = await
         (await fetch('http://localhost:3030/jsonstore/blog/posts')
         ).json();
         
         posts = response;

         let responsePostsObj = Object.values(response);

        for (const res of responsePostsObj) {
            let option = document.createElement('option');
            option.value = res.id;
            option.text = res.title;
            btnPosts.appendChild(option);
        }
    }
}

attachEvents();