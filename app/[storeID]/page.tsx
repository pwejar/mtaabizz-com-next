/* eslint-disable @next/next/no-img-element */
import localFont from "next/font/local";
import React from "react";
import { Item, Store } from "../app.interface";
import db from "../firebase/clientApp";
import SearchBar from "../components/SearchBar";
import MapComponent from "../components/Map";
import FolderComponent from "../components/Folder";
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
import ItemComponent from "../components/Item";
import InfiniteScroll from "../components/InfiniteScroll";
type Params = Promise<{ storeID: string }>;
const gabaritoFont = localFont({
	src: "../fonts/Gabarito-VariableFont_wght.ttf",
	variable: "--font-geist-mono",
});
export async function generateMetadata(props: { params: Params }) {
	const { storeID } = await props.params;
	const querySnapshot = await getDocs(
		query(collection(db, "stores"), where("userName", "==", storeID))
	);
	const stores = querySnapshot.docs.map((doc) => ({
		...(doc.data() as Store),
		id: doc.id,
	}));
	const store = stores[0];
	if (!store) {
		return {
			title: "Store not found",
		};
	}
	return {
		title: store.name + " | online store",
	};
}
export default async function page(props: { params: Params }) {
	const { storeID } = await props.params;
	const querySnapshot = await getDocs(
		query(collection(db, "stores"), where("userName", "==", storeID))
	);
	const stores = querySnapshot.docs.map((doc) => ({
		...(doc.data() as Store),
		id: doc.id,
	}));
	const store = stores[0];
	const items: Item[] = [];
	const itemsPromise: Promise<DocumentSnapshot<DocumentData>>[] = [];
	const count: number = 16;

	const loadItems = async (store: Store) => {
		console.log(store);
		if (store.featuredItems && store.featuredItems?.length > 0) {
			for (let i = 0; i < store.featuredItems.length; i++) {
				itemsPromise.push(getDoc(doc(db, `items/${store.featuredItems[i]}`)));
			}
		}

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

	if (store) {
		await loadItems(store);
		return (
			<div className={`${gabaritoFont.className}`}>
				<header className="">
					<div className="navbar bg-base-100">
						<div className="flex-1">
							<img
								src={
									store.logo
										? store.logo.small
										: "/mtaabizz_icon_monochrome.svg"
								}
								className="max-h-8"
								alt="Store Lofo"
							/>
							<p className=" px-4">{store.name}</p>
							<SearchBar></SearchBar>
						</div>

						<div className="flex-none">
							<ul className="menu menu-horizontal px-1">
								<li>
									<a>Link</a>
								</li>
								<li>
									<details>
										<summary>Parent</summary>
										<ul className="bg-base-100 rounded-t-none p-2">
											<li>
												<a>Link 1</a>
											</li>
											<li>
												<a>Link 2</a>
											</li>
										</ul>
									</details>
								</li>
							</ul>
						</div>
					</div>
					<div className="pwejar w-full p-3 text-center text-slate-300">
						<h1 className="capitalize">
							Welcome to <span className="text-yellow-500">{store.name}</span>{" "}
							online 🤗
						</h1>
					</div>
				</header>
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
						<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 p-4">
							{store.folders?.map((folder, index) => {
								return <FolderComponent key={index} folder={folder} />;
							})}
							{items?.map((item, index) => {
								return <ItemComponent key={index} item={item} />;
							})}
							<InfiniteScroll store={store}></InfiniteScroll>
						</div>
					</div>
				</main>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Error 404</h1>
			</div>
		);
	}
}
