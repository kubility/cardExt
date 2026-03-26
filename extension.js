import { lib, game, ui, get, ai, _status } from "./lib/utils.js";
import { precontent } from "./precontent.js";
import config from "./lib/config.js";

const extensionInfo = await lib.init.promises.json(`${lib.assetURL}extension/民间卡牌/info.json`);
let extensionPackage = {
	name: "民间卡牌",
	config,
	help: {},
	package: {},
	precontent,
	files: { character: [], card: [], skill: [], audio: [] },
};

Object.keys(extensionInfo)
	.filter(key => key !== "name")
	.forEach(key => {
		extensionPackage.package[key] = extensionInfo[key];
	});

export let type = "extension";
export default extensionPackage;
