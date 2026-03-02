import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { userType } from "./modules/user/user.type.js";
import { userResolver } from "./modules/user/user.resolver.js";

import { stockType } from "./modules/stock/stock.type.js";
import { stockResolver } from "./modules/stock/stock.resolver.js";

export const typeDefs = mergeTypeDefs([
  userType,
  stockType
]);

export const resolvers = mergeResolvers([
  userResolver,
  stockResolver
]);