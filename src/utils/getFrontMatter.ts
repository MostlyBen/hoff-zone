import fs from 'fs';
import matter from 'gray-matter';

const getFrontMatter = (filePath:fs.PathLike) => {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return data;
  }

  return {};
}

export default getFrontMatter