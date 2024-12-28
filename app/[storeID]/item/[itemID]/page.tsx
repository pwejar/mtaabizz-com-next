import { Item } from "@/app/app.interface";
import db from "@/app/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

export default async function page(props: {
	params: { storeID: string; itemID: string };
}) {
	const { itemID } = props.params;
	const itemSnap = await getDoc(doc(db, `items/${itemID}`));
	const item = itemSnap.data() as Item;
	return (
		<div className="sm:grid sm:grid-cols-2 p-4">
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

			<h1>Item {item.name} selected</h1>
		</div>
	);
}
