const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
	const buttonElem = document.querySelector(btnOpen),
		modalElem = document.querySelector(modal);

	modalElem.style.cssText = `
	opacity: 0;
	visibility: hidden;
	transition: opacity ${time}ms ease-in-out; `;

	const closeModal = event => {
		if (
			event.target === modalElem ||
			(btnClose && event.target.closest(btnClose)) ||
			event.code === 'Escape'
		) {
			modalElem.style.opacity = '0';
			setTimeout(() => (modalElem.style.visibility = 'hidden'), time);
			document.body.removeAttribute('style');
			window.removeEventListener('keydown', closeModal);
		}
	};

	const openModal = () => {
		modalElem.style.opacity = '1';
		modalElem.style.visibility = 'visible';
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', closeModal);
	};

	buttonElem.addEventListener('click', openModal);
	modalElem.addEventListener('click', closeModal);
};

export default modalController;
