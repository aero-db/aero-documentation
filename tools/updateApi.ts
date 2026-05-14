

import { writeFileSync } from 'fs';
import axios from 'axios';

updateApiDoc();

async function updateApiDoc() {

  console.log('🔄 Retrieving AeroDB API documentation...');
  try {
    const apiFile = await axios.get(`https://api.aerodb.net/openapi.json`);

    // Remove private paths from public documentation.
    const filteredPaths = Object.fromEntries(
      Object.entries(apiFile.data.paths).filter(([path]) => {
        return !path.startsWith('/account') && !path.startsWith('/internal') && !path.startsWith('/users');
      })
    );

    apiFile.data.paths = filteredPaths;
    writeFileSync('./docs/public/openapi.json', JSON.stringify(apiFile.data, null, 2));
    console.log('✅ API documentation updated');
  } catch (error) {
    console.error('Error retrieving API documentation', error);
    process.exit(1);
  }
}
