import "dotenv/config";
import app from "./app.js";
// import shutdownUtil from "./utils/shutdown.util.js";

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}`);
});
