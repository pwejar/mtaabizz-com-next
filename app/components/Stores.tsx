import { collection, query, where, getDocs } from "firebase/firestore";
import { Store } from "../app.interface";
import db from "../firebase/clientApp";
import StoreComponent from "./Store";

let stores: Store[] | null = null;

const fetchData = async () => {
	const collectionRef = collection(db, "stores");
	const collectionQuery = query(collectionRef, where("verified", "==", true));

	try {
		const querySnapshot = await getDocs(collectionQuery);
		stores = querySnapshot.docs.map((doc) => ({
			...(doc.data() as Store),
			id: doc.id,
		}));
		console.log(stores);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
export default async function Stores() {
	await fetchData();
	return (
		<div className=" grid md:grid-cols-2 lg:grid-cols-4 sm:p-4">
			{stores?.map((store, index) => {
				return <StoreComponent key={index} store={store} />;
			})}
		</div>
	);
}
