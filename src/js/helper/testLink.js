const isImgLink = url => {
	const reg = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim;
	return reg.test(url);
};

export default isImgLink;
