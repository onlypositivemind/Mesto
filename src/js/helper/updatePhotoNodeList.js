import modalController from '../modules/modal.js';

const updatePhotoNodeList = () => {
	modalController({
		modal: '.modal-photo',
		btnOpen: '.card__image',
		btnClose: '.modal-photo__close',
	});
};

export default updatePhotoNodeList;
