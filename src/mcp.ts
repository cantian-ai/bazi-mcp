import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { toDate } from 'date-fns-tz';
import { LunarHour } from 'tyme4ts';
import z from 'zod';
import { buildBazi, solarDatetimeToLunarHour } from './lib/bazi.js';

const server = new McpServer({
  name: 'Bazi',
  version: '0.0.1',
});

server.tool(
  'buildBaziFromLunarDatetime',
  '根据农历时间、性别来获取八字信息。',
  {
    lunarDatetime: z.string().describe('农历时间。例如：`2000-5-15 12:00:00`。'),
    gender: z.number().describe('传0表示女性，传1表示男性。'),
    eightCharProviderSect: z
      .number()
      .default(2)
      .describe('早晚子时配置。传1表示23:00-23:59日干支为明天，传2表示23:00-23:59日干支为当天。'),
  },
  async ({ lunarDatetime, gender, eightCharProviderSect }) => {
    const date = toDate(new Date(lunarDatetime));
    const lunarHour = LunarHour.fromYmdHms(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            buildBazi({ lunarHour, gender: gender as 0 | 1, eightCharProviderSect: eightCharProviderSect as 1 | 2 }),
          ),
        },
      ],
    };
  },
);

server.tool(
  'buildBaziFromSolarDatetime',
  '根据阳历时间、性别来获取八字信息。',
  {
    solarDatetime: z.string().describe('用ISO时间格式表示的阳历时间. 例如：`2008-03-01T13:00:00+08:00`。'),
    gender: z.number().describe('传0表示女性，传1表示男性。'),
    eightCharProviderSect: z
      .number()
      .default(2)
      .describe('早晚子时配置。传1表示23:00-23:59日干支为明天，传2表示23:00-23:59日干支为当天。'),
  },
  async ({ solarDatetime, gender, eightCharProviderSect }) => {
    const lunarHour = solarDatetimeToLunarHour(solarDatetime);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            buildBazi({
              lunarHour,
              gender: gender as 0 | 1,
              eightCharProviderSect: eightCharProviderSect as 1 | 2,
            }),
          ),
        },
      ],
    };
  },
);

export { server };
