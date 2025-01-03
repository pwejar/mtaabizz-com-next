/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Store } from "../app.interface";
import db from "../firebase/clientApp";

import { collection, query, where, getDocs } from "firebase/firestore";

import FolderComponent from "../components/Folder";
import Link from "next/link";

type Params = Promise<{ storeID: string }>;

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

	if (store) {
		return (
			<div>
				<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 p-4">
					{store.folders?.map((folder, index) => {
						return (
							<div key={index}>
								<Link
									href={{
										pathname: `/${store.userName}/items`,
										query: { folderIndex: index },
									}}
								>
									<FolderComponent folder={folder} />
								</Link>
							</div>
						);
					})}
				</div>
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
