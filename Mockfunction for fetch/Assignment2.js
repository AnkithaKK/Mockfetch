// JavaScript source code

async function mockfetch(url) {
    return new Promise(function (resolve, reject) {
        if (url == 'https://jsonplaceholder.typicode.com/posts') {
            let mockres = {
                json: () => Promise.resolve([
                    { id: 1, title: "mockpost-1" },
                    { id: 2, title: "mockpost-2" },
                    { id: 3, title: "mockpost-3"}
                ])
            };
            setTimeout(() => resolve(mockres), 2000);
        }
        else {
            reject(new Error("Can't access"));
        }
    });
}

async function fetchapi(url) {
    try {
        let response = await mockfetch(url);
        let posts = await response.json();
        let ul = document.getElementById('postList');

        let i = 1;
        posts.forEach(post => {
            let container = document.createElement('div');
            container.classList.add('posts');

            let title = document.createElement('p');
            title.append(post.id);

            let body = document.createElement('p');
            body.append(post.title);

            container.append(`Post ${i} {`);

            container.append(title);
            container.append(body);
            container.append('}');


            ul.append(container);
            
            i++;
        });
    } catch (err) {
        return err;
    }
}

fetchapi('https://jsonplaceholder.typicode.com/posts').then(null,err=>alert(err));
