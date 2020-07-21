import fs from "fs";
import { mergeSchemas } from "graphql-tools";
import { makeExecutableSchema } from "apollo-server-express";
import resolvers from "./resolvers";

// Cargando Schemas
const clientesSchema = makeExecutableSchema({
    typeDefs:fs.readFileSync("./data/schemas/clientesSchema.graphql", "utf8").toString()
});

const productosSchema = makeExecutableSchema({
    typeDefs:fs.readFileSync("./data/schemas/productosSchema.graphql", "utf8").toString()
});

// Uniendo Schemas y resolvers
const schema = mergeSchemas({
    schemas : [clientesSchema,productosSchema],
    resolvers: resolvers
});

export default schema;