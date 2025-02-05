const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const mediaController = require("../controllers/mediaController");

router.post("/upload", upload.single("file"), mediaController.uploadMedia);
router.get("/", mediaController.getAllMedia);
router.get("/:id", mediaController.getMediaById);

module.exports = router;
