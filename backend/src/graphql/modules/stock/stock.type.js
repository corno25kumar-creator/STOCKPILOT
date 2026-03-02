export const stockType = `#graphql
  type Stock {
    id: ID!
    name: String!
    price: Float!
  }

  extend type Query {
    stocks: [Stock!]!
  }
`;