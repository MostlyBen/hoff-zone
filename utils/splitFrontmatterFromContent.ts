import fs from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const splitFrontmatterFromContent = async (filePath:fs.PathLike) => {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const serializedContent = await serialize(content)

    return { data, content: serializedContent };
  }

  return {data: {}, content: ''};
}

export default splitFrontmatterFromContent
