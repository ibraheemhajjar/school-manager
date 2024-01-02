const News = require('../models/News');
const resHandler = require('../middleware/res-handler');
const NEWS_CATEGORIES_IDS = require("../constants/index");

const newsControllers = {};

newsControllers.getAllNews = async (req, res, next) => {
     try {
          const news = await News.find({})
          if (!news) {
               const error = new Error();
               error.message = 'failed to fetch news';
               error.statusCode = 500;
               return next(error);
          }
          res.data = news
          resHandler(null, req, res, next);
     } catch (err) {
          next(err)
     }
}

newsControllers.getNewsById = async (req, res, next) => {
     const { categoryId, newsId } = req.params;
     try {
          const newsItem = await News.findOne({ path: "/" + categoryId + "/" + newsId });
          if (!newsItem) {
               const error = new Error();
               error.message = 'failed to find news item';
               error.statusCode = 500;
               return next(error);
          }
          res.data = newsItem
          resHandler(null, req, res, next);
     } catch (err) {
          next(err)
     }
}

newsControllers.filterNewsByCategory = async (req, res, next) => {
     const query = {
          contentId: req.query?.categoryId,
          title: NEWS_CATEGORIES_IDS[req.query?.categoryId]
     }
     try {
          const filteredNews = await News.find({
               categories: {
                    $elemMatch: query
               }
          });

          if (!filteredNews) {
               const error = new Error();
               error.message = 'failed to filter news';
               error.statusCode = 500;
               return next(error);
          }
          res.data = filteredNews
          resHandler(null, req, res, next);
     } catch (err) {
          next(err)
     }
}

newsControllers.getCustomNews = async (req, res, next) => {

     try {
          const customNews = await News.find(req.query);

          if (!customNews) {
               const error = new Error();
               error.message = 'failed to get custom news';
               error.statusCode = 500;
               return next(error);
          }
          res.data = customNews
          resHandler(null, req, res, next);
     } catch (err) {
          next(err)
     }
}

newsControllers.searchNews = async (req, res, next) => {
     const searchQuery = " " + req.query?.searchQuery + " ";
     try {
          const searchResult = await News.find({
               "$or": [
                    { "title": { "$regex": searchQuery, "$options": "i" } },
                    { "description": { "$regex": searchQuery, "$options": "i" } }
               ]
          })
          if (!searchResult) {
               const error = new Error();
               error.message = 'failed to search news';
               error.statusCode = 500;
               return next(error);
          }
          res.data = searchResult
          resHandler(null, req, res, next);
     } catch (err) {
          next(err)
     }
}

module.exports = newsControllers;