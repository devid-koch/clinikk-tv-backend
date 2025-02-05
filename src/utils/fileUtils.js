const path = require('path');

/**
 * Get the base URL (host) for the current request.
 * @param {object} req - The request object.
 * @returns {string} - The full host URL (e.g., http://localhost:3000 or https://your-app.com).
 */
const getHost = (req) => {
    return req.protocol + '://' + req.get('host');
};

/**
 * Normalize the file path to use forward slashes.
 * @param {string} filePath - The original file path (which may have backslashes).
 * @returns {string} - The normalized file path with forward slashes.
 */
const normalizeFilePath = (filePath) => {
    return filePath.replace(/\\/g, '/');
};

module.exports = { getHost, normalizeFilePath };
