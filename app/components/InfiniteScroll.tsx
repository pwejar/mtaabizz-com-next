"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { Store, Item } from "../app.interface";
import db from "../firebase/clientApp";
import ItemComponent from "./Item";
export default function InfiniteScroll(props: { store: Store }) {
	const [items, setItems] = useState<Item[]>([]);
	const [itemFetching, setItemFetching] = useState(false);
	const { store } = props;
	let count: number = 68;
	const loadItems = async (store: Store) => {
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
		count += 68;
		console.log(items);
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
				setItemFetching(true);
				console.log("fetching items");
				loadItems(store);
				setTimeout(() => {
					setItemFetching(false);
				}, 1000);
			}
		}
	};
	useEffect(() => {
		console.log("InfiniteScroll");
		const handleDebouncedScroll = debounce(() => handleScroll(), 200);
		window.addEventListener("scroll", handleDebouncedScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<>
			{items?.map((item, index) => {
				return <ItemComponent key={index} item={item} />;
			})}
		</>
	);
}
