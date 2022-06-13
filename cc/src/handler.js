/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable key-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable no-unreachable */
/* eslint-disable semi */
/* eslint-disable no-shadow */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable linebreak-style */

const { nanoid } = require('nanoid');
const bookshelf = require('./bookshelf');

const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload;

   if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    })
    response.code(400);
    return response;
  }
   if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
};
if (pageCount >= readPage) {
  bookshelf.push(newBook) }

const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;
   if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
    let filteredAllBooks = bookshelf;

    if (name) {
        filteredAllBooks = bookshelf.filter((book) => {
            const regex1 = new RegExp(name, 'i');
            return regex1.test(book.name);
        });
    }

    if (reading) {
        filteredAllBooks = bookshelf.filter((book) => Number(book.reading) === Number(reading));
    }
    if (finished) {
        filteredAllBooks = bookshelf.filter((book) => Number(book.finished) === Number(finished));
    }

    const response = h.response({
        status: 'success',
        data: {
          books: filteredAllBooks.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
    });
    response.code(200);
    return response;
};

 const getByIdBooksHandler = (request, h) => {
  const { bookId } = request.params;
  const book = bookshelf.filter((a) => a.id === bookId)[0];

  if (book) {
    const response = h.response({
      status: 'success',
      data : {
        book,
      }
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editByIdBooksHandler = (request, h) => {
  const { bookId } = request.params;
   const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
} = request.payload;
if (!name) {
   const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Mohon isi nama buku',
    })
    response.code(400);
     return response;
    }
if (readPage > pageCount) {
   const response = h.response({
     status: 'fail',
     message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  const index = bookshelf.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    bookshelf[index] = {
      ...bookshelf[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    updatedAt
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteByIdBooksHandler = (request, h) => {
  const { bookId } = request.params;
  const index = bookshelf.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    bookshelf.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = { 
  addBooksHandler,
  getAllBooksHandler,
  getByIdBooksHandler,
  editByIdBooksHandler,
  deleteByIdBooksHandler,
};
