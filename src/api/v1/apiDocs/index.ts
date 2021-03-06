import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { PORT } from '../../../config';

const router = express.Router();

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Backend', // Title (required)
      version: '1.0.0' // Version (required)
    },
    servers: [
      {
        url: `http://localhost:${PORT}/v1`,
        description: 'local server'
      },
      {
        url: 'https://api-stg.fanf.am/v1',
        description: 'staging server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  // Path to the API docs
  apis: ['build/api/v1/**/*.js', 'src/api/v1/**/*.ts', 'build/database/**/*.js', 'src/database/**/*.ts']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

router.get('/json', async (req, res) => {
  res.json(swaggerSpec);
});

router.use('/ui', swaggerUi.serve);
router.get(
  '/ui',
  swaggerUi.setup(swaggerSpec, {
    explorer: true
  })
);
export default router;
