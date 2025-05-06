import { EightChar } from 'tyme4ts';

// 各柱天干对月支
const SHEN_MAP_MONTHZHI_GAN: Record<string, Record<string, string>> = {
  天德贵人: {
    寅: '丁',
    卯: '申',
    辰: '壬',
    巳: '辛',
    午: '亥', // 疑似不合理
    未: '甲',
    申: '癸',
    酉: '寅', // 疑似不合理
    戌: '丙',
    亥: '乙',
    子: '巳',
    丑: '庚',
  },
  天德合: {
    寅: '壬',
    卯: '巳',
    辰: '丁',
    巳: '丙',
    午: '寅',
    未: '己',
    申: '戊',
    酉: '亥',
    戌: '辛',
    亥: '庚',
    子: '申',
    丑: '乙',
  },
  月德贵人: {
    寅: '丙',
    卯: '甲',
    辰: '壬',
    巳: '庚',
    午: '丙',
    未: '甲',
    申: '壬',
    酉: '庚',
    戌: '丙',
    亥: '甲',
    子: '壬',
    丑: '庚',
  },
  月德合: {
    寅: '辛',
    卯: '己',
    辰: '丁',
    巳: '乙',
    午: '辛',
    未: '己',
    申: '丁',
    酉: '乙',
    戌: '辛',
    亥: '己',
    子: '丁',
    丑: '乙',
  },
};

// 年日天干对各地支
const SHEN_MAP_YEARDAYGAN_ZHI: Record<string, Record<string, string>> = {
  天乙贵人: {
    甲: '丑未',
    乙: '子申',
    丙: '亥酉',
    丁: '亥酉',
    戊: '丑未',
    己: '子申',
    庚: '丑未',
    辛: '午寅',
    壬: '卯巳',
    癸: '卯巳',
  },
  太极贵人: {
    甲: '子午',
    乙: '子午',
    丙: '酉卯',
    丁: '酉卯',
    戊: '辰戌丑未',
    己: '辰戌丑未',
    庚: '寅卯',
    辛: '寅卯',
    壬: '巳申',
    癸: '巳申',
  },
  天厨贵人: {
    甲: '巳',
    乙: '午',
    丙: '巳',
    丁: '午',
    戊: '申',
    己: '酉',
    庚: '亥',
    辛: '子',
    壬: '寅',
    癸: '卯',
  },
  福星贵人: {
    甲: '寅子',
    乙: '丑亥',
    丙: '子寅',
    丁: '亥酉',
    戊: '申',
    己: '未',
    庚: '午',
    辛: '巳',
    壬: '辰',
    癸: '丑',
  },
  文昌贵人: {
    甲: '巳',
    乙: '午',
    丙: '申',
    丁: '酉',
    戊: '申',
    己: '酉',
    庚: '亥',
    辛: '子',
    壬: '寅',
    癸: '卯',
  },
  金舆: {
    甲: '辰',
    乙: '巳',
    丙: '未',
    丁: '申',
    戊: '未',
    己: '申',
    庚: '戌',
    辛: '亥',
    壬: '丑',
    癸: '寅',
  },
  国印: {
    甲: '戌',
    乙: '亥',
    丙: '丑',
    丁: '寅',
    戊: '丑',
    己: '寅',
    庚: '辰',
    辛: '巳',
    壬: '未',
    癸: '申',
  },
};

// 基于日干判断的神煞 (日干对各地支)
const SHEN_MAP_DAYGAN_ZHI = {
  禄神: {
    // 十干禄
    甲: '寅',
    乙: '卯',
    丙: '巳',
    丁: '午',
    戊: '巳',
    己: '午',
    庚: '申',
    辛: '酉',
    壬: '亥',
    癸: '子',
  },
  羊刃: {
    甲: '卯',
    乙: '寅',
    丙: '午',
    丁: '巳',
    戊: '午',
    己: '巳',
    庚: '酉',
    辛: '申',
    壬: '子',
    癸: '亥',
  },
  飞刃: {
    甲: '酉',
    乙: '申',
    丙: '子',
    丁: '亥',
    戊: '子', // 待确认
    己: '亥', // 待确认
    庚: '卯',
    辛: '寅',
    壬: '午',
    癸: '巳',
  },
  血刃: {
    // 疑似问题
    甲: '卯',
    乙: '辰',
    丙: '午',
    丁: '未',
    戊: '午',
    己: '未',
    庚: '酉',
    辛: '戌',
    壬: '子',
    癸: '丑',
  },
  流霞: {
    // 疑似问题
    甲: '酉',
    乙: '戌',
    丙: '未',
    丁: '申',
    戊: '巳',
    己: '午',
    庚: '辰',
    辛: '卯',
    壬: '亥',
    癸: '寅',
  },
  红艳: {
    甲: '午',
    乙: '午',
    丙: '寅',
    丁: '未',
    戊: '辰',
    己: '辰',
    庚: '戌',
    辛: '酉',
    壬: '子',
    癸: '申',
  },
};

// 年日支对各地支
const SHEN_MAP_YEARDAY_ZHI = {
  将星: {
    寅: '午',
    午: '午',
    戌: '午',
    申: '子',
    子: '子',
    辰: '子',
    亥: '卯',
    卯: '卯',
    未: '卯',
    巳: '酉',
    酉: '酉',
    丑: '酉',
  },
  华盖: {
    寅: '戌',
    午: '戌',
    戌: '戌',
    申: '辰',
    子: '辰',
    辰: '辰',
    亥: '未',
    卯: '未',
    未: '未',
    巳: '丑',
    酉: '丑',
    丑: '丑',
  },
  驿马: {
    寅: '申',
    午: '申',
    戌: '申',
    申: '寅',
    子: '寅',
    辰: '寅',
    亥: '巳',
    卯: '巳',
    未: '巳',
    巳: '亥',
    酉: '亥',
    丑: '亥',
  },
  劫煞: {
    寅: '亥',
    午: '亥',
    戌: '亥',
    申: '巳',
    子: '巳',
    辰: '巳',
    亥: '申',
    卯: '申',
    未: '申',
    巳: '寅',
    酉: '寅',
    丑: '寅',
  },
  亡神: {
    寅: '巳',
    午: '巳',
    戌: '巳',
    申: '亥',
    子: '亥',
    辰: '亥',
    亥: '寅',
    卯: '寅',
    未: '寅',
    巳: '申',
    酉: '申',
    丑: '申',
  },
  桃花: {
    // 年月柱: 内桃花, 日时柱：外桃花
    寅: '卯',
    午: '卯',
    戌: '卯',
    申: '酉',
    子: '酉',
    辰: '酉',
    亥: '子',
    卯: '子',
    未: '子',
    巳: '午',
    酉: '午',
    丑: '午',
  },
};

// 月支对各地支
const SHEN_MONTHZHI_ZHI = {
  天医星: {
    寅: '丑',
    卯: '寅',
    辰: '卯',
    巳: '辰',
    午: '巳',
    未: '午',
    申: '未',
    酉: '申',
    戌: '酉',
    亥: '戌',
    子: '亥',
    丑: '子',
  },
};

const SHEN_MAP_YEARZHI_ZHI = {
  灾煞: {
    // 白虎煞
    寅: '子',
    午: '子',
    戌: '子',
    申: '午',
    子: '午',
    辰: '午',
    亥: '酉',
    卯: '酉',
    未: '酉',
    巳: '卯',
    酉: '卯',
    丑: '卯',
  },
  孤辰: {
    寅: '巳',
    卯: '巳',
    辰: '巳',
    巳: '申',
    午: '申',
    未: '申',
    申: '亥',
    酉: '亥',
    戌: '亥',
    亥: '寅',
    子: '寅',
    丑: '寅',
  },
  寡宿: {
    寅: '丑',
    卯: '丑',
    辰: '丑',
    巳: '辰',
    午: '辰',
    未: '辰',
    申: '未',
    酉: '未',
    戌: '未',
    亥: '戌',
    子: '戌',
    丑: '戌',
  },
  红鸾: {
    子: '卯',
    丑: '寅',
    寅: '丑',
    卯: '子',
    辰: '亥',
    巳: '戌',
    午: '酉',
    未: '申',
    申: '未',
    酉: '午',
    戌: '巳',
    亥: '辰',
  },
  天喜: {
    子: '酉',
    丑: '申',
    寅: '未',
    卯: '午',
    辰: '巳',
    巳: '辰',
    午: '卯',
    未: '寅',
    申: '丑',
    酉: '子',
    戌: '亥',
    亥: '戌',
  },
  勾绞煞: {
    子: '卯',
    丑: '辰',
    寅: '巳',
    卯: '午',
    辰: '未',
    巳: '申',
    午: '酉',
    未: '戌',
    申: '亥',
    酉: '子',
    戌: '丑',
    亥: '寅',
  },
  丧门: {
    子: '寅',
    丑: '卯',
    寅: '辰',
    卯: '巳',
    辰: '午',
    巳: '未',
    午: '申',
    未: '酉',
    申: '戌',
    酉: '亥',
    戌: '子',
    亥: '丑',
  },
  吊客: {
    子: '戌',
    丑: '亥',
    寅: '子',
    卯: '丑',
    辰: '寅',
    巳: '卯',
    午: '辰',
    未: '巳',
    申: '午',
    酉: '未',
    戌: '申',
    亥: '酉',
  },
  披麻: {
    子: '酉',
    丑: '戌',
    寅: '亥',
    卯: '子',
    辰: '丑',
    巳: '寅',
    午: '卯',
    未: '辰',
    申: '巳',
    酉: '午',
    戌: '未',
    亥: '申',
  },
  披头: {
    子: '辰',
    丑: '卯',
    寅: '寅',
    卯: '丑',
    辰: '子',
    巳: '亥',
    午: '戌',
    未: '酉',
    申: '申',
    酉: '未',
    戌: '午',
    亥: '巳',
  },
  六厄: {
    寅: '酉',
    午: '酉',
    戌: '酉',
    申: '卯',
    子: '卯',
    辰: '卯',
    亥: '午',
    卯: '午',
    未: '午',
    巳: '子',
    酉: '子',
    丑: '子',
  },
};

// 根据日干看四柱
const SHEN_ZHU = {
  词馆: {
    庚寅: '甲',
    辛卯: '乙',
    乙巳: '丙',
    戊午: '丁',
    丁巳: '戊',
    庚午: '己',
    壬申: '庚',
    癸酉: '辛',
    癸亥: '壬',
    壬戌: '癸',
  },
};

// 禄命法，用看年干纳音和其他支
const SHEN_YEAR_GAN_NAYIN = {
  学堂: {
    金: '巳',
    木: '亥',
    水: '申',
    土: '申',
    火: '寅',
  },
};

// 拱禄
const GONG_LU = {
  癸亥: '癸丑',
  癸丑: '癸亥',
  丁巳: '丁未',
  己未: '己巳',
  戊辰: '戊午',
};

// 空亡
const KONG_WANG: Record<string, string> = {
  甲子: '戌亥',
  甲戌: '申酉',
  甲申: '午未',
  甲午: '辰巳',
  甲辰: '寅卯',
  甲寅: '子丑',
};

// 天罗地网（基于纳音判断）
const TIAN_LUO_DI_WANG = {
  火: '戌亥', // 天罗
  水: '辰巳', // 地网
};

// 隔角煞
const GEJIAO_SHA = {
  子: '寅',
  丑: '卯',
  寅: '辰',
  卯: '巳',
  辰: '午',
  巳: '未',
  午: '申',
  未: '酉',
  申: '戌',
  酉: '亥',
  戌: '子',
  亥: '丑',
};

// 童子煞
const TONGZI_SHA_MONTH = {
  寅卯辰: '丙子',
  巳午未: '卯未辰',
  申酉戌: '丙子',
  亥子丑: '卯未辰',
};

const TONGZI_SHA_YEAR_NAYIN = {
  金: '午卯',
  木: '午卯',
  水: '酉戌',
  火: '酉戌',
  土: '辰巳',
};

// 三奇贵人
const SANQI = ['甲戊庚', '乙丙丁', '壬癸辛'];

// 基于月支和日柱判断的神煞 (月支对日柱)
const SHEN_MONTHZHI_DAYZHU = {
  天转: {
    寅: '乙卯',
    卯: '乙卯',
    辰: '乙卯',
    巳: '丙午',
    午: '丙午',
    未: '丙午',
    申: '辛酉',
    酉: '辛酉',
    戌: '辛酉',
    亥: '壬子',
    子: '壬子',
    丑: '壬子',
  },
  地转: {
    寅: '辛卯',
    卯: '辛卯',
    辰: '辛卯',
    巳: '戊午',
    午: '戊午',
    未: '戊午',
    申: '癸酉',
    酉: '癸酉',
    戌: '癸酉',
    亥: '丙子',
    子: '丙子',
    丑: '丙子',
  },
};

// 基于日柱判断
const SHEN_DAY_ZHU = {
  十灵: ['甲辰', '乙亥', '丙辰', '丁酉', '戊午', '庚寅', '庚戌', '辛亥', '壬寅', '癸未'],
  六秀: ['丙午', '丁未', '戊子', '戊午', '己丑', '己未'],
  魁罡: ['戊戌', '壬辰', '庚戌', '庚辰'],
  八专: ['甲寅', '乙卯', '丁未', '戊戌', '己未', '庚申', '辛酉', '癸丑'],
  九丑: ['丁酉', '戊子', '戊午', '己卯', '己酉', '辛卯', '辛酉', '壬子', '壬午'],
  四废: ['庚申', '辛酉', '壬子', '癸亥', '甲寅', '乙卯', '丙午', '丁巳'],
  阴差阳错: ['丙子', '丙午', '丁丑', '丁未', '戊寅', '戊申', '辛卯', '辛酉', '壬辰', '壬戌', '癸巳', '癸亥'],
  孤鸾: ['甲寅', '乙巳', '丙午', '丁巳', '戊午', '戊申', '辛亥', '壬子'],
  十恶大败: ['甲辰', '乙巳', '壬申', '丙申', '丁亥', '庚辰', '戊戌', '癸亥', '辛巳', '己丑'],
  金神: ['乙丑', '己巳', '癸酉'],
};

// 基于月支判断的神煞 (月支对各天干)
const DEXIU = {
  寅午戌: { 德: '丙丁', 秀: '戊癸' },
  申子辰: { 德: '壬癸戊己', 秀: '丙辛甲己' },
  亥卯未: { 德: '甲乙', 秀: '丁壬' },
  巳酉丑: { 德: '庚辛', 秀: '乙庚' },
};

// 天赦星
const TIAN_SHE_XING: Record<string, string> = {
  甲午: '巳午未',
  戊寅: '寅卯辰',
  戊申: '申卯酉',
  甲子: '亥子丑',
};

// 元辰，需区分男女属性
const YUAN_CHEN = {
  阳男阴女: {
    子: '未',
    丑: '申',
    寅: '酉',
    卯: '戌',
    辰: '亥',
    巳: '子',
    午: '丑',
    未: '寅',
    申: '卯',
    酉: '辰',
    戌: '巳',
    亥: '午',
  },
  阴男阳女: {
    子: '巳',
    丑: '午',
    寅: '未',
    卯: '申',
    辰: '酉',
    巳: '戌',
    午: '亥',
    未: '子',
    申: '丑',
    酉: '寅',
    戌: '卯',
    亥: '辰',
  },
};

// 天干阴阳判断
const YIN_YANG = { 阳: '甲丙戊庚壬', 阴: '乙丁己辛癸' };

const getBrancheNames = (eightChar: EightChar) => {
  return [
    eightChar.getYear().getEarthBranch().toString(),
    eightChar.getMonth().getEarthBranch().toString(),
    eightChar.getDay().getEarthBranch().toString(),
    eightChar.getHour().getEarthBranch().toString(),
  ];
};

const getStemNames = (eightChar: EightChar) => {
  return [
    eightChar.getYear().getHeavenStem().toString(),
    eightChar.getMonth().getHeavenStem().toString(),
    eightChar.getDay().getHeavenStem().toString(),
    eightChar.getHour().getHeavenStem().toString(),
  ];
};

export function buildGods(eightChar: EightChar, gender: 0 | 1 = 1) {
  const gods: string[][] = [[], [], [], []]; // 年月日时
  const zhiArray = getBrancheNames(eightChar);
  const ganArray = getStemNames(eightChar);
  const yearZhi = zhiArray[0];
  const monthZhi = zhiArray[1];
  const dayZhi = zhiArray[2];
  const timeZhi = zhiArray[3];
  const yearGan = ganArray[0];
  const monthGan = ganArray[1];
  const dayGan = ganArray[2];
  const timeGan = ganArray[3];
  const dayZhu = `${dayGan}${dayZhi}`;
  const timeZhu = `${timeGan}${timeZhi}`;

  for (const [godName, map] of Object.entries(SHEN_MAP_MONTHZHI_GAN)) {
    for (const [index, stemName] of Object.entries(ganArray)) {
      if (map[monthZhi].includes(stemName)) {
        gods[index].push(godName);
      }
    }
  }

  for (const [godName, map] of Object.entries(SHEN_MAP_YEARDAYGAN_ZHI)) {
    for (const [index, branchName] of Object.entries(zhiArray)) {
      if (map[yearGan].includes(branchName) || map[dayGan].includes(branchName)) {
        gods[index].push(godName);
      }
    }
  }

  for (const [godName, map] of Object.entries(SHEN_MAP_DAYGAN_ZHI)) {
    for (const [index, branchName] of Object.entries(zhiArray)) {
      if (map[dayGan].includes(branchName)) {
        gods[index].push(godName);
      }
    }
  }

  for (const [godName, map] of Object.entries(SHEN_MAP_YEARDAY_ZHI)) {
    const yearMatch = map[yearZhi];
    const dayMatch = map[dayZhi];
    for (const [index, zhi] of Object.entries(zhiArray)) {
      if ((zhi === yearMatch && index !== '0') || (zhi === dayMatch && index !== '2')) {
        gods[index].push(godName);
      }
    }
  }

  for (const [godName, map] of Object.entries(SHEN_MONTHZHI_ZHI)) {
    for (const [index, zhi] of Object.entries(zhiArray)) {
      if (index !== '1' && zhi === map[monthZhi]) {
        gods[index].push(godName);
      }
    }
  }

  for (const [godName, map] of Object.entries(SHEN_MAP_YEARZHI_ZHI)) {
    for (const [index, zhi] of Object.entries(zhiArray)) {
      if (index !== '0' && zhi === map[yearZhi]) {
        gods[index].push(godName);
      }
    }
  }

  for (const [godName, map] of Object.entries(SHEN_ZHU)) {
    for (const index of ganArray) {
      const ganzhi = `${ganArray[index]}${zhiArray[index]}`;
      if (index !== '0' && map[ganzhi] === yearGan) {
        gods[index].push(godName);
      }
    }
  }

  const yearSound = eightChar.getYear().getSound().toString();
  for (const [godName, map] of Object.entries(SHEN_YEAR_GAN_NAYIN)) {
    for (const [wuxing, matchZhi] of Object.entries(map)) {
      if (yearSound.includes(wuxing)) {
        for (const [index, zhi] of Object.entries(zhiArray)) {
          if (index !== '0' && zhi === matchZhi) {
            gods[index].push(godName);
          }
        }
      }
    }
  }

  for (const [godName, map] of Object.entries(SHEN_MONTHZHI_DAYZHU)) {
    for (const [matchMonth, matchZhu] of Object.entries(map)) {
      if (monthZhi === matchMonth && matchZhu === dayZhu) {
        gods[2].push(godName);
      }
    }
  }

  for (const [godName, values] of Object.entries(SHEN_DAY_ZHU)) {
    if (values.includes(dayZhu)) {
      gods[2].push(godName);
    }
  }

  if (SANQI.includes(yearGan + monthGan + dayGan)) {
    gods[2].push('三奇贵人');
  }
  if (SANQI.includes(monthGan + dayGan + timeGan)) {
    gods[3].push('三奇贵人');
  }

  if (TIAN_SHE_XING[dayZhu]?.includes(monthZhi)) {
    gods[1].push('天赦星');
  }

  if (GONG_LU[dayZhu] === timeZhu) {
    gods[3].push('拱禄');
  }

  // 德秀贵人
  for (const [monthRule, dexiuDict] of Object.entries(DEXIU)) {
    if (monthRule.includes(monthZhi)) {
      let isXiu = false;
      for (const [zhu1, gan1] of Object.entries(ganArray)) {
        for (const [zhu2, gan2] of Object.entries(ganArray)) {
          if (dexiuDict['德'].includes(gan1) && dexiuDict['秀'].includes(gan2) && zhu1 !== zhu2) {
            gods[zhu1].push('德秀贵人');
            gods[zhu2].push('德秀贵人');
          }
        }
      }
    }
  }

  // 空亡
  const dayXun = eightChar.getDay().getTen().toString();
  for (const [index, zhi] of Object.entries(zhiArray)) {
    if (index !== '2' && KONG_WANG[dayXun].includes(zhi)) {
      gods[index].push('空亡');
    }
  }

  const yearXun = eightChar.getYear().getTen().toString();
  for (const [index, zhi] of Object.entries(zhiArray)) {
    if (index !== '0' && KONG_WANG[yearXun].includes(zhi)) {
      gods[index].push('空亡');
    }
  }

  // 天罗地网
  for (const [wuxing, rule] of Object.entries(TIAN_LUO_DI_WANG)) {
    if (yearSound.includes(wuxing) && rule.includes(dayZhi)) {
      gods['2'].push('天罗地网');
    }
  }

  // 判断元辰
  let yinyang = '';
  for (const [yy, dict] of Object.entries(YIN_YANG)) {
    if (dict.includes(dayGan)) {
      yinyang = yy;
      break;
    }
  }
  let yinyangGender = yinyang + (gender == 0 ? '女' : '男');
  for (const [yuanchenGender, yuanchenDict] of Object.entries(YUAN_CHEN)) {
    if (yuanchenGender.includes(yinyangGender)) {
      for (const [index, zhi] of Object.entries(zhiArray)) {
        if (index !== '0' && zhi === yuanchenDict[yearZhi]) {
          gods[index].push('元辰');
        }
      }
    }
  }

  // 隔角煞
  if (GEJIAO_SHA[dayZhi] === timeZhi) {
    gods[3].push('隔角煞');
  }

  // 童子煞
  let tongziGodName = '童子煞';
  for (const [monthS, rule] of Object.entries(TONGZI_SHA_MONTH)) {
    if (monthS.includes(monthZhi)) {
      if (rule.includes(dayZhi)) {
        gods[2].push(tongziGodName);
      }
      if (rule.includes(timeZhi)) {
        gods[3].push(tongziGodName);
      }
    }
  }
  for (const [yearEle, rule] of Object.entries(TONGZI_SHA_YEAR_NAYIN)) {
    if (yearSound.includes(yearEle)) {
      if (rule.includes(dayZhi)) {
        gods[2].push(tongziGodName);
      }
      if (rule.includes(timeZhi)) {
        gods[3].push(tongziGodName);
      }
    }
  }

  // 金神补充判断，看时柱
  if (SHEN_DAY_ZHU['金神'].includes(timeZhu)) {
    gods[3].push('金神');
  }

  return [[...new Set(gods[0])], [...new Set(gods[1])], [...new Set(gods[2])], [...new Set(gods[3])]];
}
