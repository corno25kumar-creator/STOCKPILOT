export const userResolver = {
  Query: {
    users: async () => {
      return [
        { id: "1", name: "Chandan", email: "chandan@test.com" }
      ];
    }
  }
};