import { Stock } from "../../../models/Stock.js";

export const stockResolver = {
  Query: {
    stocks: async (_, args) => {
      const {
        page = 1,
        limit = 5,
        search,
        minPrice,
        maxPrice,
        sortBy = "createdAt"
      } = args;

      const query = { isDeleted: false };

      if (search) {
        query.name = { $regex: search, $options: "i" };
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        query.price = {};
        if (minPrice !== undefined) query.price.$gte = minPrice;
        if (maxPrice !== undefined) query.price.$lte = maxPrice;
      }

      const skip = (page - 1) * limit;

      const total = await Stock.countDocuments(query);

      const data = await Stock.find(query)
        .sort({ [sortBy]: -1 })
        .skip(skip)
        .limit(limit);

      return {
        data,
        total,
        page,
        limit
      };
    }
  },

  Mutation: {
    createStock: async (_, { name, price }) => {
      const stock = new Stock({ name, price });
      return await stock.save();
    },

    updateStock: async (_, { id, name, price }) => {
      const stock = await Stock.findById(id);

      if (!stock || stock.isDeleted) {
        throw new Error("Stock not found");
      }

      if (name !== undefined) stock.name = name;
      if (price !== undefined) stock.price = price;

      await stock.save();
      return stock;
    },

    deleteStock: async (_, { id }) => {
      const stock = await Stock.findById(id);

      if (!stock || stock.isDeleted) {
        throw new Error("Stock not found");
      }

      stock.isDeleted = true;
      await stock.save();

      return "Stock deleted successfully";
    }
  }
};