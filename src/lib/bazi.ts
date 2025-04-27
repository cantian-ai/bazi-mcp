import { toDate, toZonedTime } from 'date-fns-tz';
import {
  DefaultEightCharProvider,
  EightChar,
  HeavenStem,
  LunarHour,
  LunarSect2EightCharProvider,
  SixtyCycle,
  SolarTime,
} from 'tyme4ts';
import { buildGods } from './god.js';

const eightCharProvider1 = new DefaultEightCharProvider();
const eightCharProvider2 = new LunarSect2EightCharProvider();

/**
 *
 * @param solarTime Solar time string in ISO format.
 */
export const solarDatetimeToLunarHour = (solarDatetime: string) => {
  const date = toDate(solarDatetime);
  const zonedDate = toZonedTime(date, '+08:00');
  const solarTime = SolarTime.fromYmdHms(
    zonedDate.getFullYear(),
    zonedDate.getMonth() + 1,
    zonedDate.getDate(),
    zonedDate.getHours(),
    zonedDate.getMinutes(),
    0,
  );
  const lunarHour = solarTime.getLunarHour();
  return lunarHour;
};

export const buildHideHeavenObject = (heavenStem: HeavenStem | null | undefined, me: HeavenStem) => {
  if (!heavenStem) {
    return undefined;
  }
  return {
    天干: heavenStem.toString(),
    十神: me.getTenStar(heavenStem).toString(),
  };
};

/**
 * @param sixtyCycle 干支。
 * @param me 日主，如果sixtyCycle是日柱的话不传值。
 */
export const buildSixtyCycleObject = (sixtyCycle: SixtyCycle, me?: HeavenStem) => {
  const heavenStem = sixtyCycle.getHeavenStem();
  const earthBranch = sixtyCycle.getEarthBranch();
  if (!me) {
    me = heavenStem;
  }
  return {
    天干: {
      天干: heavenStem.toString(),
      五行: heavenStem.getElement().toString(),
      阴阳: heavenStem.getYinYang() === 1 ? '阳' : '阴',
      十神: me === heavenStem ? undefined : me.getTenStar(heavenStem).toString(),
    },
    地支: {
      地支: earthBranch.toString(),
      五行: earthBranch.getElement().toString(),
      阴阳: earthBranch.getYinYang() === 1 ? '阳' : '阴',
      藏干: {
        主气: buildHideHeavenObject(earthBranch.getHideHeavenStemMain(), me),
        中气: buildHideHeavenObject(earthBranch.getHideHeavenStemMiddle(), me),
        余气: buildHideHeavenObject(earthBranch.getHideHeavenStemResidual(), me),
      },
    },
    纳音: sixtyCycle.getSound().toString(),
    旬: sixtyCycle.getTen().toString(),
    空亡: sixtyCycle.getExtraEarthBranches().join(''),
    星运: me.getTerrain(earthBranch).toString(),
    自坐: heavenStem.getTerrain(earthBranch).toString(),
  };
};

const buildGodsObject = (eightChar: EightChar, gender: 0 | 1) => {
  const gods = buildGods(eightChar, gender);
  return {
    年柱: gods[0],
    月柱: gods[1],
    日柱: gods[2],
    时柱: gods[3],
  };
};

export const buildBazi = (options: { lunarHour: LunarHour; eightCharProviderSect?: 1 | 2; gender?: 0 | 1 }) => {
  const { lunarHour, eightCharProviderSect = 2, gender = 1 } = options;
  if (eightCharProviderSect === 2) {
    LunarHour.provider = eightCharProvider2;
  } else {
    LunarHour.provider = eightCharProvider1;
  }
  const eightChar = lunarHour.getEightChar();
  const me = eightChar.getDay().getHeavenStem();
  return {
    性别: ['女', '男'][gender],
    阳历: lunarHour.getSolarTime().toString(),
    农历: lunarHour.toString(),
    年柱: buildSixtyCycleObject(eightChar.getYear(), me),
    月柱: buildSixtyCycleObject(eightChar.getMonth(), me),
    日柱: buildSixtyCycleObject(eightChar.getDay()),
    时柱: buildSixtyCycleObject(eightChar.getHour(), me),
    胎元: eightChar.getFetalOrigin().toString(),
    胎息: eightChar.getFetalBreath().toString(),
    命宫: eightChar.getOwnSign().toString(),
    身宫: eightChar.getBodySign().toString(),
    神煞: buildGodsObject(eightChar, gender),
  };
};
