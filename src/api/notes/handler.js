/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const { response } = require('@hapi/hapi/lib/validation');

class NotesHandler {
  constructor(service) {
    this._service = service;
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  // postNoteHandler
  postNoteHandler(request, h) {
    try {
      const { title = 'untitled', body, tags } = request.paylod;
      const noteId = this._service.addNote({ title, body, tags });
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);// apabila success maka akan menampilkan code 201
      return response;// mengembalikan nilai response  success
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);// apabila terjadi error maka akan menampilkan code 400.
      return response;// mengembalikan response error
    }
  }

  // getNotesHandler
  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  // getNoteByIdHandler
  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      // eslint-disable-next-line no-underscore-dangle
      const note = this._service.getNoteById(id);
      return {
        status: 'succes',
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: message.error,
      });
      response.code(404);
      return response;
    }
  }

  // putNoteByIdHandler
  putNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.editNoteById(id, request.paylod);
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      // eslint-disable-next-line no-shadow
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;// mengembalikan response
    }
  }

  // deleteNoteByIdHandler
  deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
