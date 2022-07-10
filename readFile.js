import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export default async function readFile({
  repoOwner,
  repoName,
  fileName,
  branchName = 'master',
  raw = false
}) {
  const {
    GITHUB_BASE_URL,
    GITHUB_TOKEN
  } = process.env;

  const fileURL = `${GITHUB_BASE_URL}/${repoOwner}/${repoName}/contents/${fileName}?ref=${branchName}`;

  const fetchConfig = {
    method: 'get',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Accept': raw ? 'application/vnd.github.v3.raw' : 'application/vnd.github.v3+json'
    }
  }

  try {
    const fileResult = await fetch(fileURL, fetchConfig);
    let fileData;
    if(raw) {
      fileData = await fileResult.text();
    } else {
      fileData = await fileResult.json();
    }

    if(!Array.isArray(fileData)) {
      fileData.raw = Buffer.from(fileData.content, 'base64').toString('utf-8');
    }

    return fileData;
  } catch(err) {
    throw new Error(err);
  }
}