"use client";
export default function SearchBar() {
	// const inputValue: string = "test";
	const handleSearch = () => {
		console.log("runing");
	};
	const handleChange = () => {
		console.log("runing");
	};
	const handleKeyPress = (event: { key: string }) => {
		if (event.key === "Enter") return handleSearch();
	};
	return (
		<div>
			<input
				type="text"
				id="inputId"
				placeholder="Search Item"
				onChange={handleChange}
				onKeyDown={handleKeyPress}
				className="bg-[transparent] rounded shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] focus:outline-none focus:shadow-[1px_4px_5px_4px_rgba(0,_128,_0,_0.1)] w-full p-1"
			/>
		</div>
	);
}
