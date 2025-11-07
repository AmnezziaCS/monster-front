import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const backendPathEnv = process.env.BACKEND_PATH;
if (!backendPathEnv) {
  console.error("❌ BACKEND_PATH is not set in .env.local");
  process.exit(1);
}

const BACKEND_TYPES_PATH = path.resolve(
  `${backendPathEnv}/src/types/api-types.ts`
);
const FRONTEND_TYPES_PATH = path.resolve(
  __dirname,
  "../src/types/api-types.ts"
);

function syncApiTypes() {
  try {
    if (fs.existsSync(BACKEND_TYPES_PATH)) {
      fs.copyFileSync(BACKEND_TYPES_PATH, FRONTEND_TYPES_PATH);
      console.log("✅ Synced API types from backend.");
    } else {
      console.warn("⚠️ Backend types not found. Skipping sync.");
    }
  } catch (err) {
    console.error("❌ Failed to sync API types:", err);
    process.exit(1);
  }
}

syncApiTypes();
