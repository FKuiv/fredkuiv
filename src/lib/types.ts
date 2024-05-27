type AnimationScrollSection = {
	start: number;
	end: number;
};

export type AnimationScript = {
	section: AnimationScrollSection;
	func: () => void;
};

export type AnimationScrollSections = {
	[key: number]: AnimationScrollSection;
};
