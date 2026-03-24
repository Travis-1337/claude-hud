import type { RenderContext } from '../../types.js';
import { label } from '../colors.js';

export function renderToolCountsLine(ctx: RenderContext): string | null {
  if (ctx.config?.display?.showToolCounts === false) {
    return null;
  }

  const counts = ctx.transcript?.toolCounts;
  if (!counts || Object.keys(counts).length === 0) {
    return null;
  }

  const totalCalls = Object.values(counts).reduce((sum, n) => sum + n, 0);

  // Sort by count descending
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const parts = sorted.map(([name, count]) => `${name} x${count}`);

  return label(`Tools: ${totalCalls} calls (${parts.join(' | ')})`, ctx.config?.colors);
}
