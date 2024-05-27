import { NextApiRequest, NextApiResponse } from 'next';

import getFrontMatter from '../../utils/getFrontMatter';
import path from 'path';

const handler = (req:NextApiRequest, res:NextApiResponse) => {
  const { path: filePath } = req.query;
  const mdxFilePath = path.join(process.cwd(), 'src', 'pages', `${filePath}.mdx`);
  const frontmatter = getFrontMatter(mdxFilePath)
  
  res.status(200).json(frontmatter)
}

export default handler