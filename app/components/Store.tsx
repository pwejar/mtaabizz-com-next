"use client"
import Image from "next/image";
import { Store, Item } from "../app.interface";
import { collection, query, where, limit, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../firebase/clientApp";

const items: Item[] = []
const loadItems = async (store: Store) => {
    let count: number = 3;
    console.log(store)
    if(store.featuredItems && store.featuredItems?.length>0){
        store.featuredItems.forEach((itemID: string) => {
          getItem(itemID)
        });
        count -= store.featuredItems.length
    }
    if(count>0 && store.id) {
        const collectionRef = collection(db,'items')
        const collectionQuery = query(collectionRef, where('public', '==', true),where('storeID', '==', store.id),limit(count))
        const collectionSnapShot = await getDocs(collectionQuery)
        const itemsHolder = collectionSnapShot.docs.map(doc => ({id: doc.id, ...doc.data() as Item})) ; 
        console.log(itemsHolder)
        itemsHolder.forEach(item => {
            items.push(item)
        });
    }
};
  
const  getItem = async (itemId:string) =>{
    const docRef = doc(db, `items/${itemId}`);
    const itemSnap = await getDoc(docRef)
    if (itemSnap.exists()) {
      const item = itemSnap.data() as Item;
      // Use the itemData here
      items.push(item)
    } else {
      // Handle the case where no document was found
      console.log("Document does not exist");
    }
  }
export default function StoreComponent(props: {store: Store}) {
    const {store} = props
    loadItems(store)
    return (
        <div className="p-4 ">
            <div className="rounded h-full bg-light  bg-slate-100">
                <div className="flex items-center p-1">
                    <Image
                        src={store.logo? store.logo.small: '/mtaabizz_icon_monochrome.svg'}
                        alt="pwejar hub logo"
                        height={48}
                        width={42}
                        />
                    <div className="p-1 justify-items-center m-auto">
                        <strong>{store.name}</strong>
                        {/* <span>Type: </span> */}
                    </div>
                </div>
                <div className="item">
                    {items?.map((item, index) => {
                              return <div key={index} >
                               <p> {item.name}</p>
                              </div>
                          })}
                </div>
            </div>
        </div>
    );
}