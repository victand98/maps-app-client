import path from "path";
import fs from "fs";

export const getIconOptions = () => {
  const iconsPath = path.join(process.cwd(), "src", "lib");
  const fileContent = fs.readFileSync(
    path.join(iconsPath, "codepoints.txt"),
    "utf8"
  );
  const data = fileContent.split("\n");
  const iconOptions = data.map((nameAndCode) => {
    const parts = nameAndCode.split(" ");
    return {
      name: parts[0],
      code: parts[1],
    };
  });

  return iconOptions;
};
