import { toDate, toZonedTime } from 'date-fns-tz';
import { DefaultEightCharProvider, LunarHour, LunarSect2EightCharProvider, SixtyCycle, SolarTime } from 'tyme4ts';

const eightCharProvider1 = new DefaultEightCharProvider();
const eightCharProvider2 = new LunarSect2EightCharProvider();

/**
 *
 * @param solarTime Solar time string in ISO format.
 */
export const solarDatetimeToLunarHour = (solarDatetime: string) => {
  const date = toDate(solarDatetime);
  const zonedDate = toZonedTime(date, '+07:00');
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

export const buildSixtyCycleObject = (sixtyCycle: SixtyCycle) => {
  const pengzu = sixtyCycle.getPengZu();
  const heavenStem = sixtyCycle.getHeavenStem();
  const earthBranch = sixtyCycle.getEarthBranch();
  return {
    天干: {
      天干: heavenStem.toString(),
      五行: heavenStem.getElement().toString(),
      阴阳: heavenStem.getYinYang() === 1 ? '阳' : '阴',
      方位: heavenStem.getDirection().toString(),
      喜神方位: heavenStem.getJoyDirection().toString(),
      阳贵神方位: heavenStem.getYangDirection().toString(),
      阴贵神方位: heavenStem.getYinDirection().toString(),
      财神方位: heavenStem.getWealthDirection().toString(),
      福神方位: heavenStem.getMascotDirection().toString(),
      彭祖百忌: heavenStem.getPengZuHeavenStem().toString(),
    },
    地支: earthBranch.toString(),
    纳音: sixtyCycle.getSound().toString(),
    彭祖百忌: {
      天干彭祖百忌: pengzu.getPengZuHeavenStem().toString(),
      地支彭祖百忌: pengzu.getPengZuEarthBranch().toString(),
    },
    旬: sixtyCycle.getTen().toString(),
    空亡: sixtyCycle.getExtraEarthBranches().join(''),
  };
};

export const buildBazi = (lunarHour: LunarHour, eightCharProviderSect: 1 | 2 = 2) => {
  if (eightCharProviderSect === 2) {
    LunarHour.provider = eightCharProvider2;
  } else {
    LunarHour.provider = eightCharProvider1;
  }
  const eightChar = lunarHour.getEightChar();
  return {
    年柱: buildSixtyCycleObject(eightChar.getYear()),
    月柱: buildSixtyCycleObject(eightChar.getMonth()),
    日柱: buildSixtyCycleObject(eightChar.getDay()),
    时柱: buildSixtyCycleObject(eightChar.getHour()),
    胎元: eightChar.getFetalOrigin().toString(),
    胎息: eightChar.getFetalBreath().toString(),
    命宫: eightChar.getOwnSign().toString(),
    身宫: eightChar.getBodySign().toString(),
    建除十二值神: eightChar.getDuty().toString(),
  };
};
