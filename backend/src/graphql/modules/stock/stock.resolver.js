export const stockResolver = {
  Query: {
    stocks: async () => {
      return [
        { id: "1", name: "Apple", price: 180.5 }
      ];
    }
  }
};