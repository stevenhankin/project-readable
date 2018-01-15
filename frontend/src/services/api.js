/**
 * Return a Promise for the array of categories
 */
export const fetchCategories = () => {
  const url = 'http://localhost:3001/categories';
  return fetch(url, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(function(response) {
    return response.json();
  });
};

/**
 * Return a Promise for the array of posts
 */
export const fetchPosts = () => {
  const url = 'http://localhost:3001/posts';
  return fetch(url, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(function(response) {
    return response.json();
  });
};
