import { getDocs, query, collection, where } from "firebase/firestore";
import React from "react";
import { ReactNode } from "react";
import { Store } from "../app.interface";
import db from "../firebase/clientApp";
import Image from "next/image";
import localFont from "next/font/local";
import MapComponent from "../components/Map";

interface LayoutProps {
	children: ReactNode;
}
const gabaritoFont = localFont({
	src: "../fonts/Gabarito-VariableFont_wght.ttf",
	variable: "--font-geist-mono",
});
const Layout = async (props: { params: { storeID: string } } & LayoutProps) => {
	const { storeID } = props.params;
	const { children } = props;
	const querySnapshot = await getDocs(
		query(collection(db, "stores"), where("userName", "==", storeID))
	);
	const stores = querySnapshot.docs.map((doc) => ({
		...(doc.data() as Store),
		id: doc.id,
	}));
	const store = stores[0];
	return (
		<div className={`${gabaritoFont.className}`}>
			<header className="">
				<div className="navbar bg-base-100">
					<div className="flex-1">
						<Image
							src={
								store.logo ? store.logo.small : "/mtaabizz_icon_monochrome.svg"
							}
							className="max-h-8"
							alt="Store Logo"
							width={32} // Adjust width as needed
							height={32} // Adjust height as needed
						/>
						<p className=" px-4">{store.name}</p>
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
			<div className="sm:grid sm:grid-cols-[25%_75%] bg-slate-300 min-h-screen">
				<main className="">
					<div className="mapHolder">
						{store.contacts.position && (
							<MapComponent store={store}></MapComponent>
						)}
					</div>
				</main>
				<main>{children}</main>
			</div>
			<footer>
				<p>&copy; 2023 My Store</p>
			</footer>
		</div>
	);
};

export default Layout;
