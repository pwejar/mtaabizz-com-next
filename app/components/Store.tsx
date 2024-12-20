import Image from "next/image";
import { Store, Item } from "../app.interface";
import {
	collection,
	query,
	where,
	limit,
	getDocs,
	doc,
	getDoc,
	DocumentSnapshot,
	DocumentData,
} from "firebase/firestore";
import db from "../firebase/clientApp";
import ItemComponent from "./Item";

export default async function StoreComponent(props: { store: Store }) {
	const { store } = props;
	const items: Item[] = [];
	const itemsPromise: Promise<DocumentSnapshot<DocumentData>>[] = [];
	const loadItems = async (store: Store) => {
		let count: number = 3;
		console.log(store);
		if (store.featuredItems && store.featuredItems?.length > 0) {
			for (let i = 0; i < store.featuredItems.length; i++) {
				if (i < 3) {
					itemsPromise.push(getDoc(doc(db, `items/${store.featuredItems[i]}`)));
				}
			}
			count -= store.featuredItems.length;
		}

		if (count > 0 && store.id) {
			console.log(count);
			const collectionRef = collection(db, "items");
			const collectionQuery = query(
				collectionRef,
				where("public", "==", true),
				where("storeID", "==", store.id),
				limit(count)
			);
			const collectionSnapShot = await getDocs(collectionQuery);
			const itemsHolder = collectionSnapShot.docs.map((doc) => ({
				id: doc.id,
				...(doc.data() as Item),
			}));
			itemsHolder.forEach((item) => {
				items.push(item);
			});
		}
		const itemsSnapshot = await Promise.all(itemsPromise);
		const itemsHolder = itemsSnapshot.map((doc) => ({
			id: doc.id,
			...(doc.data() as Item),
		}));
		itemsHolder.forEach((item) => {
			items.push(item);
		});
	};

	await loadItems(store);
	return (
		<div className="p-4 ">
			<div className="rounded h-full bg-white  ">
				<div className="flex items-center p-1">
					<Image
						src={
							store.logo ? store.logo.small : "/mtaabizz_icon_monochrome.svg"
						}
						alt="pwejar hub logo"
						height={48}
						width={42}
					/>
					<div className="p-1 text-pwejar justify-items-center m-auto">
						<strong>{store.name}</strong>
						{/* <span>Type: </span> */}
					</div>
				</div>
				<div className="grid grid-cols-3">
					{items?.map((item, index) => {
						return <ItemComponent key={index} item={item} />;
					})}
				</div>
			</div>
		</div>
	);
}
