import { NextApiRequest, NextApiResponse } from 'next';

import splitFrontmatterFromContent from '../../utils/splitFrontmatterFromContent';
import path from 'path';

const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  const { path: filePath } = req.query;
  const mdxFilePath = path.join(process.cwd(), 'src', 'pages', `${filePath}.mdx`);
  const pageData = await splitFrontmatterFromContent(mdxFilePath)
  res.status(200).json(pageData);

}

export default handler