"use strict"

const request = require('request-promise-native');
const feedparser = require('node-feedparser');
const unfluff = require('unfluff');
const mongoose = require('mongoose');
const _ = require('lodash');

const Article = require('./article')
const async = require('./util/asyncHelper');
const out = require('./util/outputHelper');
const de_news = require('../sources/de_news.js');

mongoose.Promise = global.Promise;

let visitedArticles = 0;
let savedArticles = 0;

async function visitArticles(site, articles){
  for(let article of articles){
    visitedArticles += 1;
    try{
      let content = await request(article.source);
      let cleanData = unfluff(content);
      article = _.extend(article, cleanData);
      article.site = site;
      out.rewrite(`loaded article from ${article.site}: ${article.title}... `);
      await saveArticle(article);
    }catch(e){
      out.write(`failed to load ${article.title}`, e);
    }
  }
};

async function saveArticle(article){
  try{
    await async.nfcall(article.save);
    savedArticles += 1;
  }catch(e){
    process.stdout.write(`skipped`);
  }
};

async function crawl(sources){
  let db = mongoose.connect('mongodb://localhost/articles');

  for(const site in sources){
    out.rewrite(`crawling ${site}: \n`);
    const urls = sources[site];

    for(const url of urls){
      let feedXml = await request(url);
      let feed = await async.nfcall(feedparser, feedXml);
      let unvisitedItems = await async.filter(feed.items, Article.rssItemDoesNotExist.bind(Article));

      let articles = unvisitedItems.map(Article.fromRssItem.bind(Article));

      out.rewrite(`\tfound ${articles.length} Articles from ${url}\n`);
      await visitArticles(site, articles);
    }
  }

  out.write(`Saved ${savedArticles} Articles\n`);
  out.rewrite(`Visited ${visitedArticles} Articles\n`);
  console.log("done.");
  db.disconnect();
};

crawl(de_news.sources);
