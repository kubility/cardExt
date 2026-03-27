import { lib, game, ui, get, ai, _status } from "../lib/utils.js";

const card = {
	bxyr_baihuaqun: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		onLose: function (event, player) {
			player.draw(2);
		},
		skills: ['bxyr_baihuaqun'],
		ai: {
			basic: {
				equipValue: 11
			}
		}
	},
	bxyr_jiaoliao: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_jiaoliao'],
		ai: {
			basic: {
				order: 1,
				equipValue: function (card, player) {
					var equip2 = player.get('e', '2');
					if (equip2 && equip2.name == 'bxyr_jiaoliao') return -20;
					return 7;
				}
			}
		},
	},
	bxyr_liulongyuling: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		onLose: function (event, player) {
			for (let i = 0; i < game.dead.length; i++) {
				if (game.dead[i].group == player.group) {
					player.storage.bxyr_liulongyuling++;
				}
			}
			if (player.hasSkill('jun_huitian')) {
				player.logSkill('jun_huitian');
				player.draw(Math.max(player.storage.bxyr_liulongyuling + 1, 2));
			}
			if (!player.hasSkill('jun_huitian')) {
				player.draw(Math.max(player.storage.bxyr_liulongyuling, 1));
			}
			player.storage.bxyr_liulongyuling = 0;
		},
		onEquip: function (event, player) {
			player.storage.bxyr_liulongyuling = 0;
		},
		skills: ['bxyr_liulongyuling'],
		ai: {
			basic: {
				equipValue: 7
			}
		}
	},
	bxyr_mingguangkai: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_mingguangkai'],
		ai: {
			basic: {
				equipValue: 10
			}
		}
	},
	bxyr_mowangguiguan: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		onLose: function (event, player) {
			player.loseHp(3);
		},
		skills: ['bxyr_mowangguiguan'],
		tag: {
			loseHp: 3,
		},
		ai: {
			order: 9.5,
			basic: {
				equipValue: function (card, player) {
					var equip2 = player.get('e', '2');
					if (equip2 && equip2.name == 'bxyr_mowangguiguan') return 20;
					if (player.hp <= 1 || player.hp >= 5) return 15;
					return 0;
				}
			}
		},
	},
	bxyr_paoluo: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_paoluo'],
		ai: {
			basic: {
				equipValue: 7
			}
		},
	},
	bxyr_qixingpao: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_qixingpao'],
		ai: {
			basic: {
				equipValue: 7
			}
		},
	},
	bxyr_shengguangbaiyi: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_shengguangbaiyi'],
		ai: {
			basic: {
				equipValue: 7
			}
		}
	},
	bxyr_tianjiqin: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		onLose: function (event, player) {
			player.removeSkill('bxyr_tianjiqin2');
			player.removeSkill('bxyr_tianjiqin3');
		},
		skills: ['bxyr_tianjiqin'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	bxyr_wolongsilunche: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_wolongsilunche'],
		ai: {
			basic: {
				equipValue: 7
			},
		},
	},
	bxyr_xieshenmianju: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_xieshenmianju'],
		ai: {
			order: 9.5,
			basic: {
				equipValue: function (card, player) {
					if (!player.isTurnedOver()) return 6;
					if (player.isTurnedOver()) return -10;
					return 0;
				}
			}
		},
	},
	bxyr_xuanwuhubi: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		onEquip: function (event, player) {
			player.gainMaxHp();
		},
		onLose: function (event, player) {
			player.loseMaxHp();
		},
		enable: function (card, player) {
			return !player.isZhu;
		},
		ai: {
			order: 9.5,
			basic: {
				equipValue: function (card, player) {
					if (player.hasSkill('zaiqi') || player.hasSkill('yinghun') || player.hasSkill('miji') || player.hasSkill('shangshi') || player.hasSkill('ganlu') || player.hasSkill('quji') || player.hasSkill('xueji')) return 7;
					return 4;
				}
			}
		},
	},
	bxyr_zhejidun: {
		fullskin: true,
		type: "equip",
		subtype: "equip2",
		skills: ['bxyr_zhejidun'],
		ai: {
			basic: {
				equipValue: 4
			},
		},
	},
	bxyr_benlei: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip3',
		distance: { globalTo: 1 },
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	bxyr_hanxue: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip4',
		distance: { globalFrom: -1 },
		ai: {
			basic: {
				equipValue: 5
			}
		}
	},
	bxyr_houzi: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip4',
		skills: ['bxyr_houzi'],
		distance: { globalFrom: -1 },
		ai: {
			basic: {
				equipValue: 8
			}
		}
	},
	bxyr_qingnangshu: {
		fullskin: true,
		type: "equip",
		subtype: "equip5",
		skills: ['bxyr_qingnangshu'],
		ai: {
			basic: {
				equipValue: 7.5
			}
		},
	},
	bxyr_tongquefu: {
		fullskin: true,
		type: "equip",
		subtype: "equip5",
		skills: ['bxyr_tongquefu'],
		ai: {
			basic: {
				equipValue: function (card, player) {
					let num = 0;
					for (let i = 0; i < game.players.length; i++) {
						const target = game.players[i];
						if (player === target) continue;
						const attitude = ai.get.attitude(target, player);
						if (attitude > 0) continue;
						if (target.sex !== player.sex) {
							num += 2;
						} else {
							num--;
						}
					}
					return 4 + num;
				}
			},
		},
	},
	bxyr_toukui: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip2',
		skills: ['bxyr_toukui'],
		ai: {
			basic: {
				equipValue: 8
			}
		}
	},
	bxyr_guan: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip2',
		skills: ['bxyr_guan'],
		ai: {
			basic: {
				equipValue: 6
			}
		}
	},
	bxyr_adou: {
		fullskin: true,
		type: 'equip',
		subtype: 'equip2',
		skills: ['bxyr_adou'],
		ai: {
			basic: {
				equipValue: 5
			}
		}
	}
};

const skill = {
	bxyr_baihuaqun: {
		trigger: { player: 'damageBefore' },
		filter: function (event, player) {
			if (event.source && event.source.num('s', 'unequip')) return false;
			if (event.player.hp == 1) return true;
		},
		forced: true,
		audio: 'ext:民间卡牌/audio/card/equip:1',
		audioname: 'bxyr_baihuaqun',
		content: async function (event, trigger, player) {
			trigger.cancel();
		},
		ai: {
			nofire: true,
			nothunder: true,
			nodamage: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, 'damage') && target.hp == 1) return 'zerotarget';
				}
			},
		},
	},
	bxyr_liulongyuling: {
		trigger: { player: 'damageBefore' },
		filter: function (event, player) {
			if (event.source && event.source.num('s', 'unequip')) return;
			if (event.player.hp == 1 && !event.nature) return true;
		},
		forced: true,
		priority: -10,
		content: async function (event, trigger, player) {
			trigger.num--;
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (!get.tag(card, 'natureDamage') && target.hp == 1) return [0, 0];
				}
			},
		},
	},
	bxyr_jiaoliao: {
		group: ['bxyr_jiaoliao2'],
		mod: {
			cardEnabled: function (card, player) {
				if (card.name == 'tao' || card.name == 'jiu') return false;
			}
		}
	},
	bxyr_jiaoliao2: {
		trigger: { player: 'phaseUseBefore' },
		filter: function (event, player) {
			return player.num('e', { name: 'bxyr_jiasuo' }) && player.num('e', { name: 'bxyr_jiaoliao' });
		},
		forced: true,
		content: async function (event, trigger, player) {
			trigger.cancel();
		}
	},
	_bxyr_jiaoliao: {
		enable: "phaseUse",
		filter: function (event, player) {
			return player.num('h', { name: 'bxyr_jiaoliao' }) > 0;
		},
		filterCard: function (card) {
			return card.name == 'bxyr_jiaoliao';
		},
		check: function (card) {
			return 100 - ai.get.value(card);
		},
		filterTarget: function (card, player, target) {
			return !target.get('e', '2');
		},
		content: async function (event, trigger, player) {
			await event.targets[0].equip(event.cards[0]);
		},
		discard: false,
		prepare: function (cards, player, targets) {
			player.$give(cards, targets[0], false);
		},
		ai: {
			basic: {
				order: 10,
			},
			result: {
				target: function (player, target) {
					var equip1 = player.get('e', '1');
					if (equip1 && equip1.name == 'bxyr_jiasuo') return -20;
					return -1
				}
			}
		}
	},
	_bxyr_jiaoliao2: {
	},
	bxyr_mingguangkai: {
		trigger: {
			player: "phaseBegin",
		},
		content: async function (event, trigger, player) {
			const result = await player.judge(function (card) {
				if (get.suit(card) == 'heart' && player.hp < player.maxHp) return 1;
				return 0;
			});
			if (result.bool) {
				await player.recover();
			}
		}
	},
	bxyr_mowangguiguan: {
		trigger: { player: 'damageBefore' },
		forced: true,
		content: async function (event, trigger, player) {
			trigger.cancel();
		},
		ai: {
			nofire: true,
			nothunder: true,
			nodamage: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, 'damage')) return [0, 0];
					if (player == target && get.subtype(card) == 'equip2') {
						if (ai.get.equipValue(card) <= 15) return 0;
					}
				}
			},
		},
	},
	bxyr_paoluo: {
		trigger: {
			player: "damageBefore",
		},
		audio: true,
		direct: true,
		content: async function (event, trigger, player) {
			const result = await player.chooseTarget('是否发动【炮烙】？', function (card, player, target) {
				return get.distance(player, target, 'attack') <= 1;
			}).set('ai', function (target) {
				const player = _status.event.player;
				if (ai.get.attitude(_status.event.player, target) > 0) return 0;
				if (ai.get.attitude(_status.event.player, target) < 0 && target.num('h') <= 5) return 7 - target.num('h');
				return 1;
			}).forResult();
			if (!result.bool) {
				event.finish();
				return;
			}
			const target = result.targets[0];
			event.target = target;
			player.line(target, 'green');
			player.logSkill('bxyr_paoluo', target);
			const result2 = await target.chooseCard('h', '【炮烙】<br><br><div class="text center">交给' + get.translation(player) + '一张手牌，或失去一点体力。', function (card, player, target) {
				return true;
			}).set('ai', function (card) {
				if (ai.get.attitude(_status.event.player, _status.event.getParent().player) > 0) {
					return 11 - ai.get.value(card);
				}
				if (ai.get.attitude(_status.event.player, _status.event.getParent().player) <= 0) {
					return 9 - ai.get.value(card);
				}
			}).forResult();
			if (result2.bool) {
				await player.gain(result2.cards);
				target.$give(result2.cards, player);
			}
			else {
				await target.loseHp();
			}
		}
	},
	bxyr_qixingpao: {
		trigger: {
			player: "damageBefore",
		},
		audio: 'ext:民间卡牌/audio/card/equip:1',
		audioname: 'bxyr_qixingpao',
		forced: true,
		filter: function (event) {
			return event.nature == 'thunder' || event.nature == 'fire' || event.nature == 'poison';
		},
		content: async function (event, trigger, player) {
			trigger.cancel();

			game.log(player, '免疫此伤害');
		},
		ai: {
			nofire: true,
			nothunder: true,
			nopoison: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, 'natureDamage')) return 'zerotarget';
					if (card.name == 'tiesuo') {
						return [0, 0];
					}
				}
			}
		}
	},
	bxyr_shengguangbaiyi: {
		trigger: {
			target: "shaBefore",
		},
		audio: 'ext:民间卡牌/audio/card/equip:1',
		audioname: 'bxyr_shengguangbaiyi',
		forced: true,
		filter: function (event, player) {
			return (event.card.name == 'sha' && get.color(event.card) == 'red' && !event.parent.player.num('s', 'unequip'))
		},
		content: async function (event, trigger, player) {
			trigger.cancel();
		},
		ai: {
			effect: {
				target: function (card, player) {
					var equip1 = player.get('e', '1');
					if (equip1 && equip1.name == 'qinggang') return 1;
					if (player.num('s', 'unequip')) return; if (card.name == 'sha' && get.color(card) == 'red') return 'zerotarget';

				}
			}
		},
		group: ['bxyr_shengguangbaiyi2']
	},
	bxyr_shengguangbaiyi2: {
		mod: {
			maxHandcard: function (player, num) {
				return num + 2;
			}
		}
	},
	bxyr_tianjiqin: {
		trigger: { target: 'shaBegin' },
		forced: true,
		silent: true,
		audio: false,
		popup: false,
		content: async function (event, trigger, player) {
			player.addTempSkill('bxyr_tianjiqin2');
			player.addTempSkill('bxyr_tianjiqin3');
		}
	},
	bxyr_tianjiqin2: {
		trigger: { player: 'damageBegin' },
		forced: true,
		popup: false,
		filter: function (event) {
			return event.card && (event.card.name == 'sha');
		},
		content: async function (event, trigger, player) {
			player.removeSkill('bxyr_tianjiqin2');
			player.removeSkill('bxyr_tianjiqin3');
		}
	},
	bxyr_tianjiqin3: {
		trigger: { target: 'shaEnd' },
		forced: true,
		filter: function (event, player) {
			return player.hasSkill('bxyr_tianjiqin2');
		},
		content: async function (event, trigger, player) {
			await player.recover();
			player.removeSkill('bxyr_tianjiqin2');
			player.removeSkill('bxyr_tianjiqin3');
		}
	},
	bxyr_wolongsilunche: {
		trigger: {
			target: "useCardToBefore",
		},
		forced: true,
		priority: 15,
		filter: function (event, player) {
			return (get.type(event.card) == 'trick' && get.color(event.card) == 'black');
		},
		content: async function (event, trigger, player) {
			game.log(player, '发动了卧龙四轮车，', trigger.card, '对', trigger.target, '失效');
			trigger.cancel();

		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.type(card) == 'trick' && get.color(card) == 'black') return 'zeroplayertarget';
				},
			},
		},
	},
	bxyr_xieshenmianju: {
		trigger: { player: 'turnOverBefore' },
		forced: true,
		audio: 'ext:民间卡牌/audio/card/equip:1',
		audioname: 'bxyr_xieshenmianju',
		content: async function (event, trigger, player) {
			trigger.cancel();

		},
		ai: {
			noturnOver: true,
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, 'turnOver')) return [0, 0];
				}
			}
		},
		group: ['bxyr_xieshenmianju2'],
	},
	bxyr_xieshenmianju2: {
		trigger: { player: 'damageBegin' },
		forced: true,
		audio: true,
		filter: function (event, player) {
			if (event.num <= 1) return false;
			if (event.parent.player.num('s', 'unequip')) return false;
			return true;
		},
		priority: -10,
		content: async function (event, trigger, player) {
			trigger.num--;
		}
	},
	_bxyr_xuanwuhubi: {
		enable: 'phaseUse',
		filter: function (event, player) {
			return player.isZhu && player.num('h', { name: 'bxyr_xuanwuhubi' });
		},
		content: async function (event, trigger, player) {
			const result = await player.chooseToRespond({ name: 'bxyr_xuanwuhubi' }, '玄武护臂：是否打出一张玄武护臂' + '令' + get.translation(player) + '回复一点体力。').set('ai', function (card) {
				return ai.get.recoverEffect(player);
			}).forResult();
			if (result.bool) {
				await player.recover();
			}
		},
		ai: {
			result: {
				player: function (player) {
					return ai.get.recoverEffect(player);
				}
			},
			order: 2.5
		}
	},
	bxyr_zhejidun: {
		trigger: {
			player: "damageEnd",
		},
		filter: function (event, player) {
			return (event.source != undefined);
		},
		check: function (event, player) {
			return (ai.get.attitude(player, event.source) <= 0);
		},
		content: async function (event, trigger, player) {
			await trigger.source.discard(trigger.source.get('e', { subtype: 'equip1' }));
		},
		ai: {
			result: {
				target: function (card, player, target) {
					if (player.hasSkill('jueqing')) return [1, -1];
					if (player.num('e', { subtype: 'equip1' }) > 0) return [1, 0, 0, -1.5];
				}
			}
		}
	},
	bxyr_houzi: {
		trigger: {
			global: "useCardToBegin",
		},
		audio: 'ext:民间卡牌/audio/card/equip:1',
		audioname: 'bxyr_houzi',
		filter: function (event, player) {
			const card = player.get('e', '4');
			if (card) {
				const name = card.name;
				if (event.card.name == 'tao' && event.player != player && name && name.indexOf('bxyr_houzi') != -1) return true;
			}
			return false;
		},
		check: function (event, player) {
			return ai.get.attitude(player, event.player) <= 0;
		},
		content: async function (event, trigger, player) {
			trigger.cancel();

			await player.discard(player.get('e', '4'));
			await player.gain(trigger.cards);
			player.$gain2(trigger.cards);
		}
	},
	bxyr_qingnangshu: {
		trigger: { player: 'phaseBegin' },
		forced: true,
		content: async function (event, trigger, player) {
			await player.recover();
		}
	},
	bxyr_tongquefu: {
		trigger: {
			target: "shaBefore",
		},
		forced: true,
		filter: function (event, player) {
			if (event.target.sex == 'male' && event.player.sex == 'female') return true;
			if (event.target.sex == 'female' && event.player.sex == 'male') return true;
			return false;
		},
		content: async function (event, trigger, player) {
			trigger.cancel();

		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (card.name === 'sha') {
						if (target.sex == 'male' && player.sex == 'female') return 'zeroplayertarget';
						if (target.sex == 'female' && player.sex == 'male') return 'zeroplayertarget';
					}

				},
			},
		},
	},
	bxyr_toukui: {
		trigger: { player: 'chooseToRespondBegin' },
		filter: function (event, player) {
			if (event.name != 'sha') return false;
			return true;
		},
		forced: true,
		content: async function (event, trigger, player) {
			event.filterCard = function (card, player) {
				return true;
			};
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					if (get.tag(card, 'respondSha')) return 1.5;
				}
			}
		}
	},
	bxyr_guan: {
		trigger: { target: 'shaBegin' },
		filter: function (event, player) {
			// 检查是否有距离为一的其他目标
			const otherTargets = game.filterPlayer(function (target) {
				return target != player && get.distance(player, target) == 1;
			});
			return otherTargets.length > 0 && player.num('h') > 0;
		},
		audio: true,
		check: function (event, player) {
			return player.num('h') > 0;
		},
		content: async function (event, trigger, player) {
			// 弃一张手牌
			const discardResult = await player.chooseToDiscard('是否弃置一张手牌转移目标？','h',true).forResult();
			if (discardResult.bool) {
				// 获取距离为一的其他目标
				const otherTargets = game.filterPlayer(function (target) {
					return target != player && get.distance(player, target) == 1;
				});

				if (otherTargets.length > 0) {
					// 选择新目标
					const targetResult = await player.chooseTarget('选择转移目标', true, function (card, player, target) {
						return otherTargets.includes(target);
					}).forResult();

					if (targetResult.bool && targetResult.targets.length > 0) {
						// 转移目标
						event.targets = [targetResult.targets[0]];
					}
				}
			}
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					// 降低被选中的概率
					if (get.tag(card, 'respondSha')) return 0.5;
				}
			}
		}
	},
	bxyr_adou: {
		onEquip: async function (event, player) {
			// 获得技能龙胆和冲阵
			player.addSkill('longdan');
			player.addSkill('chongzhen');
		},
		onLose: async function (event, player) {
			// 弃置所有手牌与装备牌
			await player.discard(player.get('he'));
			player.removeSkill('longdan');
			player.removeSkill('chongzhen');
			// 将乐不思蜀置于判定区
			var card = game.createCard("lebu");
			await player.addJudge(card);
		},
		ai: {
			effect: {
				target: function (card, player, target, current) {
					// 降低被选中的概率
					if (get.tag(card, 'respondSha')) return 0.5;
				}
			}
		}
	}

};

const translate = {
	bxyr_baihuaqun_bg: '裙',
	bxyr_baihuaqun: '百花裙',
	bxyr_jiaoliao_bg: '镣',
	_bxyr_jiaoliao: '脚镣',
	bxyr_jiaoliao: '脚镣',
	bxyr_jiaoliao2: '脚镣',
	bxyr_liulongyuling_bg: '留',
	bxyr_liulongyuling: '留龙玉令',
	bxyr_mingguangkai_bg: '光',
	bxyr_mingguangkai: '明光凯',
	bxyr_mowangguiguan_bg: '冠',
	bxyr_mowangguiguan: '魔王桂冠',
	bxyr_paoluo_bg: '炮',
	bxyr_paoluo: '炮烙',
	bxyr_qixingpao_bg: '袍',
	bxyr_qixingpao: '七星袍',
	bxyr_shengguangbaiyi_bg: '圣',
	bxyr_shengguangbaiyi: '圣光白衣',
	bxyr_tianjiqin_bg: '幾',
	bxyr_tianjiqin: '天机琴',
	bxyr_tianjiqin3: '天机琴',
	bxyr_wolongsilunche_bg: '卧',
	bxyr_wolongsilunche: '卧龙四轮车',
	bxyr_xieshenmianju_bg: '邪',
	bxyr_xieshenmianju: '邪神面具',
	bxyr_xuanwuhubi_bg: '玄',
	bxyr_xuanwuhubi: '玄武护臂',
	_bxyr_xuanwuhubi: '玄武护臂',
	bxyr_zhejidun_bg: '折',
	bxyr_zhejidun: '折戟盾',
	bxyr_benlei_bg: '+马',
	bxyr_benlei: '奔雷',
	bxyr_hanxue_bg: '-马',
	bxyr_hanxue: '汗血',
	bxyr_houzi_bg: '猴',
	bxyr_houzi: '猴子',
	bxyr_toukui: '头盔',
	bxyr_toukui_bg: '盔',
	bxyr_guan: '冠',
	bxyr_guan_bg: '冠',
	bxyr_guan_info: '当你成为【杀】的目标时，可以弃一张手牌，将此杀的目标转移给与你距离为一的另一个目标',
	bxyr_adou: '阿斗',
	bxyr_adou_bg: '斗',
	bxyr_adou_info: '装备此牌后，你立即获得技能龙胆和冲阵。当此装备失去、被弃置或替换时，你弃置所有手牌与装备牌，并将乐不思蜀置于你的判定区。',
	bxyr_toukui_info: '所有手牌都可以当【闪】使用',
	bxyr_houzi_info: '◆锁定技，当其他角色使用【桃】时，你可以弃置此牌并获得此牌',
	bxyr_qingnangshu_bg: '囊',
	bxyr_qingnangshu: '青囊书',
	bxyr_qingnangshu_info: '◆锁定技，每回合开始时，你可以恢复1点体力',
	bxyr_tongquefu_bg: '赋',
	bxyr_tongquefu: '铜雀赋',
	bxyr_tongquefu_info: '◆锁定技，当你成为异性角色使用【杀】的目标时，此【杀】对你无效',
	bxyr_baihuaqun_info: '◆锁定技，当你体力等于一时，任何伤害对你无效。当你失去装备区的【百花裙】时，你可以摸两张牌',
	bxyr_jiaoliao_info: '出牌阶段，你可以将其置于任意一名装备区没有防具的角色的装备区里。<br>当装备区里的【脚镣】被其他防具替换时，拥有者可以将其收为手牌。<br>◆锁定技，当你需要使用或打出【闪】时，需要连续打出或使用两张【闪】。<br>◆锁定技，若你同时装备【脚镣】，【枷锁】，跳过你的出牌阶段',
	bxyr_liulongyuling_info: '◆锁定技，你受到非属性伤害时若你的体力值为1，此伤害-1。<br>◆锁定技，当你失去装备区的【留龙玉令】时你摸x张牌（x为与你势力相同的已死亡角色数且至少为一）',
	bxyr_mingguangkai_info: '◆每个回合摸牌阶段前，你都可以进行一次判定，若为红桃，恢复一点血',
	bxyr_mowangguiguan_info: '锁定技，防止你受到的任何伤害，当你失去装备区的该牌时，你失去3点体力',
	bxyr_paoluo_info: '◆每当你受到伤害时，可选择攻击范围内的一名角色令其选择是否交给你一张手牌，若不给该角色失去一点体力',
	bxyr_qixingpao_info: '◆锁定技，所有属性伤害对你无效',
	bxyr_shengguangbaiyi_info: '◆锁定技，红色【杀】对你无效，你的手牌上限+2',
	bxyr_tianjiqin_info: '◆锁定技，当以你为目标的一张【杀】没有对你造成伤害后，你立即回复一点体力',
	bxyr_wolongsilunche_info: '◆锁定技，黑色的锦囊对你无效',
	bxyr_xieshenmianju_info: '◆锁定技，你每次受到大于等于2点伤害时，该伤害-1<br>◆锁定技，武将牌不能被翻面',
	bxyr_xuanwuhubi_info: '装备时体力上限+1，主公无法装备，但可以出牌阶段打出此牌，恢复1点体力',
	bxyr_zhejidun_info: '其他角色对你造成伤害后，可以让对方弃掉所装备的武器',
	bxyr_benlei_info: '其他角色计算与你的距离时，始终+1',
	bxyr_hanxue_info: '你计算与其他角色的距离，始终-1',

};

const suits = ['heart', 'diamond', 'club', 'spade'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const cardNames = [
	'bxyr_baihuaqun',
	'bxyr_jiaoliao',
	'bxyr_liulongyuling',
	'bxyr_mingguangkai',
	'bxyr_mowangguiguan',
	'bxyr_paoluo',
	'bxyr_qixingpao',
	'bxyr_shengguangbaiyi',
	'bxyr_tianjiqin',
	'bxyr_wolongsilunche',
	'bxyr_xieshenmianju',
	'bxyr_xuanwuhubi',
	'bxyr_zhejidun',
	'bxyr_benlei',
	'bxyr_hanxue',
	'bxyr_houzi',
	'bxyr_qingnangshu',
	'bxyr_tongquefu',
	'bxyr_toukui',
	'bxyr_guan',
	'bxyr_adou',
];
const cardNature = {};

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
		card[i].image = "ext:民间卡牌/image/card/equip/" + i + ".png";
	}
}

game.import("card", function () {
	return {
		name: "equip",
		card,
		skill,
		translate,
		list,
	};
});
