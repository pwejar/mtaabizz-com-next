import React from "react";
import { Folder } from "../app.interface";

export default function FolderComponent(props: { folder: Folder }) {
	const folder = props.folder;
	return (
		<div className="p-2">
			<svg viewBox="0 0 72 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					id="Vector"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M2.1516 0.860401H23.6624C24.6782 0.860401 25.4649 1.455 25.5092 2.1798L25.8803 8.2591L64.4812 8.2192C65.1337 8.2062 65.6006 8.2727 65.6598 8.8957V46.0963C65.6598 46.8216 64.6349 47.4157 63.6197 47.4157H2.1516C1.1359 47.4157 0.304901 46.822 0.304901 46.0963V2.1798C0.304901 1.4541 1.1359 0.860401 2.1516 0.860401V0.860401Z"
					fill="#3e2d44"
				/>
			</svg>
			<div className="folderText">
				<p>
					<b>{folder.name}</b>
				</p>
			</div>
		</div>
	);
}
