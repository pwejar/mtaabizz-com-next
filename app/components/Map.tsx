/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Store } from "../app.interface";
export default function MapComponent(props: { store: Store }) {
	const store = props.store;
	return (
		<APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS}`}>
			<Map
				style={{ width: "100%", height: "30vh" }}
				defaultCenter={{
					lat: store.contacts.position!.latitude,
					lng: store.contacts.position!.longitude,
				}}
				defaultZoom={14}
				gestureHandling={"greedy"}
				mapId={store.id}
			>
				<AdvancedMarker
					position={{
						lat: store.contacts.position!.latitude,
						lng: store.contacts.position!.longitude,
					}}
				>
					<div className="h-full  p-2 ">
						<div className="p-1 pwejar rounded triangle">
							<img
								src={
									store.logo
										? store.logo.small
										: "/mtaabizz_icon_monochrome.svg"
								}
								alt="store logo"
								className="max-w-6 max-h-6 m-auto"
							/>
							<div className="triangle p-1 text-yellow-500 justify-items-center m-auto">
								<p>
									<strong className="textExtraSmall ">{store.name}</strong>
								</p>
							</div>
						</div>
					</div>
				</AdvancedMarker>
			</Map>
		</APIProvider>
	);
}
