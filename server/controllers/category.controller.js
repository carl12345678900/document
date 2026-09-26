const categoryService = require("../services/category.service");

const categoryController = {
  viewAll: async (req, res) => {
    try {
      const data = await categoryService.viewAll();

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (error) {
      console.error(error);

      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  },

  viewById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await categoryService.viewById(id);

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  add: async (req, res) => {
    try {
      const { category } = req.body;

      await categoryService.add(category);

      return res.status(201).json({
        message: "Created",
      });
    } catch (error) {
      console.error(error);

      if (error.code === "ER_DUP_ENTRY") {
        error.message = "Already exist";
      }

      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  updateById: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await categoryService.update(id, name);

      return res.status(201).json({
        message: "Updated",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;

      await categoryService.remove(id);

      return res.status(200).json({
        message: "Deleted permanently",
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  hasDocs: async (req, res) => {
    try {
      const { id } = req.params;

      const bool = await categoryService.hasDocs(id);
      console.log(bool);

      return res.status(200).json({
        bool,
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  viewAllArchive: async (req, res) => {
    try {
      const data = await categoryService.viewAllArchive();

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  restoreById: async (req, res) => {
    try {
      const { id } = req.params;

      await categoryService.restoreById(id);

      return res.status(201).json({
        message: "Category Restored",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  archiveById: async (req, res) => {
    try {
      const { id } = req.params;

      await categoryService.archiveById(id);

      return res.status(201).json({
        message: "Archived",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  },
};

module.exports = categoryController;
