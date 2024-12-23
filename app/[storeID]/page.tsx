/* eslint-disable @next/next/no-img-element */
import localFont from "next/font/local";
import React from "react";
import { Store } from "../app.interface";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/clientApp";
import SearchBar from "../components/SearchBar";
import MapComponent from "../components/Map";
type Params = Promise<{ storeID: string }>;
const gabaritoFont = localFont({
	src: "../fonts/Gabarito-VariableFont_wght.ttf",
	variable: "--font-geist-mono",
});
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

	return (
		<div className={`background ms:p-2 md:p-4 ${gabaritoFont.className}`}>
			<div className="relative">
				<div className="w-full">
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
					<main className="sm:grid sm:grid-cols-[25%_75%] ">
						<div className="">
							<div className="mapHolder">
								{store.contacts.position && (
									<MapComponent store={store}></MapComponent>
								)}
							</div>
						</div>
						<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"></div>
					</main>
				</div>
			</div>
		</div>
	);
}
