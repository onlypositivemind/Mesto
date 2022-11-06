const modalController = ({ modal, btnOpen, btnClose }) => {
	const buttonElem = document.querySelector(btnOpen),
		modalElem = document.querySelector(modal),
		saveElem = document.querySelector('.modal__save-btn');
	let inputs;

	modalElem.style.cssText = `
	opacity: 0;
	visibility: hidden;
	transition: opacity 300ms ease-in-out; `;

	const closeModal = event => {
		if (
			event.target === modalElem ||
			(btnClose && event.target.closest(btnClose)) ||
			event.code === 'Escape' ||
			event.target === saveElem
		) {
			modalElem.style.opacity = '0';
			document.body.removeAttribute('style');
			window.removeEventListener('keydown', closeModal);

			setTimeout(() => {
				modalElem.style.visibility = 'hidden';
			}, 300);
		}
	};

	const openModal = () => {
		modalElem.style.opacity = '1';
		modalElem.style.visibility = 'visible';
		document.body.style.overflow = 'hidden';

		window.addEventListener('keydown', closeModal);

		inputs = modalElem.querySelectorAll('.modal__input');
	};

	buttonElem.addEventListener('click', openModal);
	modalElem.addEventListener('click', closeModal);
};

export default modalController;
