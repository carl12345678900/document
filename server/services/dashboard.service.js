const dashboardModel = require("../models/dashboard.model");
const { date } = require;

const dashboardService = {
  summary: async () => {
    const totalDocs = await dashboardModel.totalDocs();
    const totalCategories = await dashboardModel.totalCategories();
    const totalPinned = await dashboardModel.totalPinned();
    const totalArchivedDocs = await dashboardModel.totalArchivedDocs();
    const totalArchivedCategory = await dashboardModel.totalArchivedCategory();

    const recentDocs = await dashboardModel.recentDocs();

    console.log("recent: ", recentDocs);

    const newRecentDocs = [];

    recentDocs.map((r) => {
      const data = {
        id: r.id,
        title: r.title,
        name: r.name,
        activity: r.activity,
        date: r.updated_at,
      };

      newRecentDocs.push(data);
    });

    console.log("new: ", newRecentDocs);

    return {
      summary: {
        totalDocs,
        totalCategories,
        totalPinned,
        totalArchivedDocs,
        totalArchivedCategory,
      },
      recentDocuments: newRecentDocs,
    };
  },
};

module.exports = dashboardService;
