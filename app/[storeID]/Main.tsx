"use client";

import { Folder, Item, Store } from "../app.interface";
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
import { motion } from "framer-motion";
import Link from "next/link";
import { Params } from "next/dist/server/request/params";
interface ItemWithAnimationDelay extends Item {
	animationDelay: number;
}
export default function MainComponent(props: {
	store: Store;
	params?: Params;
}) {
	const { store } = props;
	const param = props.params;
	const folderIndex = param?.folder;
	const [items, setItems] = useState<ItemWithAnimationDelay[]>([]);
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
		const itemsHolder = itemsSnapshot.map((doc, index) => ({
			id: doc.id,
			...(doc.data() as Item),
			animationDelay: index * 0.05,
		}));
		setItems((prevItems) => {
			const existingItemIds = new Set(prevItems.map((item) => item.id));
			const filteredNewItems = itemsHolder.filter(
				(item) => !existingItemIds.has(item.id)
			);
			return [...prevItems, ...filteredNewItems!];
		});
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
		const itemsHolder = collectionSnapShot.docs.map((doc, index) => ({
			id: doc.id,
			...(doc.data() as Item),
			animationDelay: index * 0.05,
		}));

		setItems(itemsHolder);
		count += 24;
		setItemFetching(false);
	};
	const handleScroll = () => {
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
		const newItems = collectionSnapShot.docs.map((doc, index) => ({
			id: doc.id,
			...(doc.data() as Item),
			animationDelay: index * 0.05,
		}));

		setItems((prevItems) => {
			const existingItemIds = new Set(prevItems.map((item) => item.id));
			const filteredNewItems = newItems.filter(
				(item) => !existingItemIds.has(item.id)
			);
			return [...prevItems, ...filteredNewItems!];
		});
		count += 24;
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
			count = 24;
			loadItemsInFolder();
		}
	};

	const openFolder = (folder: Folder, index: number) => {
		console.log(folder, index);
		displayFoldersIndexArray.push(index);
		setFolderName((previous) => `${previous}/${folder.name}`);
		setFolderDisplayName((previous) => `${previous}>${folder.name}`);
		setFolders(folder.subFolders);
		count = 24;
		loadItemsInFolder();
	};
	return (
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
					<p className="p-4 text-center ">
						Items{folderDisplayName} index:{folderIndex}
					</p>
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
						return (
							<motion.div
								key={item.id! + index}
								initial={{ opacity: 0, y: 0, x: 200 }}
								animate={{ opacity: 1, y: 0, x: 0 }}
								transition={{
									duration: 0.5,
									ease: [0.25, 0.25, 0, 1],
									delay: item.animationDelay,
								}}
							>
								<Link href={`/${store.userName}/items/${item.id}`}>
									{<ItemComponent key={index} item={item} />}
								</Link>
							</motion.div>
						);
					})}
					{itemFetching && <p>Loading...</p>}
				</div>
			</div>
		</div>
	);
}
