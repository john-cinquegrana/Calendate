'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DayScheduleProps {
	startTime: string;
	endTime: string;
}

const DaySchedule: React.FC<DayScheduleProps> = ({ startTime, endTime }) => {
	const [selectedTimes, setSelectedTimes] = useState<boolean[]>(() => {
		let current = new Date(`1970-01-01T${startTime}:00`);
		const endDate = new Date(`1970-01-01T${endTime}:00`);

		const diffInMs = endDate.getTime() - current.getTime();
		const numberOfIntervals = diffInMs / (15 * 60 * 1000);

		return new Array(numberOfIntervals).fill(false);
	});

	function addTimeByIndex(index: number, newValue: boolean): void {
		let newSelectedTimes = [...selectedTimes];
		newSelectedTimes[index] = newValue;
		setSelectedTimes(newSelectedTimes);
	}

	function addTimesByIndex(indexes: number[], newValue: boolean): void {
		let newSelectedTimes = [...selectedTimes];
		indexes.forEach((index) => {
			newSelectedTimes[index] = newValue;
		});
		setSelectedTimes(newSelectedTimes);
	}

	const [isDragging, setIsDragging] = useState(false);
	const startRef = useRef<number | null>(null);
	const endRef = useRef<number | null>(null);
	const isAdding = useRef<boolean | null>(null);
	const scheduleRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (index: number) => {
		setIsDragging(true);
		startRef.current = index;
		endRef.current = index;
		isAdding.current = !selectedTimes[index];
		addTimeByIndex(index, isAdding.current);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		startRef.current = null;
		endRef.current = null;
		isAdding.current = null;
	};

	const handleMouseMove = (index: number) => {
		if (isDragging && startRef.current !== null) {
			endRef.current = index;
			const startIndex = Math.min(startRef.current, endRef.current);
			const endIndex = Math.max(startRef.current, endRef.current);
			const indexes = Array.from(
				{ length: endIndex - startIndex + 1 },
				(_, i) => startIndex + i,
			);
			addTimesByIndex(indexes, isAdding.current!);
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

	return (
		<div
			ref={scheduleRef}
			className='flex flex-col w-24'
		>
			{selectedTimes.map((isSelected, index) => (
				<div
					key={index}
					data-index={index}
					className={`time-slot flex items-center justify-center cursor-pointer h-4 ${
						selectedTimes[index] ? 'bg-blue-200' : ''
					}`}
					onMouseDown={() => handleMouseDown(index)}
					style={{
						borderTop:
							index % 4 === 0
								? '2px solid black'
								: '1px solid lightgray',
					}}
				>
					{index % 4 === 0 && (
						<span className='text-xs'>{isSelected}</span>
					)}
				</div>
			))}
		</div>
	);
};

export default DaySchedule;
