/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const {
    addBooksHandler,
    getAllBooksHandler,
    getByIdBooksHandler,
    editByIdBooksHandler,
    deleteByIdBooksHandler,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBooksHandler
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getByIdBooksHandler
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: editByIdBooksHandler
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteByIdBooksHandler
    }
  ];
  
  module.exports = routes;