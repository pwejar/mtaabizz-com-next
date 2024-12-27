"use client";

import { Folder, Item, Store } from "../app.interface";
import MapComponent from "../components/Map";
import FolderComponent from "../components/Folder";
import ItemComponent from "../components/Item";
import InfiniteScroll from "../components/InfiniteScroll";
import {
	DocumentSnapshot,
	DocumentData,
	getDoc,
	doc,
	collection,
	query,
	where,
	limit,
	getDocs,
} from "firebase/firestore";
import db from "../firebase/clientApp";
import { useEffect, useState } from "react";

export default function MainComponent(props: { store: Store }) {
	const { store } = props;
	const [items, setItems] = useState<Item[]>([]);
	const [folders, setFolders] = useState<Folder[]>(store.folders);
	const itemsPromise: Promise<DocumentSnapshot<DocumentData>>[] = [];
	const [folderName, setFolderName] = useState("");
	const displayFoldersIndexArray: number[] = [];
	const [folderDisplayName, setFolderDisplayName] = useState("");

	const count: number = 16;
	const [itemFetching, setItemFetching] = useState(false);

	const loadItems = async (store: Store) => {
		console.log(store);
		if (store.featuredItems && store.featuredItems?.length > 0) {
			for (let i = 0; i < store.featuredItems.length; i++) {
				itemsPromise.push(getDoc(doc(db, `items/${store.featuredItems[i]}`)));
			}
		}
		const itemsSnapshot = await Promise.all(itemsPromise);
		const itemsHolder = itemsSnapshot.map((doc) => ({
			id: doc.id,
			...(doc.data() as Item),
		}));
		setItems((prevItems) => [...prevItems, ...itemsHolder!]);
		if (store.id) {
			console.log(count);
			const collectionRef = collection(db, "items");
			const collectionQuery = query(
				collectionRef,
				where("public", "==", true),
				where("storeID", "==", store.id),
				limit(count)
			);
			const collectionSnapShot = await getDocs(collectionQuery);
			const newItems = collectionSnapShot.docs.map((doc) => ({
				id: doc.id,
				...(doc.data() as Item),
			}));
			setItems((prevItems) => [...prevItems, ...newItems!]);
		}
	};
	const loadItemsInFolder = async () => {
		console.log(folderName); //why is this gives previous value
		setItemFetching(true);
		setItems([]);
		const collectionRef = collection(db, "items");
		const collectionQuery = query(
			collectionRef,
			where("active", "==", true),
			where("folder", "==", folderName),
			where("public", "==", true),
			where("storeID", "==", store.id),
			limit(count)
		);
		const collectionSnapShot = await getDocs(collectionQuery);
		const itemsHolder = collectionSnapShot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Item),
		}));
		console.log(itemsHolder);
		console.log(itemsHolder);
		setItems(itemsHolder);
		setItemFetching(false);
	};
	// set it inside a useEffect
	useEffect(() => {
		loadItems(store);
	}, []);
	useEffect(() => {
		if (folderName) {
			loadItemsInFolder();
		}
	}, [folderName]);

	const openFolder = (folder: Folder, index: number) => {
		console.log(folder, index);
		displayFoldersIndexArray.push(index);
		setFolderName((previous) => `${previous}/${folder.name}`);
		setFolderDisplayName((previous) => `${previous}/${folder.name}`);
		setFolders(folder.subFolders);
		loadItemsInFolder();
	};
	return (
		<main className="sm:grid sm:grid-cols-[25%_75%] bg-slate-300 min-h-screen">
			<div className="">
				<div className="mapHolder">
					{store.contacts.position && (
						<MapComponent store={store}></MapComponent>
					)}
				</div>
			</div>
			<div>
				{/* <div className="w-full">
								<p>Featured Items</p>
							</div>
							<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 p-4">
								{store.folders?.map((folder, index) => {
									return <FolderComponent key={index} folder={folder} />;
								})}
							</div> */}
				<div>
					<div>
						<h1 className="text-2xl text-center p-4">{folderDisplayName}</h1>
					</div>
					<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 p-4">
						{folders?.map((folder, index) => {
							return (
								<div key={index} onClick={() => openFolder(folder, index)}>
									<FolderComponent folder={folder} />
								</div>
							);
						})}
						{items?.map((item, index) => {
							return <ItemComponent key={index} item={item} />;
						})}
						{itemFetching && <p>Loading...</p>}
						<InfiniteScroll store={store}></InfiniteScroll>
					</div>
				</div>
			</div>
		</main>
	);
}
