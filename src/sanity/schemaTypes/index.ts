import { type SchemaTypeDefinition } from "sanity";
import { portfolioType } from "./portfolioSchema";
import { projectSchema } from "./projectSchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioType, projectSchema],
};
