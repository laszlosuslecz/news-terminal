const yargs = require('yargs');
const axios = require('axios');
const newsApiKey = require('./keysAPI.js');

const attribLink = 'powered by NewsAPI.org';

const sources = {
  gruenderszene: 'gruenderszene',
  cnn: 'cnn',
  reuters: 'reuters',
  buzzfeed: 'buzzfeed',
  wired: 'wired-de',
  hackerNews: 'hacker-news'    
};

const argv = yargs
  .command('gruenderszene', 'Gruenderszene top news')
  .command('cnn', 'CNN top news')
  .command('reuters', 'Reuters top news')
  .command('buzzfeed', 'Buzzfeed top news')
  .command('wired', 'Wired top news')
  .command('hacker', 'HackerNews top headlines')
  .help()
  .alias('help', 'h')
  .argv;

const command = yargs.argv._[0];
let mySource = sources.cnn;

if (command === 'gruenderszene') {
    mySource = sources.gruenderszene;
} else if (command === 'cnn') {
    mySource = sources.cnn;    
} else if (command === 'reuters') {
    mySource = sources.reuters;
} else if (command === 'buzzfeed') {
    mySource = sources.buzzfeed;
} else if (command === 'wired') {
    mySource = sources.wired;
} else if (command === 'hacker') {
    mySource = sources.hackerNews;
} else {
    console.log('Command not recognized. You can read the top headlines from CNN.');
    console.log('---');
}

const newsUrl = `https://newsapi.org/v1/articles?source=${mySource}&sortBy=top&apiKey=${newsApiKey.newsApiKey}`;

axios.get(newsUrl)
  .then((response) => {
    console.log(response.data.articles.slice(0, 5).forEach((e) => {
        console.log(`Title: ${e.title}. 
                    Published at: ${e.publishedAt}.`);
        console.log('---');    
    }))
    console.log(attribLink);
})
  .catch((error) => {
    console.log('we have an error');
})
