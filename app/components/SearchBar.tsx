"use client";
export default function SearchBar() {
	const inputValue: string = "test";
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
				placeholder="Enter your keywords"
				value={inputValue ?? ""}
				onChange={handleChange}
				onKeyDown={handleKeyPress}
				className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3"
			/>
		</div>
	);
}
