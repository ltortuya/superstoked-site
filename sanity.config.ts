import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

// This config is used by both the embedded Studio (at /studio) and by the
// `sanity` CLI (via sanity.cli.ts).
export default defineConfig({
  name: "superstoked",
  title: "Superstoked Foundation",
  basePath: "/studio",
  projectId: projectId || "3s51ulk9",
  dataset: dataset || "production",
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
  ],
  schema: { types: schemaTypes },
});
