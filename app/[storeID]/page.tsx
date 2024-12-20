/* eslint-disable @next/next/no-img-element */
import localFont from "next/font/local";
import React from "react";
import { Store } from "../app.interface";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/clientApp";
import SearchBar from "../components/SearchBar";
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
					<header className="navbar bg-base-100">
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
							<p className="p-2">{storeID}</p>
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
					</header>
				</div>
			</div>
		</div>
	);
}
