/* eslint-disable @next/next/no-img-element */
import localFont from "next/font/local";
import React from "react";
import { Store } from "../app.interface";
import db from "../firebase/clientApp";
import SearchBar from "../components/SearchBar";

import { collection, query, where, getDocs } from "firebase/firestore";

import MainComponent from "./Main";
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

	if (store) {
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
								alt="Store Logo"
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
				<MainComponent store={store}></MainComponent>
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
