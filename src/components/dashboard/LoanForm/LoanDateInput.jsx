import { useState, useEffect, useRef } from "react";
import {
	format,
	addDays,
	addMonths,
	isSameDay,
	isAfter,
	startOfMonth,
	isBefore,
	startOfDay,
} from "date-fns";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "../../../utils/formatDate";

export const LoanDateInput = ({ date, delay = 0, onDateChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date(date));
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const calendarRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(event.target) &&
				event.target !== inputRef.current &&
				!inputRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const maxAllowedDate = startOfMonth(addMonths(new Date(), 3));

	const handleDateSelect = (day) => {
		event.preventDefault();
		setSelectedDate(day);
		onDateChange(day.toISOString());
		setIsOpen(false);
	};

	const nextMonth = () => {
		event.preventDefault();
		const newMonth = addMonths(currentMonth, 1);

		if (!isAfter(startOfMonth(newMonth), maxAllowedDate)) {
			setCurrentMonth(newMonth);
		}
		setCurrentMonth(addMonths(currentMonth, 1));
	};

	const isNextDisabled = isAfter(
		startOfMonth(addMonths(currentMonth, 1)),
		maxAllowedDate
	);

	const prevMonth = () => {
		event.preventDefault();
		setCurrentMonth(addMonths(currentMonth, -1));
	};

	const generateDays = () => {
		const startDate = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			1
		);
		const endDate = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			0
		);
		const startDay = startDate.getDay();
		const days = [];

		for (let i = 0; i < startDay; i++) {
			days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
		}

		for (let day = 1; day <= endDate.getDate(); day++) {
			const date = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				day
			);
			const isSelected = isSameDay(date, selectedDate);
			const isToday = isSameDay(date, new Date());
			const isPastDate = isBefore(date, startOfDay(new Date()));

			days.push(
				<button
					key={`day-${day}`}
					onClick={(e) => {
						e.preventDefault();
						handleDateSelect(date);
					}}
					className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors focus:outline-none
					${isSelected ? "bg-blue-600 text-white" : ""}
					${isToday ? "border border-blue-400" : ""}
					hover:bg-blue-500 hover:text-white
					focus:outline-none
					${
						isPastDate
							? "text-gray-500 cursor-not-allowed"
							: "hover:bg-blue-500 hover:text-white"
					}`}
					disabled={isPastDate}
				>
					{day}
				</button>
			);
		}

		return days;
	};

	const quickSelectOptions = [
		{ label: "Today", days: 0 },
		{ label: "1 Week", days: 7 },
		{ label: "2 Weeks", days: 14 },
		{ label: "1 Month", days: 30 },
	];

	return (
		<div className="relative">
			<motion.div
				className="border border-blue-900 rounded-md p-4 mb-6"
				initial={{ x: -20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ delay }}
				ref={inputRef}
			>
				<div
					className="flex justify-between items-center mb-2 cursor-pointer"
					onClick={(e) => {
						e.preventDefault();
						setIsOpen(!isOpen);
					}}
				>
					<span className="text-white font-medium">Duration</span>
					<div className="flex items-center">
						<span className="text-gray-400 mr-2">
							{formatDate(selectedDate)}
						</span>
						<Calendar size={18} className="text-gray-400" />
					</div>
				</div>
			</motion.div>

			{isOpen && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2 }}
					className="absolute z-10 bottom-full mb-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4"
					ref={calendarRef}
				>
					<div className="flex justify-between items-center mb-4">
						<button
							onClick={(e) => {
								e.preventDefault();
								prevMonth();
							}}
							className="p-1 rounded hover:bg-gray-700 focus:outline-none"
						>
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<h3 className="text-white font-medium">
							{format(currentMonth, "MMMM yyyy")}
						</h3>
						<button
							onClick={(e) => {
								e.preventDefault();
								nextMonth();
							}}
							className="p-1 rounded hover:bg-gray-700 focus:outline-none"
							disabled={isNextDisabled}
						>
							<svg
								className="w-5 h-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					<div className="grid grid-cols-7 gap-1 mb-2">
						{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
							<div
								key={day}
								className="text-center text-gray-500 text-xs font-medium"
							>
								{day}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1">{generateDays()}</div>

					<div className="mt-4 pt-4 border-t border-gray-700">
						<h4 className="text-sm text-gray-400 mb-2">Quick Select</h4>
						<div className="flex flex-wrap gap-2">
							{quickSelectOptions.map((option) => (
								<button
									key={option.label}
									onClick={(e) => {
										e.preventDefault();
										const newDate = addDays(new Date(), option.days);
										handleDateSelect(
											isBefore(newDate, new Date()) ? new Date() : newDate
										);
									}}
									className="px-3 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
								>
									{option.label}
								</button>
							))}
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};
