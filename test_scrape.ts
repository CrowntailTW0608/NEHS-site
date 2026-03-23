import axios from 'axios';
import * as cheerio from 'cheerio';

import * as fs from 'fs';

async function test() {
  const url = 'https://school.tc.edu.tw/open-honor/060323b/view?id=4';
  const response = await axios.get(url);
  fs.writeFileSync('page4.html', response.data);
  console.log("HTML saved to page4.html");
}

test();
