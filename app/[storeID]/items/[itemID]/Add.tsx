"use client";
import { Item } from "@/app/app.interface";
import React from "react";

export default function Add(props: { item: Item }) {
	const { item } = props;
	const addItemToCart = () => {
		console.log(item);
	};
	return (
		<div className="mt-4 flex justify-center items-center">
			<button className="px-4 py-2 bg-gray-200 rounded-l-lg">-</button>
			<span className="px-4 py-2 bg-white border-t border-b">1</span>
			<button className="px-4 py-2 bg-gray-200 rounded-r-lg">+</button>
			<button
				onClick={addItemToCart}
				className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
			>
				Add to Cart
			</button>
		</div>
	);
}
