import DaySchedule from '@/components/day_schedule';
import React from 'react';

const SchedulePage: React.FC = () => {
	return (
		<div>
			<h1>Schedule</h1>
			<DaySchedule
				startTime='08:00'
				endTime='20:00'
			/>
		</div>
	);
};

export default SchedulePage;
