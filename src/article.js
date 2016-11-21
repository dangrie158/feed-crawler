const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    rssTitle: {
      type: String,
      unique: true
    },
    source: {
      type: String,
      unique: true
    },
    title: String,
    site: String,
    softTitle: String,
    date: Date,
    copyright: String,
    author: [String],
    publisher: String,
    copyright: String,
    favicon: String,
    description: String,
    lang: String,
    canonicalLink: String,
    tags: [String],
    image: String,
    videos: [],
    links: [],
    text: String
});

articleSchema.statics.fromRssItem = function(rssItem){
  return new this({
    rssTitle: rssItem.title,
    source: rssItem.link
  });
};

articleSchema.statics.rssItemDoesNotExist = async function itemNotVisited(rssItem) {
  let article = await this.findOne({ $or: [ {rssTitle: rssItem.title}, {source: rssItem.link} ] });
  if(article){
    return false;
  }
  return true;
};

module.exports = mongoose.model('Article', articleSchema);
