const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
  // eslint-disable-next-line no-unused-vars
  const notesService = new NotesService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: NotesService,
    },
  });
  await server.start();
  // eslint-disable-next-line no-irregular-whitespace
  console.log(`Server berjalan pada${server.info.uri}`);
};

init();
