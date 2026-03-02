export const stockType = `#graphql
  type Stock {
    id: ID!
    name: String!
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  type StockPagination {
    data: [Stock!]!
    total: Int!
    page: Int!
    limit: Int!
  }

  extend type Query {
    stocks(
      page: Int
      limit: Int
      search: String
      minPrice: Float
      maxPrice: Float
      sortBy: String
    ): StockPagination!
  }

  extend type Mutation {
    createStock(name: String!, price: Float!): Stock!
    updateStock(id: ID!, name: String, price: Float): Stock!
    deleteStock(id: ID!): String!

  }
`;