const resHandler = (error, req, res, next) => {
    if (res.data.length <= 0) {
        res.message = 'Done. Successfully! - no data is available';
    } else {
        res.message = 'Done. Successfully!';
    }
    return res.json({
        message: res.message,
        statusCode: 200,
        data: res.data,
        error: null,
    });
};

module.exports = resHandler
