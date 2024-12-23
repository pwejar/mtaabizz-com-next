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
							<h1>Welcome to {store.name} online 🤗</h1>
						</div>
					</header>
					<main className="grid grid-cols-2">
						<div className="mainContent">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ut
							commodi cum. Necessitatibus id doloremque molestias! Minus
							quibusdam, tempore aliquid nesciunt id, provident quaerat nam
							iure, alias adipisci est saepe! Delectus maxime neque placeat
							minus. Unde repudiandae odio, dolores nisi quae maxime, culpa
							consequuntur quam sunt delectus quis ipsam nostrum corrupti
							reprehenderit iure a molestiae, libero accusantium deleniti nihil
							nam ullam ratione totam quia? Quasi recusandae quas non delectus
							molestiae excepturi deserunt aperiam optio, expedita nam
							voluptates tenetur natus? Similique est aliquid omnis excepturi
							eligendi eaque distinctio odit corporis debitis ipsam. Doloribus
							ab odit quod eius ipsa? Totam deleniti quibusdam possimus ipsum
							architecto, voluptate iste veniam accusamus dolorum autem
							voluptatibus, molestias quia libero unde quas adipisci quam
							reprehenderit! Quos, illo. Maxime enim fuga aliquam eos expedita.
							Earum incidunt odit sapiente repellendus voluptatibus, quas
							assumenda rerum corporis quibusdam optio et eaque dolor quos
							perferendis fuga ex porro. Sapiente minus assumenda consequuntur
							libero ratione, iusto delectus itaque reprehenderit in quis,
							quidem et incidunt nemo fugiat est qui dolor iste? Vel quaerat
							voluptatem eos consequuntur quibusdam sapiente necessitatibus
							laboriosam ipsum facilis, suscipit non fuga, molestiae eligendi a,
							unde hic perferendis consectetur dolore nostrum sunt quod
							molestias. Quasi hic alias numquam provident quam vel molestiae
							iure eum magnam id, blanditiis nulla eveniet! Fugiat nostrum
							accusamus unde a totam, explicabo quos distinctio at suscipit
							veniam in dolor laboriosam sunt repellendus similique hic repellat
							expedita modi! Odio sequi numquam tenetur! Reiciendis, earum!
							Reprehenderit numquam alias, ad labore quae autem ducimus sunt
							dolorem expedita quos eveniet, voluptas, quasi perferendis
							nesciunt libero itaque quidem. Enim, doloribus, quaerat unde quo
							itaque at incidunt ipsa harum tempora quae a debitis quia dolorum.
							Deleniti ullam, minima quidem est rem provident impedit velit iure
							voluptatibus, inventore aperiam corrupti ipsum! Ullam, vitae?
							Provident libero eveniet assumenda doloremque quod perspiciatis
							reiciendis quam incidunt optio.
						</div>
						<div className="">
							<div className="mapHolder">
								{store.contacts.position && (
									<MapComponent store={store}></MapComponent>
								)}
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
