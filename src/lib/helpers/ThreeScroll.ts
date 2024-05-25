/* Liner Interpolation
 * lerp(min, max, ratio)
 * eg,
 * lerp(20, 60, .5)) = 40
 * lerp(-20, 60, .5)) = 20
 * lerp(20, 60, .75)) = 50
 * lerp(-20, -10, .1)) = -.19
 */
export function lerp(
	minValue: number,
	maxValue: number,
	ratio: number,
	weight: number = 1
): number {
	return (1 - ratio ** weight) * minValue + ratio ** weight * maxValue;
}
/* Used to fit the lerps to start and end at specific scrolling percentages
 * start: the start of the scroll range. Should be the same as the start percentage of the animation
 * end: the end of the scroll range. Should be the same as the end percentage of the animation
 * scrollPercent: the current scroll percentage
 */
export function scalePercent(start: number, end: number, scrollPercent: number) {
	return (scrollPercent - start) / (end - start);
}
