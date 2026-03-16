

import {  writeFileSync } from 'fs';
import axios from 'axios';

updateApiDoc();

async function updateApiDoc() {

  console.log('🔄 Retreiving AeroDB API documentation...');
  try {
    const apiFile = await axios.get(`https://api.aerodb.net/openapi.json`);

    // Remove internal paths
    const filteredPaths = Object.fromEntries(
      Object.entries(apiFile.data.paths).filter(([key]) => !key.includes('/internal'))
    );

    apiFile.data.paths = filteredPaths;   writeFileSync('./docs/public/openapi.json', JSON.stringify(apiFile.data, null, 2));
    console.log('✅ API documentation updated');
  } catch (error) {
    console.error('Error retreiving API documentation', error);
    process.exit(1);
  }
}