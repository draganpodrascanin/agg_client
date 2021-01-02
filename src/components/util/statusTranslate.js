export const statusTranslate = (string) => {
	if (string === 'to-do') return 'Na čekanju';
	if (string === 'in-progress') return 'Čekanje na delove';
	if (string === 'waiting-for-parts') return 'Čekanje na delove';
	if (string === 'finished') return 'Završeno';

	return 'status nepoznat';
};
