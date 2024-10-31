export const environment = {
  production: false,
  encryptKey: 'a0d2f9de-cf38-4a1a-9f5f-86ead3e6864f',
  apis: {
    path: 'http://localhost:3000'
  },
  socket: {
    chat: {
      host: 'http://localhost:3000',
      path: '/socket/chat'
    }
  }
};