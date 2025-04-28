import { useState, useRef, useEffect } from "react";
import { SlCalender } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	isSameMonth,
	isSameDay,
	format,
	addMonths,
	subMonths,
	isBefore,
	startOfDay,
	differenceInMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const DateSelector = ({ date, setDate }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const today = startOfDay(new Date());
	const calendarRef = useRef(null);
	const selectorRef = useRef(null);

	// Close calendar when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (calendarRef.current && !calendarRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const renderHeader = () => {
		const monthDiff = differenceInMonths(currentMonth, today);

		return (
			<div className="flex justify-between items-center mb-2 sm:mb-4">
				<button
					onClick={() => {
						if (monthDiff > 0) setCurrentMonth(subMonths(currentMonth, 1));
					}}
					className={`${
						monthDiff > 0
							? "text-gray-400 hover:text-gray-200"
							: "text-gray-600 cursor-not-allowed"
					}`}
					disabled={monthDiff === 0}
				>
					<ChevronLeft />
				</button>
				<div className="text-gray-200 font-semibold text-xs sm:text-sm">
					{format(currentMonth, "MMMM yyyy")}
				</div>
				<button
					onClick={() => {
						if (monthDiff < 2) setCurrentMonth(addMonths(currentMonth, 1));
					}}
					className={`${
						monthDiff < 2
							? "text-gray-400 hover:text-gray-200"
							: "text-gray-600 cursor-not-allowed"
					}`}
					disabled={monthDiff === 2}
				>
					<ChevronRight />
				</button>
			</div>
		);
	};

	const renderDays = () => {
		const days = [];
		const dateFormat = "EEE";
		const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });

		for (let i = 0; i < 7; i++) {
			days.push(
				<div
					key={i}
					className="text-center text-gray-400 text-xs sm:text-sm font-medium"
				>
					{format(addDays(startDate, i), dateFormat)}
				</div>
			);
		}

		return <div className="grid grid-cols-7 mb-1 sm:mb-2">{days}</div>;
	};

	const renderCells = () => {
		const monthStart = startOfMonth(currentMonth);
		const monthEnd = endOfMonth(monthStart);
		const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
		const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

		const rows = [];
		let days = [];
		let day = startDate;

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				const cloneDay = day;
				const isPast = isBefore(day, today);
				const isAfterThreeMonths = differenceInMonths(day, today) > 3;
				const isDisabled =
					!isSameMonth(day, monthStart) || isPast || isAfterThreeMonths;

				const tooltipMessage = isPast
					? "You cannot pick a past date"
					: isAfterThreeMonths
					? "Dates after 3 months are not allowed"
					: "";

				days.push(
					<div
						key={day}
						className={`flex justify-center items-center h-8 w-8 sm:h-10 sm:w-10 mx-auto my-1 text-xs sm:text-sm rounded-full
              ${
								isSameDay(day, date[0])
									? "bg-gradient-to-r from-[#0F3EB3] via-[#375FD9] to-[#0B32A5] text-white"
									: isDisabled
									? "text-gray-500 cursor-not-allowed"
									: "text-gray-300 hover:bg-gray-600 hover:text-white cursor-pointer"
							}
            `}
						onClick={() => {
							if (!isDisabled) {
								setDate([cloneDay]);
								setIsOpen(false);
							}
						}}
						title={tooltipMessage} // Tooltip on hover for disabled dates
					>
						{format(day, "d")}
					</div>
				);
				day = addDays(day, 1);
			}
			rows.push(
				<div key={day} className="grid grid-cols-7">
					{days}
				</div>
			);
			days = [];
		}

		return <div>{rows}</div>;
	};

	const handleQuickSelect = (option) => {
		let selectedDate = today;

		if (option === "nextWeek") {
			selectedDate = addDays(today, 7);
		} else if (option === "twoWeeks") {
			selectedDate = addDays(today, 14);
		} else if (option === "oneMonth") {
			selectedDate = addMonths(today, 1);
		}

		setDate([selectedDate]);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={calendarRef}>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="absolute bottom-full mb-2 left-0 bg-gray-900 p-3 sm:p-4 rounded-xl shadow-lg z-50 w-full sm:w-auto max-w-full sm:max-w-[400px]"
					>
						{renderHeader()}
						{renderDays()}
						{renderCells()}

						{/* Quick Select Options */}
						<div className="flex flex-wrap gap-2 justify-around mt-2 sm:mt-4">
							<button
								className="bg-gray-600 cursor-pointer text-white px-2 py-1 text-xs sm:text-sm rounded"
								onClick={() => handleQuickSelect("nextWeek")}
							>
								Next Week
							</button>
							<button
								className="bg-gray-600 cursor-pointer text-white px-2 py-1 text-xs sm:text-sm rounded"
								onClick={() => handleQuickSelect("twoWeeks")}
							>
								2 Weeks
							</button>
							<button
								className="bg-gray-600 cursor-pointer text-white px-2 py-1 text-xs sm:text-sm rounded"
								onClick={() => handleQuickSelect("oneMonth")}
							>
								1 Month
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main Selector */}
			<div
				className="bg-gray-800 p-3 sm:p-4 rounded-xl mb-4 cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
				ref={selectorRef} // Set reference here
			>
				<div className="text-gray-200 font-medium text-xs sm:text-sm mb-1 sm:mb-2">
					Duration
				</div>
				<div className="flex justify-between items-center">
					<div className="text-gray-400 text-xs sm:text-base">
						{date[0].toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						})}
					</div>
					<div className="text-gray-400">
						<SlCalender className="w-4 h-4 sm:w-5 sm:h-5" />
					</div>
				</div>
			</div>
		</div>
	);
};
