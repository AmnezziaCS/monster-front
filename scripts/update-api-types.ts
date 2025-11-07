import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local manually (lightweight, avoids requiring the 'dotenv' package)
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  try {
    const raw = fs.readFileSync(envPath, "utf8");
    raw.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eq = trimmed.indexOf("=");
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    });
  } catch (err) {
    console.warn("Could not read .env.local:", err);
  }
}

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
