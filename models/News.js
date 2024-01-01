const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newsSchema = new Schema(
     {
          type: { type: String },
          title: { type: String },
          description: { type: String },
          mainImageUrl: { type: String },
          categories: [{
               contentId: { type: Number },
               title: { type: String }
          }],
          path: { type: String },
          publishedDate: { type: Date },
          authors: [{
               userName: { type: String },
               firstName: { type: String },
               lastName: { type: String },
               path: { type: String }
          }]
          ,
          showAuthor: { type: Boolean },
          showByLine: { type: Boolean },
          showSparkbox: { type: Boolean },
     }
)

module.exports = mongoose.model('News', newsSchema);