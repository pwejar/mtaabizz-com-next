"use client";

import { Folder, Item, Store } from "../app.interface";
import MapComponent from "../components/Map";
import FolderComponent from "../components/Folder";
import ItemComponent from "../components/Item";
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
import Image from "next/image";
import db from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

export default function MainComponent(props: { store: Store }) {
	const { store } = props;
	const [items, setItems] = useState<Item[]>([]);
	const [folders, setFolders] = useState<Folder[]>(store.folders);
	const itemsPromise: Promise<DocumentSnapshot<DocumentData>>[] = [];
	const [folderName, setFolderName] = useState("");
	const displayFoldersIndexArray: number[] = [];
	const [folderDisplayName, setFolderDisplayName] = useState("");

	let count: number = 16;
	const [itemFetching, setItemFetching] = useState(false);

	const loadItems = async (store: Store) => {
		setItemFetching(true);
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
			loadMoreItems(store);
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

		setItems(itemsHolder);
		setItemFetching(false);
	};
	const handleScroll = () => {
		console.log(
			"Scrolling",
			window.innerHeight,
			document.documentElement.scrollTop,
			document.documentElement.offsetHeight
		);
		//detect when user scrolls to bottom
		if (
			window.innerHeight + document.documentElement.scrollTop >
			document.documentElement.offsetHeight - 30
		) {
			if (!itemFetching) {
				if (folderName) {
					loadItemsInFolder();
				} else {
					loadMoreItems(store);
				}
			}
		}
	};
	const loadMoreItems = async (store: Store) => {
		setItemFetching(true);
		const collectionRef = collection(db, "items");
		const collectionQuery = query(
			collectionRef,
			where("public", "==", true),
			where("storeID", "==", store.id),
			limit(count)
		);
		const collectionSnapShot = await getDocs(collectionQuery);
		// Check if item already exists in items before adding
		console.log(items, "more items");

		const newItems = collectionSnapShot.docs.map((doc) => ({
			id: doc.id,
			...(doc.data() as Item),
		}));

		setItems((prevItems) => {
			const existingItemIds = new Set(prevItems.map((item) => item.id));

			const filteredNewItems = newItems.filter(
				(item) => !existingItemIds.has(item.id)
			);
			return [...prevItems, ...filteredNewItems!];
		});
		count += 68;
		console.log(items);
		setItemFetching(false);
	};
	useEffect(() => {
		if (folderName) {
			loadItemsInFolder();
		} else {
			loadItems(store);
		}
	}, [folderName]);
	useEffect(() => {
		console.log("InfiniteScroll");
		const handleDebouncedScroll = debounce(() => handleScroll(), 200);
		window.addEventListener("scroll", handleDebouncedScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const goUpFolder = () => {
		const lastSlashIndex = folderName.lastIndexOf("/");
		if (lastSlashIndex !== -1) {
			const newFolderName = folderName.substring(0, lastSlashIndex);
			setFolderName(newFolderName);
			setFolderDisplayName((previous) => {
				const lastArrowIndex = previous.lastIndexOf(">");
				return previous.substring(0, lastArrowIndex);
			});
			const parentFolder = store.folders.find(
				(folder) => folder.name === newFolderName.split("/").pop()
			);
			if (parentFolder) {
				setFolders(parentFolder.subFolders);
			} else {
				setFolders(store.folders);
			}
			count = 16;
			loadItemsInFolder();
		}
	};

	const openFolder = (folder: Folder, index: number) => {
		console.log(folder, index);
		displayFoldersIndexArray.push(index);
		setFolderName((previous) => `${previous}/${folder.name}`);
		setFolderDisplayName((previous) => `${previous}>${folder.name}`);
		setFolders(folder.subFolders);
		count = 16;
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
					<div className="relative w-full text-center ">
						<p className="p-4 text-center ">Items{folderDisplayName}</p>
						{folderName && (
							<Image
								src="/arrow-back-outline.svg"
								alt="Back Icon"
								width={24}
								height={24}
								className="cursor-pointer absolute right-4 top-4"
								onClick={() => {
									goUpFolder();
								}}
							/>
						)}
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
					</div>
				</div>
			</div>
		</main>
	);
}
