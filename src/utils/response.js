module.exports = (res, status, message, data = null) => {
    const response = { message };
    
    if (data !== null) {
        response.data = data;
    }

    res.status(status).json(response);
};
