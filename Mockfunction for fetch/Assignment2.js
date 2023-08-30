// JavaScript source code
async function fetchapi(url) {
    try {
        let response = await mockfetch(url);
        let posts = await response.json();
        posts.forEach(post => getposts(post));
    } catch (err) {
        return err;
    }
}
async function mockfetch(url) {
    return new Promise(function (resolve, reject) {
        if (url == 'https://jsonplaceholder.typicode.com/posts') {
            const mockres = {
                json: () => Promise.resolve([
                    { id: 1, title: "mockpost-1", body:"quia et suscipcto"},
                    { id: 2, title: "mockpost-2", body:"est rerum tempore vitae nulla"},
                    { id: 3, title: "mockpost-3", body:"et iusto  aut"}
                ])
            };
            setTimeout(() => resolve(mockres));
        }
        else {
            reject(new Error("Can't access"));
        }
    });
}
function elem(tag) {
    return document.createElement(tag);
}

function getposts(post) {
    let ul = document.getElementById('postList');
    let container = elem('div');
    let title =elem('p');
    let body = elem('p');
    container.classList.add('posts');

    title.textContent = `Title:${post.title}`;
    body.textContent = `Body:${post.body}`;
    container.appendChild(title);
    container.appendChild(body);
    ul.append(container);
    document.body.append(ul);  
}
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.getElementById("loadspinner").style.visibility = "visible";
    } else {
        setTimeout(() => {
            document.getElementById("loadspinner").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }, 3000)
    }
};
fetchapi('https://jsonplaceholder.typicode.com/posts').then(null);


