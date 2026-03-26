import { lib, game, ui, get, ai, _status } from "./lib/utils.js";

export async function precontent(config, pack) {
	/**
	 * 加载卡牌模块
	 * @param { string } module
	 * @param { string } name
	 * @returns { Promise<boolean> }
	 */
	async function loadModule(module, name) {
		try {
			await import(`./card/${module}.js`);
			lib.translate[`${module}_card_config`] = name;
			return true;
		} catch (err) {
			console.error(`『民间卡牌』扩展加载"${name}"模块失败: `, err);
			return false;
		}
	}

	// 根据配置加载各模块
	const modules = [];

	if (config.minjianjiben) {
		modules.push(loadModule('basic', '民间基本'));
	}
	if (config.minjianjinnang) {
		modules.push(loadModule('trick', '民间锦囊'));
	}
	if (config.minjianwuqi) {
		modules.push(loadModule('weapon', '民间武器'));
	}
	if (config.minjianzhuangbei) {
		modules.push(loadModule('equip', '民间装备'));
	}
	if (config.changjing) {
		modules.push(loadModule('scene', '场景卡牌'));
	}

	await Promise.all(modules);
}
