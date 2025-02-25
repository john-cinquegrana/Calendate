'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DayScheduleProps {
	startTime: string;
	endTime: string;
}

const DaySchedule: React.FC<DayScheduleProps> = ({ startTime, endTime }) => {
	const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const startRef = useRef<number | null>(null);
	const endRef = useRef<number | null>(null);
	const scheduleRef = useRef<HTMLDivElement>(null);

	const generateTimeSlots = (start: string, end: string) => {
		const slots = [];
		let current = new Date(`1970-01-01T${start}:00`);
		const endDate = new Date(`1970-01-01T${end}:00`);

		while (current <= endDate) {
			slots.push(current.toTimeString().slice(0, 5));
			current.setMinutes(current.getMinutes() + 15);
		}

		return slots;
	};

	const handleMouseDown = (index: number) => {
		setIsDragging(true);
		startRef.current = index;
		endRef.current = index;
		setSelectedTimes([timeSlots[index]]);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		startRef.current = null;
		endRef.current = null;
	};

	const handleMouseMove = (index: number) => {
		if (isDragging && startRef.current !== null) {
			endRef.current = index;
			const startIndex = Math.min(startRef.current, endRef.current);
			const endIndex = Math.max(startRef.current, endRef.current);
			const newSelectedTimes = timeSlots.slice(startIndex, endIndex + 1);
			setSelectedTimes(newSelectedTimes);
		}
	};

	useEffect(() => {
		const handleDocumentMouseMove = (event: MouseEvent) => {
			if (isDragging && scheduleRef.current) {
				const rect = scheduleRef.current.getBoundingClientRect();
				const midpointX = rect.left + rect.width / 2;
				const element = document.elementFromPoint(
					midpointX,
					event.clientY,
				);
				if (element && element.classList.contains('time-slot')) {
					const index = parseInt(
						element.getAttribute('data-index') || '0',
						10,
					);
					handleMouseMove(index);
				}
			}
		};

		const handleDocumentMouseUp = () => {
			if (isDragging) {
				handleMouseUp();
			}
		};

		document.addEventListener('mousemove', handleDocumentMouseMove);
		document.addEventListener('mouseup', handleDocumentMouseUp);

		return () => {
			document.removeEventListener('mousemove', handleDocumentMouseMove);
			document.removeEventListener('mouseup', handleDocumentMouseUp);
		};
	}, [isDragging]);

	const timeSlots = generateTimeSlots(startTime, endTime);

	return (
		<div
			ref={scheduleRef}
			className='flex flex-col w-24'
		>
			{timeSlots.map((time, index) => (
				<div
					key={time}
					data-index={index}
					className={`time-slot flex items-center justify-center cursor-pointer h-4 ${
						selectedTimes.includes(time) ? 'bg-blue-200' : ''
					}`}
					onMouseDown={() => handleMouseDown(index)}
					style={{
						borderTop:
							index % 4 === 0
								? '2px solid black'
								: '1px solid lightgray',
					}}
				>
					{index % 4 === 0 && <span className='text-xs'>{time}</span>}
				</div>
			))}
		</div>
	);
};

export default DaySchedule;
