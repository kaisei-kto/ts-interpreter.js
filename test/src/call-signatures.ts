interface ClickListener {
	(this: Window, e: MouseEvent): void;
}

const myListener: ClickListener = (e) => {
	console.log('mouse clicked!', e);
};

addEventListener('click', myListener);
