import { addScaleCorrector } from 'framer-motion';
import { FunctionComponent } from 'react';

interface CalendateHeroProps {}

const CalendateHero: FunctionComponent<CalendateHeroProps> = () => {
	return (
		<div className='flex flex-col justify-center items-center w-full'>
			<h1 className='font-semibold tracking-wider'>Calendate</h1>
		</div>
	);
};

export default CalendateHero;
