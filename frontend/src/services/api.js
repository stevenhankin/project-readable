const url = 'http://localhost:3001/categories';

/**
 * Return a Promise for the array of categories
 */
const fetchCategories = () => {
  return fetch(url, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(function(response) {
    return response.json();
  });
};

export default fetchCategories;
