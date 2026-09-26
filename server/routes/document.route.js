const express = require("express");
const router = express.Router();

const documentController = require("../controllers/document.controller");

const authorization = require("../utils/authorization");

router.use(authorization);

router.get("/:categoryId", documentController.viewAll); // list all this id category data
router.post("/", documentController.add);
router.patch("/:id", documentController.update);
router.delete("/:id", documentController.remove);

//view by id
router.get("/:categoryId/:documentId", documentController.viewById);

//archive all
router.get("/archived/all/all", documentController.viewAllArchive);

// id
router.patch("/restore/:id", documentController.restoreById);
router.patch("/archive/:id", documentController.archiveById);
router.patch("/pin/:id", documentController.pinById);
router.patch("/unpin/:id", documentController.unpinById);

router.patch("/restore/all/:id", documentController.restoreAllByCategoryId);
router.delete("/all/:id", documentController.deleteAllByCategoryId);

module.exports = router;

//add by id
