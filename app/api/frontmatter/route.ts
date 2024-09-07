import { NextRequest, NextResponse } from 'next/server';

import splitFrontmatterFromContent from '../../../utils/data/splitFrontmatterFromContent';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filePath = searchParams.get('path');
  const mdxFilePath = path.join(process.cwd(), 'app', `${filePath}`, 'page.mdx');
  const pageData = await splitFrontmatterFromContent(mdxFilePath)

  return NextResponse.json(pageData);
}
