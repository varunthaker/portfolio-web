import { useTransform, type MotionValue } from 'motion/react'
import { journey } from '../../content/journey'

/** Index of the last chapter. */
export const LAST = journey.length - 1

/**
 * Convert a chapter position into scroll progress 0..1. The scroll story starts
 * with an intro screen (position -1), then one screen per chapter
 * (0 … LAST, fractions allowed).
 */
export const at = (chapter: number) => Math.min(1, Math.max(0, (chapter + 1) / (LAST + 1)))

/**
 * Opacity that fades in over chapters [inFrom → inTo] and out over
 * [outFrom → outTo]. Omit `fadeIn` to start visible, `fadeOut` to stay visible.
 */
export function useWindow(
  progress: MotionValue<number>,
  fadeIn?: readonly [number, number],
  fadeOut?: readonly [number, number],
): MotionValue<number> {
  const input: number[] = []
  const output: number[] = []
  if (fadeIn) {
    input.push(at(fadeIn[0]), at(fadeIn[1]))
    output.push(0, 1)
  } else {
    input.push(0)
    output.push(1)
  }
  if (fadeOut) {
    input.push(at(fadeOut[0]), at(fadeOut[1]))
    output.push(1, 0)
  } else {
    input.push(1)
    output.push(1)
  }
  return useTransform(progress, input, output)
}

/** Map chapter positions to values, e.g. useChapters(p, [0, 2], [0, 240]). */
export function useChapters(
  progress: MotionValue<number>,
  chapters: number[],
  values: number[],
): MotionValue<number> {
  return useTransform(progress, chapters.map(at), values)
}
