import { FC } from 'react';

export const Space: FC = () => {
	return (
		<div className='absolute inset-0 flex justify-center items-center -z-10'>
			<div className='h-[400px] w-[600px] bg-cover bg-no-repeat bg-center rounded-xl shadow-vignette bg-space-texture'></div>
		</div>
	);
};
