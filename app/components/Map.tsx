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
				style={{ width: "100%", height: "40vh" }}
				defaultCenter={{
					lat: store.contacts.position!.latitude,
					lng: store.contacts.position!.longitude,
				}}
				defaultZoom={14}
				gestureHandling={"greedy"}
				mapId={"kjdskfjs"}
			>
				<AdvancedMarker
					position={{
						lat: store.contacts.position!.latitude,
						lng: store.contacts.position!.longitude,
					}}
				>
					<div className="rounded triangle  h-full pwejar  ">
						<div className="p-1">
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
								<strong>{store.name}</strong>
							</div>
						</div>
					</div>
				</AdvancedMarker>
			</Map>
		</APIProvider>
	);
}
