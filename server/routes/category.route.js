const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

const authorization = require("../utils/authorization");

router.use(authorization);

router.get("/", categoryController.viewAll); // display in nav and list
router.post("/", categoryController.add); // create
router.patch("/:id", categoryController.updateById); // update
router.delete("/:id", categoryController.remove); // delete

//check if has docs
router.get("/has/:id", categoryController.hasDocs);

//archive
router.get("/archive", categoryController.viewAllArchive);

//by id
router.patch("/restore/:id", categoryController.restoreById);
router.patch("/archive/:id", categoryController.archiveById);

module.exports = router;

/* view all data from nav based on their :categoryName */
