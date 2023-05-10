class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    toJSON() {
        return {
            error: {
                message: this.message || "Something went wrong",
            },
            success: false,
            statusCode: this.statusCode,
        };
    }
}

module.exports = ApiError;