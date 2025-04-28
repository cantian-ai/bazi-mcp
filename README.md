# Bazi MCP (八字 MCP) by Cantian AI

[![smithery badge](https://smithery.ai/badge/@cantian-ai/bazi-mcp)](https://smithery.ai/server/@cantian-ai/bazi-mcp)

Unlock precise Bazi insights with the **Bazi MCP**, the first AI-powered metaphysical Bazi calculator. Built to address inaccuracies in existing AI fortune-telling tools like GPT and DeepSeek, our MCP delivers reliable Bazi data for personality analysis, destiny forecasting, and more.

### Why Bazi MCP?

- **Accurate Bazi Calculations**: Provide insightful Bazi information.
- **AI Agent Integration**: Empowers AI agents with precise Bazi data.
- **Community-Driven**: Join enthusiasts to advance Chinese metaphysics.

Originating from the popular [_Chinese Bazi Fortune Teller_](https://chatgpt.com/g/g-67c3f7b74d148191a2167f44fd13412d-chinese-bazi-fortune-teller-can-tian-ba-zi-suan-ming-jing-zhun-pai-pan-jie-du) GPTs in the GPT Store, this project is now integrated with **Cantian AI** ([cantian.ai](https://cantian.ai)). We invite Bazi practitioners and AI enthusiasts to collaborate, share insights, and contribute to our open-source community.

### Get Involved

- **Contact**: [support@cantian.ai](mailto:support@cantian.ai)

## 中文

**八字 MCP**是参天 AI 推出的首个人工智能八字计算平台，针对 GPT 和 DeepSeek 等算命工具常出现的排盘错误，提供精准的八字数据，助力性格分析、命运预测等应用。

### 八字 MCP 亮点

- **精准排盘**：提供全面的八字排盘信息。
- **AI 赋能**：为 AI 智能体提供可靠八字服务。
- **社区共建**：欢迎命理爱好者参与交流与开发。

项目源于 GPT Store 热门应用[_Chinese Bazi Fortune Teller_](https://chatgpt.com/g/g-67c3f7b74d148191a2167f44fd13412d-chinese-bazi-fortune-teller-can-tian-ba-zi-suan-ming-jing-zhun-pai-pan-jie-du)，现已融入**参天 AI**平台 ([cantian.ai](https://cantian.ai))。我们诚邀命理研究者与 AI 开发者加入，共同推动中国传统文化的传承与创新。

### 联系我们

- **邮箱**：[support@cantian.ai](mailto:support@cantian.ai)
- **微信**：
  <img src="https://github.com/user-attachments/assets/7790b64e-e03f-47e2-b824-38459549a6d8" alt="WeChat QR Code" width="200"/>

## 前置需求 ｜ Prerequisite

Node.js 22 版本或以上。

Node.js 22 or above.

## 开始使用 ｜ Start

配置 AI 应用（例如 Claude Descktop）。

Configure AI application (e.g. Claude Desktop).

```json
{
  "mcpServers": {
    "Bazi": {
      "command": "npx",
      "args": ["bazi-mcp"]
    }
  }
}
```

### Installing via Smithery

To install bazi-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@cantian-ai/bazi-mcp):

```bash
npx -y @smithery/cli install @cantian-ai/bazi-mcp --client claude
```

## 工具列表 | Tools

### buildBaziFromLunarDatetime

> 根据`农历`时间计算八字结果。  
> Calculate the BaZi results based on the lunar datetime.

#### 参数 ｜ Arguments

- lunarDatetime: `String`

  > 农历时间。例如：`2000-05-15 12:00:00`。  
  > Lunar datetime. Example: `2000-05-15 12:00:00`.

- gender: `Number`

  > 性别。可选。0 - 女，1-男。默认 1。  
  > Gender. Optional. 0 for female, 1 for male. 1 by default.

- eightCharProviderSect： `Number`

  > 早晚子时配置。可选。1 - 表示 23:00-23:59 日干支为明天，2 - 表示 23:00-23:59 日干支为当天。默认 2。
  > Configuration for eight char provider. Optional. 1 for meaning the day stem of 23:00-23:59 is for tomorrow, 2 for meaning the day stem of 23:00-23:59 is for today. 2 by default.

### buildBaziFromSolarDatetime

> 根据`阳历`时间计算八字结果。  
> Calculate the BaZi results based on the solar datetime.

#### 参数 ｜ Arguments

- lunarDatetime: `String`

  > ISO 格式的阳历时间。例如：`2000-05-15T12:00:00+08:00`。  
  > Solar datetime in ISO format. Example: `2000-05-15T12:00:00+08:00`.

- gender: `Number`

  > 性别。可选。0 - 女，1-男。  
  > Gender. Optional. 0 for female, 1 for male.

- eightCharProviderSect： `Number`

  > 早晚子时配置。可选。1 - 表示 23:00-23:59 日干支为明天，2 - 表示 23:00-23:59 日干支为当天。默认 2。
  > Configuration for eight char provider. Optional. 1 for meaning the day stem of 23:00-23:59 is for tomorrow, 2 for meaning the day stem of 23:00-23:59 is for today. 2 by default.

## 八字结果 | Bazi result

工具返回的八字结果实例：

Example of the result returned from MCP server:

```json
{
  "性别": "女",
  "阳历": "2000年1月3日 10:24:00",
  "农历": "农历己卯年十一月廿七辛巳时",
  "年柱": {
    "天干": { "天干": "己", "五行": "土", "阴阳": "阴", "十神": "正印" },
    "地支": { "地支": "卯", "五行": "木", "阴阳": "阴", "藏干": { "主气": { "天干": "乙", "十神": "正财" } } },
    "纳音": "城头土",
    "旬": "甲戌",
    "空亡": "申酉",
    "星运": "胎",
    "自坐": "病"
  },
  "月柱": {
    "天干": { "天干": "丙", "五行": "火", "阴阳": "阳", "十神": "七杀" },
    "地支": { "地支": "子", "五行": "水", "阴阳": "阳", "藏干": { "主气": { "天干": "癸", "十神": "伤官" } } },
    "纳音": "涧下水",
    "旬": "甲戌",
    "空亡": "申酉",
    "星运": "死",
    "自坐": "胎"
  },
  "日柱": {
    "天干": { "天干": "庚", "五行": "金", "阴阳": "阳" },
    "地支": {
      "地支": "申",
      "五行": "金",
      "阴阳": "阳",
      "藏干": {
        "主气": { "天干": "庚", "十神": "比肩" },
        "中气": { "天干": "壬", "十神": "食神" },
        "余气": { "天干": "戊", "十神": "偏印" }
      }
    },
    "纳音": "石榴木",
    "旬": "甲寅",
    "空亡": "子丑",
    "星运": "临官",
    "自坐": "临官"
  },
  "时柱": {
    "天干": { "天干": "辛", "五行": "金", "阴阳": "阴", "十神": "劫财" },
    "地支": {
      "地支": "巳",
      "五行": "火",
      "阴阳": "阴",
      "藏干": {
        "主气": { "天干": "丙", "十神": "七杀" },
        "中气": { "天干": "庚", "十神": "比肩" },
        "余气": { "天干": "戊", "十神": "偏印" }
      }
    },
    "纳音": "白蜡金",
    "旬": "甲戌",
    "空亡": "申酉",
    "星运": "长生",
    "自坐": "死"
  },
  "胎元": "丁卯",
  "胎息": "乙巳",
  "命宫": "丙子",
  "身宫": "庚午",
  "神煞": {
    "年柱": ["太极贵人", "飞刃", "德秀贵人"],
    "月柱": ["将星", "桃花", "红鸾", "披麻", "空亡"],
    "日柱": ["金舆", "禄神", "劫煞", "学堂", "八专", "四废", "空亡", "元辰"],
    "时柱": ["驿马", "劫煞", "孤辰", "丧门", "童子煞"]
  }
}
```

**Keywords**: Bazi MCP, Bazi AI Agent, Fengshui AI Agent, Bazi Calculator MCP, Bazi Calculator AI, Cantian AI
