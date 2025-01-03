/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Item } from "../app.interface";
import localFont from "next/font/local";
const chicleFont = localFont({
	src: "../fonts/Chicle-Regular.ttf",
	variable: "--font-geist-mono",
});
const withImage = (item: Item) => {
	return (
		<>
			<img
				className="imageMaxCenter "
				src={item.photos[0]?.compressed}
				alt="Shoes"
			/>
			<div className="absolute w-full top-0 translucent ">
				<p className="textExtraSmall text-center text-yellow-300 opacity-100 pb-4 [text-shadow:_0px_-1px_1px_#000000]">
					{item.name.length > 16
						? `${item.name.substring(0, 16)}...`
						: item.name}
				</p>
			</div>
		</>
	);
};
const withoutImage = (item: Item) => {
	return (
		<div className="absolute top-0">
			<div className="relative p-2">
				<p className="text-sm text-yellow-500 opacity-100 pb-4">{item.name}</p>
			</div>
		</div>
	);
};
export default function ItemComponent(props: { item: Item }) {
	const item = props.item;
	return (
		<div className="p-2">
			<div className="card cursor-pointer rounded-md overflow-hidden pwejar  shadow-xl">
				<figure className=" relative rounded">
					<img src="/frame.svg" alt="" />
					{item.photos[0] ? withImage(item) : withoutImage(item)}
				</figure>

				<div className="ribbon-2 bg-yellow-500">
					<h3 className={`text-sm" ${chicleFont.className}`}>
						<span className="textExtraSmall text-red-800">Ksh</span>
						{item.priceVary ? item.markedPriceFrom : item.markedPrice}{" "}
					</h3>
				</div>
			</div>
		</div>
	);
}
