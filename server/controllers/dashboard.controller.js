const dashboardService = require("../services/dashboard.service");

const dashboardController = {
  summary: async (req, res) => {
    try {
      const data = await dashboardService.summary();

      console.log("data: ", data);

      return res.status(200).json({
        message: "Data loaded successfully",
        data,
      });
    } catch (error) {
      console.error(error);

      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  },
};

module.exports = dashboardController;
