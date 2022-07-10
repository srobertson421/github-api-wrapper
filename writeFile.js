import dotenv from 'dotenv';
import fetch from 'node-fetch';
import readFile from './readFile.js';

dotenv.config();

export default async function writeFile({
  repoOwner,
  repoName,
  fileName,
  branchName = 'master',
  fileContents,
  fileSHA,
  commitMessage = 'Updated file via api'
}) {
  const {
    GITHUB_BASE_URL,
    GITHUB_TOKEN
  } = process.env;

  const fileURL = `${GITHUB_BASE_URL}/${repoOwner}/${repoName}/contents/${fileName}?ref=${branchName}`;
  const base64Content = Buffer.from(fileContents).toString('base64');

  const fetchConfig = {
    method: 'put',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3.raw'
    },
    body: {
      message: commitMessage,
      content: base64Content,
      branch: branchName
    }
  }

  if(fileSHA) {
    fetchConfig.body.sha = fileSHA;
  }

  fetchConfig.body = JSON.stringify(fetchConfig.body);

  try {
    const fileResult = await fetch(fileURL, fetchConfig);
    const fileData = await fileResult.text();

    return fileData;
  } catch(err) {
    throw new Error(err);
  }
}