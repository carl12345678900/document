const categoryModel = require("../models/category.model");

const categoryService = {
  add: async (category) => {
    const result = await categoryModel.add(category);
    console.log("result :", result);

    if (result.affectedRows === 0) {
      throw new Error("Something went wrong");
    }

    /* 
    return await categoryModel.getById(result.insertId); */
    return;
  },

  viewAll: async () => {
    return await categoryModel.getAll();
  },

  viewById: async (id) => {
    const result = await categoryModel.getById(id);

    if (result === undefined) {
      let error = new Error("No data found");
      error.status = 404;
      throw error;
    }

    return result;
  },

  update: async (id, name) => {
    const result = await categoryModel.updateById(id, name);
    if (result.affectedRows === 0) {
      let error = new error("Failed to update");
      error.status = 500;
      throw error;
    }

    /*  const data = await categoryModel.getById(id); */

    return;
  },

  remove: async (id) => {
    await categoryModel.removeDocsById(id);

    const result = await categoryModel.removeById(id);

    if (result.affectedRows === 0) {
      let error = new Error("Failed to remove");
      error.status = 500;
      throw error;
    }

    return;
  },

  hasDocs: async (id) => {
    const hasDocs = await categoryModel.hasDocs(id);

    /*  if (hasDocs) {
      let error = new Error(
        "Cannot delete category because it still has documents.",
      );
      error.status = 409;
      throw error;
    } */

    return hasDocs;
  },

  viewAllArchive: async () => {
    return await categoryModel.getAllArchive();
  },

  restoreById: async (id) => {
    const result = await categoryModel.restoreById(id);
    if (result.affectedRows === 0) {
      let error = new Error("Failed to update");
      error.status = 500;
      throw error;
    }

    return;
  },

  archiveById: async (id) => {
    return await categoryModel.archiveById(id);
  },
};

module.exports = categoryService;
