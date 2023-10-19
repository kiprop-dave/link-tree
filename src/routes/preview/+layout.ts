import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	return {
		layoutData: {
			path: url.pathname,
			origin: url.origin
		}
	};
};
