export const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'ImageGram API',
        version: '1.0.0',
        description: 'API for ImageGram',
      },
      servers: [
        {
          url: 'http://localhost:3000/api/v1',
        },
      ],
    },
    apis: ['./src/Routes/v1/*.js'], // files containing annotations as above
  };