import { EightChar, SixtyCycle } from 'tyme4ts';

type ZhuData = {
  天干: string;
  地支: string;
};

type RelationInfo = {
  柱: string;
  [key: string]: any;
};

type Relation = {
  [zhu: string]: {
    天干: { [key: string]: RelationInfo[] };
    地支: { [key: string]: RelationInfo[] };
    [key: string]: any; // 如拱、双冲、双合等
  };
};

function addToRelation(target: { [key: string]: RelationInfo[] }, relation_type: string, info: RelationInfo) {
  if (!target[relation_type]) {
    target[relation_type] = [];
  }
  target[relation_type].push(info);
}

function buildZhuItem(sixtyCycle: SixtyCycle) {
  return {
    天干: sixtyCycle.getHeavenStem().toString(),
    地支: sixtyCycle.getEarthBranch().toString(),
  };
}

export function getRelation(eightChar: EightChar) {
  const zhuObject = {
    年: buildZhuItem(eightChar.getYear()),
    月: buildZhuItem(eightChar.getMonth()),
    日: buildZhuItem(eightChar.getDay()),
    时: buildZhuItem(eightChar.getHour()),
  };
  return calculateRelation(zhuObject);
}

function calculateRelation(zhuObject: { [zhu in '年' | '月' | '日' | '时']: ZhuData }): Relation {
  const relation: Relation = {};

  // 初始化
  for (const zhu in zhuObject) {
    relation[zhu] = {
      天干: {},
      地支: {},
    };
  }

  for (const zhu1 in zhuObject) {
    const data1 = zhuObject[zhu1];
    const seen_combinations = new Set<string>();

    for (const zhu2 in zhuObject) {
      if (zhu1 === zhu2) continue;
      const data2 = zhuObject[zhu2];

      // 天干冲
      const gan_chong_result = getGanChong(data1['天干'], data2['天干']);
      if (gan_chong_result) {
        addToRelation(relation[zhu1]['天干'], '冲', {
          柱: zhu2,
          知识点: `${data1['天干']}${data2['天干']}相${gan_chong_result}`,
        });
      }
      // 天干合
      const gan_he_result = getGanHe(data1['天干'], data2['天干']);
      if (gan_he_result) {
        addToRelation(relation[zhu1]['天干'], '合', {
          柱: zhu2,
          知识点: `${data1['天干']}${data2['天干']}合${gan_he_result}`,
          元素: gan_he_result,
        });
      }
      // 地支冲
      const zhi_chong_result = getZhiChong(data1['地支'], data2['地支']);
      if (zhi_chong_result) {
        addToRelation(relation[zhu1]['地支'], '冲', {
          柱: zhu2,
          知识点: `${data1['地支']}${data2['地支']}相${zhi_chong_result}`,
        });
      }
      // 地支害
      const zhi_hai_result = getZhiHai(data1['地支'], data2['地支']);
      if (zhi_hai_result) {
        addToRelation(relation[zhu1]['地支'], '害', {
          柱: zhu2,
          知识点: `${data1['地支']}${data2['地支']}
                                      相${zhi_hai_result}`,
          元素: zhi_hai_result,
        });
      }
      // 地支暗合
      const zhi_anhe_result = getZhiAnHe(data1['地支'], data2['地支']);
      if (zhi_anhe_result) {
        addToRelation(relation[zhu1]['地支'], '暗合', {
          柱: zhu2,
          知识点: `${data1['地支']}${data2['地支']}${zhi_anhe_result}`,
          元素: zhi_anhe_result,
        });
      }
      // 地支合
      const zhi_he_result = getZhiHe(data1['地支'], data2['地支']);
      if (zhi_he_result) {
        addToRelation(relation[zhu1]['地支'], '合', {
          柱: zhu2,
          知识点: `${data1['地支']}${data2['地支']}合${zhi_he_result}`,
          元素: zhi_he_result,
        });
      }
      // 地支刑（二元）
      const zhi_xing_result = getZhiXing(data1['地支'], data2['地支']);
      if (zhi_xing_result) {
        addToRelation(relation[zhu1]['地支'], '刑', {
          柱: zhu2,
          知识点: `${data1['地支']}${data2['地支']}相${zhi_xing_result}`,
        });
      }

      let sanhe_flag = false;
      // 三合、三会、三刑
      for (const zhu3 in zhuObject) {
        if (zhu3 === zhu1 || zhu3 === zhu2) continue;
        const data3 = zhuObject[zhu3];

        // 构建三柱组合标识（不可重复）
        const combinationKey = [zhu1, zhu2, zhu3].sort().join('_');
        if (seen_combinations.has(combinationKey)) continue;

        // 三合
        const sanhe_result = getSanHe([data1['地支'], data2['地支'], data3['地支']]);
        if (sanhe_result) {
          addToRelation(relation[zhu1]['地支'], '三合', {
            柱: zhu2 + zhu3,
            柱1: zhu2,
            柱2: zhu3,
            知识点: `${data1['地支']}${data2['地支']}${data3['地支']}三合${sanhe_result}`,
            元素: sanhe_result,
          });
          seen_combinations.add(combinationKey);
          sanhe_flag = true;
        }
        // 三会
        const sanhui_result = getSanHui([data1['地支'], data2['地支'], data3['地支']]);
        if (sanhui_result) {
          addToRelation(relation[zhu1]['地支'], '三会', {
            柱: zhu2 + zhu3,
            柱1: zhu2,
            柱2: zhu3,
            知识点: `${data1['地支']}${data2['地支']}${data3['地支']}三会${sanhui_result}`,
            元素: sanhui_result,
          });
          seen_combinations.add(combinationKey);
        }
        // 三刑
        const sanxing_result = getSanXing([data1['地支'], data2['地支'], data3['地支']]);
        if (sanxing_result) {
          addToRelation(relation[zhu1]['地支'], '三刑', {
            柱: zhu2 + zhu3,
            柱1: zhu2,
            柱2: zhu3,
            知识点: `${data1['地支']}${data2['地支']}${data3['地支']}三刑`,
          });
          seen_combinations.add(combinationKey);
        }
      }

      // 半三合
      if (!sanhe_flag) {
        const half_sanhe_result = getHalfSanHe(data1['地支'], data2['地支']);
        if (half_sanhe_result) {
          addToRelation(relation[zhu1]['地支'], '半合', {
            柱: zhu2,
            知识点: `${data1['地支']}${data2['地支']}半合${half_sanhe_result}`,
            元素: half_sanhe_result,
          });
        }
      }

      // 拱与夹
      if (data1['天干'] === data2['天干']) {
        const gong_jia_result = getGongJia(data1['天干'], data1['地支'], data2['天干'], data2['地支']);
        if (gong_jia_result) {
          relation[zhu1]['拱'] = {
            柱: zhu2,
            拱: gong_jia_result,
            知识点: `${zhu1}${zhu2}拱${gong_jia_result}`,
          };
        }
      }
    }
  }

  // 进阶：双合/双冲之类
  for (const zhu in relation) {
    const data = relation[zhu];
    const gan_chong = data['天干']['冲'] || [];
    const zhi_chong = data['地支']['冲'] || [];
    for (const gan_relation of gan_chong) {
      for (const zhi_relation of zhi_chong) {
        if (zhi_relation['柱'] === gan_relation['柱']) {
          if (!relation[zhu]['双冲']) {
            relation[zhu]['双冲'] = [];
          }
          relation[zhu]['双冲'].push({
            柱: gan_relation['柱'],
            知识点: `${zhu}与${gan_relation['柱']}双冲`,
          });
        }
      }
    }

    const gan_he = data['天干']['合'] || [];
    const zhi_he = data['地支']['合'] || [];
    for (const gan_relation of gan_he) {
      for (const zhi_relation of zhi_he) {
        if (zhi_relation['柱'] === gan_relation['柱']) {
          if (!relation[zhu]['双合']) {
            relation[zhu]['双合'] = [];
          }
          relation[zhu]['双合'].push({
            柱: gan_relation['柱'],
            知识点: `${zhu}与${gan_relation['柱']}双合`,
          });
        }
      }
    }
  }

  return relation;
}

////////////////////////////////////////////////天干相冲////////////////////////////////////////////////
const GAN_CHONG = {
  甲庚: '冲',
  乙辛: '冲',
  丙壬: '冲',
  丁癸: '冲',

  庚甲: '冲',
  辛乙: '冲',
  壬丙: '冲',
  癸丁: '冲',

  甲戊: '尅',
  乙己: '尅',
  丙庚: '尅',
  丁辛: '尅',
  戊壬: '尅',
  己癸: '尅',

  戊甲: '尅',
  己乙: '尅',
  庚丙: '尅',
  辛丁: '尅',
  壬戊: '尅',
  癸己: '尅',
};

// 返回两个天干相冲结果，没有相冲关系返回undefined
function getGanChong(gan1: string, gan2: string) {
  const joined = gan1 + gan2;
  if (GAN_CHONG[joined]) {
    return GAN_CHONG[joined];
  }
}

////////////////////////////////////////////////天干五合////////////////////////////////////////////////
const GAN_WUHE = {
  甲己: '土',
  乙庚: '金',
  丙辛: '水',
  丁壬: '木',
  戊癸: '火',
  己甲: '土',
  庚乙: '金',
  辛丙: '水',
  壬丁: '木',
  癸戊: '火',
};

// 返回两个天干相合结果，没有相合关系返回undefined
function getGanHe(gan1: string, gan2: string) {
  const gan_str = gan1 + gan2;
  if (GAN_WUHE[gan_str]) {
    return GAN_WUHE[gan_str];
  }
}

////////////////////////////////////////////////地支相冲////////////////////////////////////////////////
const ZHI_CHONG = {
  子午: '冲',
  丑未: '冲',
  寅申: '冲',
  卯酉: '冲',
  辰戌: '冲',
  巳亥: '冲',
  午子: '冲',
  未丑: '冲',
  申寅: '冲',
  酉卯: '冲',
  戌辰: '冲',
  亥巳: '冲',
};

function getZhiChong(zhi1: string, zhi2: string) {
  const zhi_str = zhi1 + zhi2;
  if (ZHI_CHONG[zhi_str]) {
    return ZHI_CHONG[zhi_str];
  }
}

////////////////////////////////////////////////地支相害（穿）////////////////////////////////////////////////
const HAI_CHONG = {
  子未: '害',
  丑午: '害',
  寅巳: '害',
  卯辰: '害',
  申亥: '害',
  酉戌: '害',
  未子: '害',
  午丑: '害',
  巳寅: '害',
  辰卯: '害',
  亥申: '害',
  戌酉: '害',
};

function getZhiHai(zhi1: string, zhi2: string) {
  const zhi_str = zhi1 + zhi2;
  if (HAI_CHONG['zhi_str']) {
    return HAI_CHONG[zhi_str];
  }
}

////////////////////////////////////////////////地支暗合////////////////////////////////////////////////
const ZHI_ANHE = {
  寅丑: '暗合',
  午亥: '暗合',
  卯申: '暗合',
  丑寅: '暗合',
  亥午: '暗合',
  申卯: '暗合',
};

function getZhiAnHe(zhi1: string, zhi2: string) {
  const zhi_str = zhi1 + zhi2;
  if (ZHI_ANHE['zhi_str']) {
    return ZHI_ANHE['zhi_str'];
  }
}

////////////////////////////////////////////////地支六合////////////////////////////////////////////////
const ZHI_LIUHE = {
  子丑: '土',
  寅亥: '木',
  卯戌: '火',
  辰酉: '金',
  巳申: '水',
  午未: '火',
  丑子: '土',
  亥寅: '木',
  戌卯: '火',
  酉辰: '金',
  申巳: '水',
  未午: '火',
};

function getZhiHe(zhi1: string, zhi2: string) {
  const zhi_str = zhi1 + zhi2;
  if (ZHI_LIUHE['zhi_str']) {
    return ZHI_LIUHE['zhi_str'];
  }
}

////////////////////////////////////////////////地支自刑////////////////////////////////////////////////
const ZHI_XING = {
  子卯: '刑',
  卯子: '刑',
  辰辰: '刑',
  午午: '刑',
  酉酉: '刑',
  亥亥: '刑',
};

function getZhiXing(zhi1, zhi2) {
  const zhi_str = zhi1 + zhi2;
  if (ZHI_XING['zhi_str']) {
    return ZHI_XING['zhi_str'];
  }
}

////////////////////////////////////////////////地支三合////////////////////////////////////////////////
const ZHI_SANHE: { [key: string]: string } = {
  申子辰: '水',
  寅午戌: '火',
  巳酉丑: '金',
  亥卯未: '木',
};

// 判断是否三合局，如果是，返回三合局所代表的五行
function getSanHe(zhiTriad: string[]) {
  // 将输入的地支三元素组合转为Set，去重
  const zhiTriadSet = new Set(zhiTriad);

  // 如果长度不等于3，说明有重复地支，不符合三合局
  if (zhiTriadSet.size !== 3) {
    return;
  }

  // 遍历所有的三合局规则
  for (const sanhe in ZHI_SANHE) {
    const sanheSet = new Set(sanhe.split(''));
    // 如果集合完全匹配，则符合三合局
    if (zhiTriadSet.size === sanheSet.size && [...zhiTriadSet].every((zhi) => sanheSet.has(zhi))) {
      return ZHI_SANHE[sanhe];
    }
  }
}

////////////////////////////////////////////////地支三会////////////////////////////////////////////////
const ZHI_SANHUI: { [key: string]: string } = {
  寅卯辰: '木',
  巳午未: '火',
  申酉戌: '金',
  亥子丑: '水',
};

// 判断是否三会局，如果是，返回三会局所代表的五行
function getSanHui(zhiTriad: string[]) {
  // 去重
  const zhiTriadSet = new Set(zhiTriad);

  // 长度不等于3，不符合三会局
  if (zhiTriadSet.size !== 3) {
    return;
  }

  // 遍历所有的三会局规则
  for (const sanhui in ZHI_SANHUI) {
    const sanhuiSet = new Set(sanhui.split(''));
    // 集合完全匹配
    if (zhiTriadSet.size === sanhuiSet.size && [...zhiTriadSet].every((zhi) => sanhuiSet.has(zhi))) {
      return ZHI_SANHUI[sanhui];
    }
  }
}

////////////////////////////////////////////////地支三刑////////////////////////////////////////////////
const ZHI_SAN_XING: { [key: string]: string } = {
  寅巳申: '寅巳申三刑',
  丑未戌: '丑未戌三刑',
};

// 判断是否三刑，如果是，返回三刑的说明，否则返回 false
function getSanXing(zhiTriad: string[]): string | undefined {
  // 去重
  const zhiTriadSet = new Set(zhiTriad);

  // 如果长度不等于3，说明有重复地支，不符合三刑局
  if (zhiTriadSet.size !== 3) {
    return;
  }

  // 遍历所有的三刑局规则
  for (const sanxing in ZHI_SAN_XING) {
    const sanxingSet = new Set(sanxing.split(''));
    // 完全匹配，符合三刑局
    if (zhiTriadSet.size === sanxingSet.size && [...zhiTriadSet].every((zhi) => sanxingSet.has(zhi))) {
      return ZHI_SAN_XING[sanxing];
    }
  }
}

////////////////////////////////////////////////地支半合////////////////////////////////////////////////
const HALF_SANHE: { [key: string]: string } = {
  申子: '水',
  子辰: '水',
  寅午: '火',
  午戌: '火',
  巳酉: '金',
  酉丑: '金',
  亥卯: '木',
  卯未: '木',
  子申: '水',
  辰子: '水',
  午寅: '火',
  戌午: '火',
  酉巳: '金',
  丑酉: '金',
  卯亥: '木',
  未卯: '木',
};

// 判断是否地支半三合，如果是返回半合结果，否则返回 false
function getHalfSanHe(zhi1: string, zhi2: string): string | false {
  const zhiStr = zhi1 + zhi2;
  if (zhiStr in HALF_SANHE) {
    return HALF_SANHE[zhiStr];
  } else {
    return false;
  }
}

////////////////////////////////////////////////拱夹////////////////////////////////////////////////
// 地支顺序表
const ZHI_ORDER: string[] = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];

// 判断天干地支是否符合拱、夹关系
function getGongJia(gan1: string, zhi1: string, gan2: string, zhi2: string): string | false {
  // 天干必须相同
  if (gan1 !== gan2) {
    return false;
  }

  // 拱规则：三合
  for (const group of Object.keys(ZHI_SANHE)) {
    if (group.includes(zhi1) && group.includes(zhi2)) {
      const [head, middle, tail] = group.split('');
      if ((zhi1 === head && zhi2 === tail) || (zhi1 === tail && zhi2 === head)) {
        return middle;
      }
    }
  }

  // 拱规则：三会
  for (const group of Object.keys(ZHI_SANHUI)) {
    if (group.includes(zhi1) && group.includes(zhi2)) {
      const [head, middle, tail] = group.split('');
      if ((zhi1 === head && zhi2 === tail) || (zhi1 === tail && zhi2 === head)) {
        return middle;
      }
    }
  }

  // 夹规则：顺序隔位
  const idx1 = ZHI_ORDER.indexOf(zhi1);
  const idx2 = ZHI_ORDER.indexOf(zhi2);

  if (idx1 !== -1 && idx2 !== -1) {
    const diff = Math.abs(idx1 - idx2);
    // 差为2，正常夹
    if (diff === 2) {
      const middle_zhi = ZHI_ORDER[(Math.min(idx1, idx2) + 1) % ZHI_ORDER.length];
      return middle_zhi;
    }
    // 数组边界：12-2=10，环形夹
    if (diff === 10) {
      const middle_zhi = ZHI_ORDER[(Math.max(idx1, idx2) + 1) % ZHI_ORDER.length];
      return middle_zhi;
    }
  }

  return false;
}
