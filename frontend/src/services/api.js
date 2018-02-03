

let token = localStorage.token;
console.log('** Token is',token);

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
};

/**
 * Return a Promise for the array of categories
 */
export const fetchCategories = () => {
    const url = 'http://localhost:3001/categories';
    return fetch(url, {
        headers: headers,
    }).then(function (response) {
        return response.json();
    });
};

/**
 * Return a Promise for the array of posts
 */
export const fetchPosts = () => {
    const url = 'http://localhost:3001/posts';
    return fetch(url, {        headers: headers,

    }).then(function (response) {
        return response.json();
    });
};

/**
 * Return a Promise for the array of posts
 */
export const fetchPost = (id) => {
    console.log('Fetching...',id);
    const url = `http://localhost:3001/posts/${id}`;
    console.log(url);

    return fetch(url, {
        headers: headers,
    }).then(function (response) {
        console.log('fetch status is',response.status);
        return response.json();
    });
};


/**
 *
 * @param post
 */
export const putPost = (id, title, body) => {
    // PUT /posts/:id
    // USAGE:
    //     Edit the details of an existing post
    // PARAMS:
    //     title - String
    // body - String
    const url = `http://localhost:3001/posts/${id}`;
    return fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({title,body})
    }).then(function (response) {
        console.log('put status is',response.status);
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        console.log('hi');
        return response.json();
    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
};
