const express = require('express');
const router = express.Router();
const newsControllers = require('../controllers/user-controllers');

router.get('/', newsControllers.homeController);
router.get('/filterNews', newsControllers.filterNewsByCategory);
router.get('/allNews', newsControllers.getAllNews);
router.get('/customNews', newsControllers.getCustomNews);
router.get('/search', newsControllers.searchNews);
router.get('/:categoryId/:newsId', newsControllers.getNewsById);

module.exports = router;