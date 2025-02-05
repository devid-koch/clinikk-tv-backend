const { Media } = require('../models');

const createMedia = async (data) => {
  return await Media.create(data);
};

const getAllMedia = async () => {
  return await Media.findAll();
};

const getMediaById = async (id) => {
  return await Media.findByPk(id);
};

module.exports = { createMedia, getAllMedia, getMediaById };
