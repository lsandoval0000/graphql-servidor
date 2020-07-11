import fs from "fs";
import path from "path";

const typeDefs = fs.readFileSync("data/schema.graphql", "utf8").toString();

export {typeDefs};