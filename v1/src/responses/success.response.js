const successResponse = (res, statusCode, data) => {
    res.status(statusCode).json({
        success: true,
        statusCode,
        data,
    });
};

module.exports = successResponse;