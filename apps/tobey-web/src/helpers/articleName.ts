import type { schemas } from '@tobey/db';
import type { z } from 'zod';

const attrs = ['categoryName', 'brand', 'model'] as const;
export const articleName = (
  article: Pick<z.infer<(typeof schemas)['articles']['schema']>, (typeof attrs)[number]>,
) =>
  attrs
    .map((attr) => article[attr])
    .filter(Boolean)
    .join(' ');
