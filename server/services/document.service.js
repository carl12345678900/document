const documentModel = require("../models/document.model");
const categoryModel = require("../models/category.model");

const documentService = {
  viewAll: async (id) => {
    const categoryName = await categoryModel.getById(id);
    const data = await documentModel.getAll(id);

    return { categoryName, data };
  },

  viewById: async (categoryId, id) => {
    const data = await documentModel.getById(categoryId, id);
    console.log(data);

    if (data === undefined) {
      throw new Error("Not Found");
    }

    return data;
  },

  add: async (title, content, categoryId) => {
    const result = await documentModel.add(title, content, categoryId);
    console.log("result :", result);

    if (result.affectedRows === 0) {
      throw new Error("Something went wrong");
    }

    return await documentModel.getById(result.insertId);
  },

  update: async (title, content, categoryId, id) => {
    const result = await documentModel.updateById(
      title,
      content,
      categoryId,
      id,
    );

    if (result.affectedRows === 0) {
      throw new Error("Something went wrong");
    }

    return await documentModel.getById(categoryId, id);
  },

  remove: async (id) => {
    const result = await documentModel.removeDocsById(id);

    if (result.affectedRows === 0) {
      let error = new error("Failed to remove");
      error.status = 500;
      throw error;
    }

    return;
  },

  viewAllArchive: async () => {
    const result = await documentModel.getAllArchive();

    const grouped = result.reduce((groups, doc) => {
      const categoryId = doc.category_id;

      if (!groups[categoryId]) {
        groups[categoryId] = {
          id: categoryId,
          name: doc.categoryName,
          status: doc.status,
          documents: [],
        };
      }

      groups[categoryId].documents.push(doc);

      return groups;
    }, {});

    return Object.values(grouped);
  },

  restoreById: async (id) => {
    let result = await documentModel.getDocsWhereCategoryActive(id);

    if (result.length === 0) {
      let error = new Error("Document not found");
      error.status = 404;
      throw error;
    }

    if (result[0].category_status === "archived") {
      let error = new Error(
        "Document cannot be restored because its category is archived",
      );
      error.status = 400;
      throw error;
    }

    result = await documentModel.restoreById(id);

    if (result.affectedRows === 0) {
      let error = new Error("Failed to restore document");
      error.status = 400;
      throw error;
    }

    return;
  },

  archiveById: async (id) => {
    const result = await documentModel.archiveById(id);
    if (result.affectedRows === 0) {
      let error = new error("Failed to update");
      error.status = 500;
      throw error;
    }

    return;
  },

  pinById: async (id) => {
    const result = await documentModel.pinById(id);
    if (result.affectedRows === 0) {
      let error = new error("Failed to update");
      error.status = 500;
      throw error;
    }

    return;
  },

  unpinById: async (id) => {
    const result = await documentModel.unpinById(id);
    if (result.affectedRows === 0) {
      let error = new error("Failed to update");
      error.status = 500;
      throw error;
    }

    return;
  },

  restoreAllByCategoryId: async (id) => {
    const result = await documentModel.restoreAllByCategoryId(id);
    if (result.affectedRows === 0) {
      let error = new error("Failed to update");
      error.status = 500;
      throw error;
    }

    return;
  },

  deleteAllByCategoryId: async (id) => {
    const result = await documentModel.deleteAllByCategoryId(id);
    if (result.affectedRows === 0) {
      let error = new error("Failed to update");
      error.status = 500;
      throw error;
    }

    return;
  },
};

module.exports = documentService;
