type AnimationScrollSection = {
	start: number;
	end: number;
};

export type AnimationScript = {
	section: AnimationScrollSection;
	func: () => void;
	clearFunc: () => void;
};

export type AnimationScrollSections = {
	[key: number]: AnimationScrollSection;
};

export type StoryText = {
	title: string;
	description: string;
};

export type StoryCardPosition = {
	position: [number, number, number];
	rotation: [number, number, number];
};
export type StoryCardPositions = Record<number, StoryCardPosition>;
