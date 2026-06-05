import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId: projectId || "3s51ulk9",
    dataset: dataset || "production",
  },
  deployment: { autoUpdates: true, appId: "thn5sxm1ayxgwqu1osdp4hwo" },
});
