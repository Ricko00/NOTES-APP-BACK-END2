const routes = (handler) =>[
    {
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler,//postNoteHandler hanya menerima dan menyimpan"satu".note
    },
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,//getNoteshandler mengembalikan "banyak" note.
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,//getNotesHandler mengembalikan "satu" note.
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler:  handler.putNoteByIdHandler,//putNotesByIdHanler hanya meneriman dan mengubah "satu" note.
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,//deleteNoteByIdHandler
    },
];

 module.exports = routes;