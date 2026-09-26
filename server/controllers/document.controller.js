const documentService = require("../services/document.service");

const z = require("zod");

const documentSchema = {
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, "Title is empty")
      .max(200, "Title is too long"),
    content: z.string().trim().max(10000, "Content is too long"),
    categoryId: z.coerce.number().min(1, "You must select a category!"),
  }),
  params: z.object({
    categoryId: z.coerce.number().min(1, "Not found"),
  }),
};

const documentController = {
  viewAll: async (req, res) => {
    try {
      const result = documentSchema.params.safeParse(req.params);

      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        });
      }

      const { categoryId } = result.data;

      const data = await documentService.viewAll(Number(categoryId));

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

  add: async (req, res) => {
    try {
      const result = documentSchema.body.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        });
      }

      const { title, content, categoryId } = result.data;

      const data = await documentService.add(title, content, categoryId);

      return res.status(201).json({
        message: "Document Added",
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
      const { categoryId, documentId } = req.params;

      const data = await documentService.viewById(
        Number(categoryId),
        Number(documentId),
      );
      console.log(data);

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

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, categoryId } = req.body;
      console.log(req.body);

      console.log(id, title, content, categoryId);

      const data = await documentService.update(title, content, categoryId, id);

      return res.status(200).json({
        message: "Updated",
        data,
      });
    } catch (error) {
      console.error(error);

      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await documentService.remove(id);

      return res.status(200).json({
        message: "Deleted permanently",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  viewAllArchive: async (req, res) => {
    try {
      const data = await documentService.viewAllArchive();

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

      await documentService.restoreById(id);

      return res.status(201).json({
        message: "Document Restored",
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  archiveById: async (req, res) => {
    try {
      const { id } = req.params;

      await documentService.archiveById(id);

      return res.status(201).json({
        message: "Archived",
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  pinById: async (req, res) => {
    try {
      const { id } = req.params;

      await documentService.pinById(id);

      return res.status(201).json({
        message: "Pinned",
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  unpinById: async (req, res) => {
    try {
      const { id } = req.params;

      await documentService.unpinById(id);

      return res.status(201).json({
        message: "Unpinned",
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  restoreAllByCategoryId: async (req, res) => {
    try {
      const { id } = req.params;

      await documentService.restoreAllByCategoryId(id);

      return res.status(201).json({
        message: "All Restored",
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },

  deleteAllByCategoryId: async (req, res) => {
    try {
      const { id } = req.params;

      await documentService.deleteAllByCategoryId(id);

      return res.status(201).json({
        message: "All Deleted",
      });
    } catch (error) {
      console.error(error);

      return res.status(error.status || 500).json({
        message: error.message || "Something went wrong",
      });
    }
  },
};

module.exports = documentController;
