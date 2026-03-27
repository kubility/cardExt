import { lib, game, ui, get, ai, _status } from "../lib/utils.js";

const card = {
	bxyr_changbanpo: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		selectTarget: -1,
		filterTarget: true,
		chongzhu: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_changbanpo.jpg');
			lib.config.image_background = 'bxyr_changbanpo';
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'shu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'shu') return 1;
					return 0;
				},
			},
		}
	},
	bxyr_changbanqiao: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		selectTarget: -1,
		filterTarget: true,
		chongzhu: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_changbanqiao.jpg');
			lib.config.image_background = 'bxyr_changbanqiao';
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'shu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'shu') return 1;
					return 0;
				},
			},
		}
	},
	bxyr_chibi: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		selectTarget: -1,
		filterTarget: true,
		chongzhu: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_chibi.jpg');
			lib.config.image_background = 'bxyr_chibi';
			if ((event.target.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && event.target.identity == 'wei') && !event.target.isLinked()) {
				await event.target.link();
			}
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'wei') return -1;
					return 0;
				},
			},
		}
	},
	bxyr_fengyiting: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		selectTarget: -1,
		filterTarget: true,
		chongzhu: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_fengyiting.jpg');
			lib.config.image_background = 'bxyr_fengyiting';
			if ((event.target.group == 'qun' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && event.target.identity == 'qun') && event.target.sex == 'female') {
				await event.target.recover();
			}
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'qun' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'qun') return 1;
					return 0;
				},
			},
		}
	},
	bxyr_huarongdao: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		chongzhu: true,
		selectTarget: -1,
		filterTarget: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_huarongdao.jpg');
			lib.config.image_background = 'bxyr_huarongdao';
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'wei') return 2;
					return 0;
				},
			},
		}
	},
	bxyr_julu: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		chongzhu: true,
		selectTarget: -1,
		filterTarget: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_julu.jpg');
			lib.config.image_background = 'bxyr_julu';
			if ((event.target.group == 'qun' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && event.target.identity == 'qun')) {
				await event.target.draw(2);
			}
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'qun' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'qun') return 2;
					return 0;
				},
			},
		}
	},
	bxyr_shangfanggu: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		chongzhu: true,
		selectTarget: -1,
		filterTarget: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_shangfanggu.jpg');
			lib.config.image_background = 'bxyr_shangfanggu';
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'wei') return 1;
					return 0;
				},
			},
		}
	},
	bxyr_tanxi: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		chongzhu: true,
		selectTarget: -1,
		filterTarget: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_tanxi.jpg');
			lib.config.image_background = 'bxyr_tanxi';
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'shu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'shu') return 1;
					return 0;
				},
			},
		}
	},
	bxyr_tongquetai: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		chongzhu: true,
		selectTarget: -1,
		filterTarget: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_tongquetai.jpg');
			lib.config.image_background = 'bxyr_tongquetai';
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'wu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'wu') return -1;
					return 0;
				},
			},
		}
	},
	bxyr_xiaoyaojin: {
		audio: true,
		fullskin: true,
		type: 'changjing',
		enable: true,
		chongzhu: true,
		selectTarget: -1,
		filterTarget: true,
		content: async function (event, trigger, player) {
			ui.background.setBackgroundImage('extension/民间卡牌/image/card/scene/bxyr_xiaoyaojin.jpg');
			lib.config.image_background = 'bxyr_xiaoyaojin';
		},
		ai: {
			basic: {
				order: 10,
				value: 4,
				useful: 1,
			},
			result: {
				target: function (player, target) {
					if (target.group == 'wu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'wu') return -1;
					return 0;
				},
			},
		}
	}
};

const skill = {
	_bxyr_changbanqiao: {
		mod: {
			globalFrom: function (from, to, distance) {
				if (lib.config.image_background == 'bxyr_changbanqiao' && (from.group == 'wei' && to.group == 'shu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && from.identity == 'wei' && to.identity == 'shu')) return distance + 1;
			},
		}
	},
	_bxyr_changbanpo: {
		trigger: { player: 'useCard' },
		forced: true,
		popup: false,
		priority: 10,
		filter: function (event, player) {
			if (lib.config.image_background != 'bxyr_changbanpo') return false;
			return event.card.name == 'sha' && (player.group == 'shu' && event.targets && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'shu' && event.targets);
		},
		content: async function (event, trigger, player) {
			for (let i = 0; i < trigger.targets.length; i++) {
				if (trigger.targets[i].group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && trigger.targets[i].identity == 'wei') {
					player.addTempSkill('unequip', 'shaAfter');
				}
			}
		},
		mod: {
			targetEnabled: function (card, player, target, now) {
				if (lib.config.image_background == 'bxyr_changbanpo' && (target.group == 'wu' && player.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && target.identity == 'wu' && player.identity == 'wei')) {
					if (card.name == 'wanjian') return false;
				}
			}
		}
	},
	_bxyr_chibi: {
		trigger: { source: 'damageBefore' },
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (lib.config.image_background != 'bxyr_chibi') return false;
			return (player.group == 'wu' && event.player.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'wu' && event.player.identity == 'wei') && event.card && get.color(event.card) == 'red';
		},
		content: async function (event, trigger, player) {
			trigger.nature = 'fire';
		}
	},
	_bxyr_fengyiting: {
		trigger: { source: 'damageBegin' },
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (lib.config.image_background != 'bxyr_fengyiting') return false;
			return (player.group == 'qun' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'qun') && event.card && event.card.name == 'juedou' && player != event.player;
		},
		content: async function (event, trigger, player) {
			trigger.num++;
		}
	},
	_bxyr_huarongdao: {
		mod: {
			targetEnabled: function (card, player, target, now) {
				if (lib.config.image_background == 'bxyr_huarongdao' && (player.group == 'shu' && target.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'shu' && target.identity == 'wei') && (target.hp < player.hp || target.hp == 1)) {
					if (card.name == 'sha' || card.name == 'juedou') return false;
				}
			}
		}
	},
	_bxyr_julu: {
		enable: ['chooseToRespond'],
		filter: function (event, player) {
			return lib.config.image_background == 'bxyr_julu' && (player.group == 'qun' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'qun');
		},
		filterCard: function (card) {
			return get.suit(card) == 'heart';
		},
		viewAs: { name: 'shan' },
		viewAsFilter: function (player) {
			if (!player.num('h', { suit: 'heart' })) return false;
		},
		prompt: '将一张红桃牌当闪打出',
		check: function () { return 1 },
		ai: {
			respondShan: true,
			skillTagFilter: function (player) {
				if (!player.num('h', { suit: 'heart' })) return false;
			},
			result: {
				target: function (card, player, target, current) {
					if (get.tag(card, 'respondShan') && current < 0) return 0.6
				}
			}
		}
	},
	_bxyr_shangfanggu: {
		trigger: { source: 'damageBefore' },
		forced: true,
		popup: false,
		priority: -1,
		filter: function (event, player) {
			if (lib.config.image_background != 'bxyr_shangfanggu') return false;
			return (player.group == 'shu' && event.player.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'shu' && event.player.identity == 'wei') && event.nature == 'fire';
		},
		content: async function (event, trigger, player) {
			const result = await trigger.player.judge(function (card) {
				if (get.color(card) == 'red') return 1;
				return 0;
			});
			if (result.bool) {
				trigger.num++;
			} else {
				trigger.cancel();

			}
		}
	},
	_bxyr_shangfanggu2: {
		trigger: { source: 'damageBefore' },
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (lib.config.image_background != 'bxyr_shangfanggu') return false;
			return (player.group == 'shu' && event.player.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'shu' && event.player.identity == 'wei') && event.card && get.color(event.card) == 'red';
		},
		content: async function (event, trigger, player) {
			trigger.nature = 'fire';
		}
	},
	_bxyr_tanxi: {
		mod: {
			globalFrom: function (from, to, distance) {
				if (lib.config.image_background == 'bxyr_tanxi' && (from.group == 'qun' && to.group == 'shu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && from.identity == 'qun' && to.identity == 'shu')) return distance + 1;
			},
			targetEnabled: function (card, player, target, now) {
				if (lib.config.image_background == 'bxyr_tanxi' && target.num('e', { name: 'dilu' })) {
					if (card.name == 'sha') return false;
				}
			}
		}
	},
	//铜雀台
	_bxyr_tongquetai: {
		trigger: { player: 'shaBegin' },
		forced: true,
		popup: false,
		filter: function (event, player) {
			return lib.config.image_background == 'bxyr_tongquetai' && !event.directHit && event.target.sex == 'female' && (event.target.group == 'wu' && player.group == 'wei' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && event.target.identity == 'wu' && player.identity == 'wei');
		},
		content: function () {
			"step 0"
			var next = trigger.target.chooseToRespond({ name: 'shan' });
			next.autochoose = lib.filter.autoRespondShan;
			next.ai = function (card) {
				if (trigger.target.num('h', 'shan') > 1) {
					return ai.get.unuseful2(card);
				}
				return -1;
			};
			"step 1"
			if (result.bool == false) {
				trigger.untrigger();
				trigger.directHit = true;
			}
		},
		mod: {
			suit: function (card, suit) {
				if (lib.config.image_background == 'bxyr_tongquetai' && (_status.event.player.group == 'wu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && _status.event.player.identity == 'wu')) return 'club';
			}
		}
	},
	_bxyr_xiaoyaojin: {
		trigger: { source: 'damageBegin' },
		forced: true,
		popup: false,
		filter: function (event, player) {
			if (lib.config.image_background != 'bxyr_xiaoyaojin') return false;
			return (player.group == 'wei' && event.player.group == 'wu' && lib.config.mode != 'guozhan' || lib.config.mode == 'guozhan' && player.identity == 'wei' && event.player.identity == 'wu') && event.card && event.card.name == 'sha' && player.num('h') < event.player.num('h');
		},
		content: async function (event, trigger, player) {
			trigger.num++;
		}
	}
};

const translate = {
	changjing: '场景',
	bxyr_changbanqiao_bg: '桥',
	bxyr_changbanpo_bg: '坡',
	bxyr_chibi_bg: '壁',
	bxyr_fengyiting_bg: '亭',
	bxyr_huarongdao_bg: '道',
	bxyr_julu_bg: '鹿',
	bxyr_shangfanggu_bg: '谷',
	bxyr_tanxi_bg: '檀',
	bxyr_tongquetai_bg: '台',
	bxyr_xiaoyaojin_bg: '津',
	bxyr_changbanqiao: '长坂桥',
	bxyr_changbanpo: '长坂坡',
	bxyr_chibi: '赤壁',
	bxyr_fengyiting: '凤仪亭',
	bxyr_huarongdao: '华容道',
	bxyr_julu: '巨鹿',
	bxyr_shangfanggu: '上方谷',
	bxyr_tanxi: '檀溪',
	bxyr_tongquetai: '铜雀台',
	bxyr_xiaoyaojin: '逍遥津',
	_bxyr_julu: '巨鹿',
	_bxyr_shangfanggu: '上方谷',
	bxyr_changbanqiao_info: '<span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，场上魏势力计算与蜀势力角色的距离+1',
	bxyr_changbanpo_info: '<span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，场上蜀国势力的角色，对魏势力的角色使用【杀】时，无视防具<br><span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，魏国势力的角色使用【万箭齐发】，不能指定蜀势力角色作为目标',
	bxyr_chibi_info: '横置所有未横置的魏势力角色的武将牌<br><span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，吴势力角色使用红色牌对魏势力角色造成的伤害均视为火焰伤害',
	bxyr_fengyiting_info: '所有群势力女性角色回复1点体力<br><span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，群势力角色使用【决斗】对其他角色造成伤害时，该伤害+1',
	bxyr_huarongdao_info: '<span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，蜀势力角色不能对体力值小于自己或体力值为1的魏势力角色使用【杀】和【决斗】',
	bxyr_julu_info: '群势力角色各摸两张牌<br><span class="bluetext" style="color:#FF6633">场景技' + '</span>，群势力角色可以将红桃手牌当作【闪】使用或打出',
	bxyr_shangfanggu_info: '<span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，当蜀势力角色对魏势力角色造成火焰伤害时，该魏势力角色须进行一次判定，若结果为红色，则该伤害+1；若结果为黑色，防止该伤害<br><span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，蜀势力角色使用红色牌对魏势力角色造成的伤害均视为火焰伤害',
	bxyr_tanxi_info: '<span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，场上群势力计算与蜀势力角色的距离+1<br><span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，装备着【的卢】的角色不能成为【杀】的目标',
	bxyr_tongquetai_info: '<span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，吴势力角色的所有牌均视为梅花牌<br><span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，当魏势力角色使用杀指定一名吴势力女性角色为目标后，该角色需要依次使用两张【闪】才能抵消',
	bxyr_xiaoyaojin_info: '<span class="bluetext" style="color:#FF6633">场景技' + '</span>，锁定技，一名魏势力角色使用【杀】对吴势力角色造成伤害时，若其手牌数小于该吴势力角色，此伤害+1',
};

const suits = ['heart', 'diamond', 'club', 'spade'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const cardNames = [
	'bxyr_tanxi',
	'bxyr_julu',
	'bxyr_chibi',
	'bxyr_changbanpo',
	'bxyr_shangfanggu',
	'bxyr_tongquetai',
	'bxyr_fengyiting',
	'bxyr_changbanqiao',
	'bxyr_huarongdao',
	'bxyr_xiaoyaojin',
];
const cardNature = {
	bxyr_chibi: 'fire',
};

const list = [];
for (const name of cardNames) {
	const count = Math.floor(Math.random() * 5) + 1;
	for (let i = 0; i < count; i++) {
		const suit = suits[Math.floor(Math.random() * 4)];
		const number = numbers[Math.floor(Math.random() * 13)];
		const item = [suit, number, name];
		if (cardNature[name]) item.push(cardNature[name]);
		list.push(item);
	}
}

// 为卡牌设置图片路径
for (let i in card) {
	if (!card[i].cardimage) {
		card[i].image = "ext:民间卡牌/image/card/scene/" + i + ".png";
	}
}

game.import("card", function () {
	return {
		name: "scene",
		card,
		skill,
		translate,
		list,
	};
});
