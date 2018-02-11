let token = localStorage.token;
console.log('** Token is', token);

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
    return fetch(url, {
        headers: headers,
    }).then(function (response) {
        return response.json();
    });
};


/**
 * Return a Promise for the array of Comments for a specifed post
 */
export const fetchComments = (postId) => {
    console.log('fetchComments',postId);
    /*
    GET /posts/:id/comments
    USAGE:
        Get all the comments for a single post
    */
    const url = `http://localhost:3001/posts/${postId}/comments`;
    return fetch(url, {
        headers: headers,
    }).then(function (response) {
        return response.json();
    });
};

/**
 * Return a Promise for a specifed comment
 */
export const fetchComment = (commentId) => {
    console.log('fetchComment',commentId);
    /*
      GET /comments/:id
      USAGE:
        Get the details for a single comment
    */
    const url = `http://localhost:3001/comments/${commentId}`;
    return fetch(url, {
        headers: headers,
    }).then(function (response) {
        return response.json();
    });
};


/**
 * Return a Promise for the array of posts
 */
export const fetchPost = (id) => {
    /*
      GET /posts/:id
      USAGE:
        Get the details of a single post
     */
    const url = `http://localhost:3001/posts/${id}`;
    return fetch(url, {
        headers: headers,
    }).then(function (response) {
        console.log('fetch status is', response.status);
        return response.json();
    });
};


/**
 * Called when modifying an existing post
 *
 * @param post
 */
export const putPost = (id, title, body) => {
    /*
      PUT /posts/:id
      USAGE:
        Edit the details of an existing post
      PARAMS:
        title - String
        body - String

     */
    const url = `http://localhost:3001/posts/${id}`;
    return fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({title, body})
    }).then(function (response) {
        console.log('put status is', response.status);
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        return response.json();
    }).catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
};


/**
 * Called when modifying an existing Comment
 * @param id
 * @param body
 * @returns {Promise<Response>}
 */
export const putComment = (id, body) => {
    /*
        PUT /comments/:id
          USAGE:
            Edit the details of an existing comment

          PARAMS:
            timestamp: timestamp. Get this however you want.
            body: String
     */
    const url = `http://localhost:3001/posts/${id}`;
    return fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({timestamp:Date.now(), body})
    }).then(function (response) {
        console.log('put status is', response.status);
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        return response.json();
    }).catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
};


export const postPost = (postDetails) => {
    /*
       POST /posts
       USAGE:
           Add a new post

       PARAMS:
           id - UUID should be fine, but any unique id will work
       timestamp - timestamp in whatever format you like, you can use Date.now() if you like
       title - String
       body - String
       author - String
       category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
   */
    const url = `http://localhost:3001/posts`;
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postDetails)
    }).then(function (response) {
        console.log('put status is', response.status);
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        console.log('Created new post');
        return response.json();
    }).catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
};


/**
 * Update an existing comment
 * @param comment
 * @returns {Promise<Response>}
 */
export const postComment = (comment) => {
    /*
    POST /comments
      USAGE:
        Add a comment to a post

      PARAMS:
        id: Any unique ID. As with posts, UUID is probably the best here.
        timestamp: timestamp. Get this however you want.
        body: String
        author: String
        parentId: Should match a post id in the database.
   */
    const url = `http://localhost:3001/comments`;
    console.log('postComment',comment);
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(comment)
    }).then(function (response) {
        console.log('put status is', response.status);
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }
        console.log('Created new post');
        return response.json();
    }).catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
};


