const { StatusCodes } = require("http-status-codes");
const { Sequelize } = require("sequelize");
const Media = require("../models/mediaModel");
const sendResponse = require("../utils/response");
const { getHost, normalizeFilePath } = require("../utils/fileUtils");


exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, "Please upload a file.");
        }

        const { title, type } = req.body;

        if (!title || !type) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, "Title and type are required.");
        }

        if (!['video', 'audio'].includes(type)) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, "Type must be either 'video' or 'audio'.");
        }

        const newMedia = await Media.create({
            title,
            type,
            filePath: req.file.path,
        });

        res.status(StatusCodes.CREATED).json({ message: "Media uploaded successfully.", media: newMedia });
    } catch (error) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Server error.");
    }
};

exports.getAllMedia = async (req, res) => {
    try {
        const mediaList = await Media.findAll();

        if (!mediaList || mediaList.length === 0) {
            return sendResponse(res, StatusCodes.NOT_FOUND, "No media found.");
        }

        const host = getHost(req);

        const mediaWithFileUrls = mediaList.map(media=>{
            const normalizedFilePath = normalizeFilePath(media.filePath);
            const filePath = `${host}/${normalizedFilePath}`;
            return { ...media.toJSON(),filePath,}
        })

        sendResponse(res, StatusCodes.OK, "Media List", mediaWithFileUrls)
    } catch (error) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Server error.");
    }
};

exports.getMediaById = async (req, res) => {
    
    try {
        const { id } = req.params;
        

        if (!Sequelize.Validator.isUUID(id)) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, "Invalid ID format.");
        }

        const media = await Media.findByPk(req.params.id);
        
        if (!media) {
            return sendResponse(res, StatusCodes.NOT_FOUND, "Media not found.");
        }
        const host = getHost(req);

        const normalizedFilePath = normalizeFilePath(media.filePath);
        const fileUrl = `${host}/${normalizedFilePath}`;
        sendResponse(res, StatusCodes.OK, "Media found.", { filePath: fileUrl });
    } catch (error) {
        sendResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Server error.");
    }
};
