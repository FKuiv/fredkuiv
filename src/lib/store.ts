import { writable } from 'svelte/store';
import type { AnimationScript } from '$lib/types';
import { quadInOut, quintInOut } from 'svelte/easing';
import { tweened } from 'svelte/motion';

export const animationScripts = writable<AnimationScript[]>([]);
export const scrollPercent = writable(0);

export const cameraXPos = tweened(100, {
	duration: 1000,
	easing: quintInOut
});
export const cameraFOV = tweened(180, {
	duration: 2000,
	easing: quadInOut
});
