/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import fetch from 'node-fetch';
const fsp = fs.promises

const urls = ['https://s3-us-west-1.amazonaws.com/c2profilejs/favicon.png'];

function getFileName(inurl) {
  let url = inurl;
  url = url.substring(0, (url.indexOf('#') === -1) ? url.length : url.indexOf('#'));
  url = url.substring(0, (url.indexOf('?') === -1) ? url.length : url.indexOf('?'));
  url = url.substring(url.lastIndexOf('/') + 1, url.length);
  return url;
}

async function main() {
  try {
    await fsp.access('assets', fs.constants.W_OK)
  } catch (err) {
    console.log('Creating assests folder...')
    await fsp.mkdir('assets')
  }
  urls.forEach(async (url) => {
    const filename = getFileName(url)
    try {
      await fsp.access(`assets/${filename}`, fs.constants.F_OK)
      console.log(`${filename} already exists in assets`)
    } catch{
      console.log(`Downloading ${filename}...`)
      try {
        let res = await fetch(url, {});
        res.body.pipe(fs.createWriteStream(`assets/${getFileName(url)}`));
      } catch (err) {
        console.log(`Failed to download ${filename}`)
      }
      console.log(`Downloaded ${filename}`)
    }
  });
}

main();
