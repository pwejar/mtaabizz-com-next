import { Item } from "@/app/app.interface";
import db from "@/app/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Add from "./Add";

export default async function page(props: {
	params: { storeID: string; itemID: string };
}) {
	const { itemID } = await props.params;
	const itemSnap = await getDoc(doc(db, `items/${itemID}`));
	const item = itemSnap.data() as Item;
	return (
		<div className="sm:grid sm:grid-cols-2 p-4">
			<div className="p-4">
				<div className="overflow-hidden rounded-lg shadow-lg">
					{item.photos && item.photos.length > 0 && (
						<Image
							src={item.photos[0].compressed!}
							alt={item.name}
							width={500}
							height={500}
						/>
					)}
				</div>
				<div className="flex justify-center mt-4 w-full">
					{item.photos &&
						item.photos.map((photo, index) => (
							<div key={photo.compressed! + index} className="flex-1 p-2">
								<Image
									src={photo.compressed!}
									alt={item.name}
									width={100}
									height={100}
								/>
							</div>
						))}
				</div>
			</div>
			<div className="text-center">
				<h1>
					{item.subItem && (
						<span className="text-sm">{item.splitIntoType} -</span>
					)}
					{item.name}
				</h1>
				{item.priceVary ? (
					<p>From: KSH{item.markedPriceFrom}</p>
				) : (
					<p>Ksh. {item.markedPrice}</p>
				)}
				{item?.barcode && (
					<div className="text-center mt-4">
						<span className="inline-flex items-center">
							<svg
								className="w-6 h-6 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18"
								/>
							</svg>
							<span>{item.barcode}</span>
						</span>
					</div>
				)}
				{item?.linkedItems && (
					<div className="center">
						<div className="ion-chip ion-text-center">
							linked items: {"( "}
							{item.linkedItems.map((linkedItem, index) => (
								<span key={index}>
									{linkedItem.quantity} X{linkedItem.name}
									{index < item.linkedItems!.length - 1 ? ", " : ")"}
								</span>
							))}
						</div>
					</div>
				)}
				{item?.linkedOptions && (
					<div className="center">
						{item.linkedOptions.map((linkedOption, i) => (
							<div key={i} className="ion-chip ion-text-center">
								<span className="text-primary">{linkedOption.name}: </span>
								{linkedOption.options.map((linkedItem, k) => (
									<span key={k}>
										{k !== 0 && <span className="text-primary">, &nbsp;</span>}
										{k === linkedOption.options.length - 1 && (
											<span className="text-primary"> or &nbsp;</span>
										)}
										{linkedItem.name} &nbsp;
									</span>
								))}
							</div>
						))}
					</div>
				)}
				{item?.descriptionHTML && (
					<div
						className="mt-4"
						dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}
					></div>
				)}
				{item?.description && <p className="mt-4">{item.description}</p>}
				{<Add item={item}></Add>}
			</div>
		</div>
	);
}
