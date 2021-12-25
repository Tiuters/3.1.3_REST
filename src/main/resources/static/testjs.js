
const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        // console.log(post);
        output += `
            <div class="card mt-4 col-md-3 bg-light">
                <div class="card-body">
                    <h5 class="card-title">${post.name}</h5>
                    <h5 class="card-subtitle mb-2 text-muted">${post.position}</h5>
                    <p class="card-text">${post.id}</p>
                    <a href="#" class="card-link">Edit</a>
                    <a href="#" class="card-link">Delete</a>
                </div>
            </div>
            `;
    });
    postsList.innerHTML = output;
}

const url = '/api/get-all-users';

// fetch(url)
//     .then(res => console.log(res))

// fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data))

// GET - Read the posts
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

// POST - Insert new post
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('Form submitted!');
    console.log(titleValue.value)

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
})



