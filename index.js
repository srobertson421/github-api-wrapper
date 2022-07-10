import dotenv from 'dotenv';
import readFile from './readFile.js';
import writeFile from './writeFile.js'

dotenv.config();

const {
  GITHUB_BASE_URL,
  GITHUB_TOKEN
} = process.env;

async function main() {
  const file1 = await readFile({
    repoOwner: 'srobertson421',
    repoName: 'fullstack-svelte',
    fileName: 'static'
  });

  console.log(file1);

//   const fileWrite = await writeFile({
//     repoOwner: 'srobertson421',
//     repoName: 'progressive-enhancement',
//     fileName: 'styles.css',
//     newFile: false,
//     fileContents: file1 + `
//   cool-stuff { margin: 0; }
// `,
//     fileSHA: '71beca7fae90dff876cd42e2b6384ff239a168fa'
//   });

//   console.log(fileWrite);

//   const file2 = await readFile({
//     repoOwner: 'srobertson421',
//     repoName: 'progressive-enhancement',
//     fileName: 'styles.css'
//   });

//   console.log(file2);
}

main();