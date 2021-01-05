export const statusTranslate = (string) => {
	if (string === 'to-do') return 'Na čekanju';
	if (string === 'in-progress') return 'Rad u toku';
	if (string === 'waiting-for-parts') return 'Čekanje na delove';
	if (string === 'finished') return 'Završeno';

	return 'status nepoznat';
};
