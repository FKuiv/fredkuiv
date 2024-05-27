import { writable } from 'svelte/store';
import type { AnimationScript } from '$lib/types';

export const animationScripts = writable<AnimationScript[]>([]);
export const scrollPercent = writable(0);
