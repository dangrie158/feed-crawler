# feed-crawler
Parses a set of RSS Feeds and extracts the whole content of the site

## Sample
For a German news corpus with > 100,000 articles crawled using this tool, check out my [Corpus](http://griesshaber.pages.mi.hdm-stuttgart.de/german-news-corpus/)

## Create you own Corpus

To create your own corpus from your list of news files

1. create your own sources list (check out [the german one](https://github.com/dangrie158/feed-crawler/blob/master/sources/de_news.js) as a template)
2. change the ```require``` in [src/crawler.js](https://github.com/dangrie158/feed-crawler/blob/master/src/crawler.js) to your sources file
3. run the script using ```docker-compose up```.

The script runs indefinitley and crawls all sites for previously unseen news every hour (can also easily be changed in crawler.js)

To process the corpus, check out my [preprocessing project](https://gitlab.mi.hdm-stuttgart.de/griesshaber/german-news-corpus).
To create a set of preprocessed files, check out the ```preprocess.py``` script. However, this may needs a lot more detail to get it to work with new sources.
