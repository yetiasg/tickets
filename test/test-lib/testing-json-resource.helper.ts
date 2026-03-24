import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function loadJsonResource<T>(
  relativeResourcePath: string,
): Promise<T> {
  const resourceFilePath = path.join(
    process.cwd(),
    'test/resources',
    relativeResourcePath,
  );

  const content = await fs.readFile(resourceFilePath, 'utf-8');

  return JSON.parse(content) as T;
}
