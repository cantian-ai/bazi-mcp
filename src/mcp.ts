import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import z from 'zod';
import { getBaziDetail, getChineseCalendar, getInferenceDecision, getSolarTimes } from './index.js';

const server = new McpServer({
  name: 'Bazi',
  version: '0.0.1',
});

server.tool(
  'getBaziDetail',
  '根据时间（公历或农历）、性别来获取八字信息。solarDatetime和lunarDatetime必须传且只传其中一个。',
  {
    solarDatetime: z.string().optional().describe('用ISO时间格式表示的公历时间. 例如：`2008-03-01T13:00:00+08:00`。'),
    lunarDatetime: z.string().optional().describe('农历时间。例如农历2000年5月初五中午12点整表示为：`2000-5-5 12:00:00`。'),

    gender: z.number().describe('传0表示女性，传1表示男性。'),
    eightCharProviderSect: z
      .number()
      .default(2)
      .describe('早晚子时配置。传1表示23:00-23:59日干支为明天，传2表示23:00-23:59日干支为当天。'),
  },
  async (data) => {
    const result = await getBaziDetail(data);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result),
        },
      ],
    };
  },
);

server.tool(
  'getInferenceDecision',
  'Policy engine for anti-hallucination inference. It decides whether to conclude, ask high-value follow-up questions, or abstain.',
  {
    round: z.number().int().min(1).describe('Current validation round, starts from 1.'),
    totalQuestionsAsked: z.number().int().min(0).describe('Total follow-up questions already asked across rounds.'),
    askedPastQuestions: z.number().int().min(0).optional().describe('How many past-focused questions have been asked.'),
    askedPresentQuestions: z
      .number()
      .int()
      .min(0)
      .optional()
      .describe('How many present-focused questions have been asked.'),
    pastValidationScore: z
      .number()
      .min(0)
      .max(1)
      .optional()
      .describe('How well the model already validated past hypotheses.'),
    presentStateClarity: z
      .number()
      .min(0)
      .max(1)
      .optional()
      .describe('How clear the current real-world context is.'),
    claims: z
      .array(
        z.object({
          claimId: z.string(),
          confidence: z.number().min(0).max(1),
          evidenceFromChart: z.boolean().describe('True only if claim has explicit chart evidence.'),
        }),
      )
      .min(1)
      .describe('Current inferred claims with confidence and chart-evidence flags.'),
    targetClaimIds: z.array(z.string()).optional().describe('Claims that must reach threshold to allow conclusion.'),
    candidateQuestions: z
      .array(
        z.object({
          questionId: z.string(),
          questionText: z.string(),
          claimIds: z.array(z.string()).min(1).describe('Which claims this question can validate.'),
          expectedConfidenceGain: z.number().min(0).max(1).describe('Estimated confidence gain after asking this question.'),
          scope: z.enum(['past', 'present']).optional().describe('Question scope. Used by dynamic question mix logic.'),
        }),
      )
      .optional()
      .describe('Question candidates ranked by expected confidence gain.'),
  },
  async (data) => {
    const result = await getInferenceDecision(data);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result),
        },
      ],
    };
  },
);

server.tool(
  'getSolarTimes',
  '根据八字获取公历时间列表。返回的时间格式为：YYYY-MM-DD hh:mm:ss。例如时间1998年7月31日下午2点整表示为：1998-07-31 14:00:00',
  {
    bazi: z.string().describe('八字，按年柱、月柱、日柱、时柱顺序，用空格隔开。例如：戊寅 己未 己卯 辛未'),
  },
  async (data) => {
    const result = await getSolarTimes(data);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result),
        },
      ],
    };
  },
);

server.tool(
  'getChineseCalendar',
  '获取指定公历时间（默认今天）的黄历信息。',
  {
    solarDatetime: z.string().optional().describe('用ISO时间格式表示的公历时间. 例如：`2008-03-01T13:00:00+08:00`。'),
  },
  async ({ solarDatetime }) => {
    const result = getChineseCalendar(solarDatetime);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result),
        },
      ],
    };
  },
);

export { server };
