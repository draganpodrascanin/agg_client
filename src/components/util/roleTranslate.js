export const roleTranslate = (string) => {
	if (string === 'mechanic') return 'Mehaničar';
	if (string === 'blogger') return 'Blogger';
	if (string === 'admin') return 'Administrator';
	if (string === 'super-admin') return 'Super Administrator';

	return 'status nepoznat';
};
