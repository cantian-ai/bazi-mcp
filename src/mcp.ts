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
  {
    lunarDatetime: z.string().describe('Lunar datetime string in ISO format.'),
  },
  async ({ lunarDatetime }) => {
    const date = toDate(lunarDatetime);
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
          text: JSON.stringify(buildBazi(lunarHour)),
        },
      ],
    };
  },
);

server.tool(
  'buildBaziFromSolarDatetime',
  {
    solarDatetime: z.string().describe('Solar datetime in ISO format. Example: `2008-03-01T13:00:00:+08:00`'),
  },
  async ({ solarDatetime }) => {
    const lunarHour = solarDatetimeToLunarHour(solarDatetime);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(buildBazi(lunarHour)),
        },
      ],
    };
  },
);

export { server };
