import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  rfcllmapi: {
    from: {
      source: "url",
      url: "http://127.0.0.1:8000/openapi.json",
    },
    outputDir: "src/api",
    to: async (context) => {
      const filenamePrefix = "rfcllmapi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
