# Bazi MCP (八字 MCP) by Cantian AI

[![smithery badge](https://smithery.ai/badge/@cantian-ai/bazi-mcp)](https://smithery.ai/server/@cantian-ai/bazi-mcp)
[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/453ac410-d93a-45fb-8563-7d3cccfbe956)

Unlock precise Bazi insights with the **Bazi MCP**, the first AI-powered Bazi calculator. Built to address inaccuracies in existing AI fortune-telling tools like GPT and DeepSeek, our MCP delivers reliable Bazi data for personality analysis, destiny forecasting, and more.

### Why Bazi MCP?

- **Accurate Bazi Calculations**: Provide insightful Bazi information.
- **AI Agent Integration**: Empowers AI agents with precise Bazi data.
- **Community-Driven**: Join enthusiasts to advance Chinese metaphysics.

Originating from the popular [_Chinese Bazi Fortune Teller_](https://chatgpt.com/g/g-67c3f7b74d148191a2167f44fd13412d-chinese-bazi-fortune-teller-can-tian-ba-zi-suan-ming-jing-zhun-pai-pan-jie-du) GPTs in the GPT Store, this project is now integrated with **Cantian AI** ([cantian.ai](https://cantian.ai)). We invite Bazi practitioners and AI enthusiasts to collaborate, share insights, and contribute to our open-source community.

### Get Involved

- **Contact**: [support@cantian.ai](mailto:support@cantian.ai)

## 中文

**八字 MCP**是参天 AI 推出的首个面向玄学领域的 MCP，针对 GPT 和 DeepSeek 等算命工具常出现的排盘错误，提供精准的八字数据，助力性格分析、命运预测等应用。

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

### getBaziDetail

> 根据给定的公历或农历时间计算八字信息。
> Calculate the Bazi results based on the solar/lunar datetime.

#### 参数 | Arguments

- solarDatetime: `String`

  > ISO 格式的阳历时间。例如：`2000-05-15T12:00:00+08:00`。  
  > Solar datetime in ISO format. Example: `2000-05-15T12:00:00+08:00`.

- lunarDatetime: `String`

  > 农历时间。例如：`2000-05-15 12:00:00`。  
  > Lunar datetime. Example: `2000-05-15 12:00:00`.

- gender: `Number`

  > 性别。可选。0 - 女，1-男。默认 1。  
  > Gender. Optional. 0 for female, 1 for male. 1 by default.

- eightCharProviderSect： `Number`

  > 早晚子时配置。可选。1 - 表示 23:00-23:59 日干支为明天，2 - 表示 23:00-23:59 日干支为当天。默认 2。
  > Configuration for eight char provider. Optional. 1 for meaning the day stem of 23:00-23:59 is for tomorrow, 2 for meaning the day stem of 23:00-23:59 is for today. 2 by default.

#### 结果示例 ｜ Result example

```json
{
  "性别": "男",
  "阳历": "1998年7月31日 14:10:00",
  "农历": "农历戊寅年六月初九辛未时",
  "八字": "戊寅 己未 己卯 辛未",
  "生肖": "虎",
  "日主": "己",
  "年柱": {
    "天干": {
      "天干": "戊",
      "五行": "土",
      "阴阳": "阳",
      "十神": "劫财"
    },
    "地支": {
      "地支": "寅",
      "五行": "木",
      "阴阳": "阳",
      "藏干": {
        "主气": {
          "天干": "甲",
          "十神": "正官"
        },
        "中气": {
          "天干": "丙",
          "十神": "正印"
        },
        "余气": {
          "天干": "戊",
          "十神": "劫财"
        }
      }
    },
    "纳音": "城头土",
    "旬": "甲戌",
    "空亡": "申酉",
    "星运": "死",
    "自坐": "长生"
  },
  "月柱": {
    "天干": {
      "天干": "己",
      "五行": "土",
      "阴阳": "阴",
      "十神": "比肩"
    },
    "地支": {
      "地支": "未",
      "五行": "土",
      "阴阳": "阴",
      "藏干": {
        "主气": {
          "天干": "己",
          "十神": "比肩"
        },
        "中气": {
          "天干": "丁",
          "十神": "偏印"
        },
        "余气": {
          "天干": "乙",
          "十神": "七杀"
        }
      }
    },
    "纳音": "天上火",
    "旬": "甲寅",
    "空亡": "子丑",
    "星运": "冠带",
    "自坐": "冠带"
  },
  "日柱": {
    "天干": {
      "天干": "己",
      "五行": "土",
      "阴阳": "阴"
    },
    "地支": {
      "地支": "卯",
      "五行": "木",
      "阴阳": "阴",
      "藏干": {
        "主气": {
          "天干": "乙",
          "十神": "七杀"
        }
      }
    },
    "纳音": "城头土",
    "旬": "甲戌",
    "空亡": "申酉",
    "星运": "病",
    "自坐": "病"
  },
  "时柱": {
    "天干": {
      "天干": "辛",
      "五行": "金",
      "阴阳": "阴",
      "十神": "食神"
    },
    "地支": {
      "地支": "未",
      "五行": "土",
      "阴阳": "阴",
      "藏干": {
        "主气": {
          "天干": "己",
          "十神": "比肩"
        },
        "中气": {
          "天干": "丁",
          "十神": "偏印"
        },
        "余气": {
          "天干": "乙",
          "十神": "七杀"
        }
      }
    },
    "纳音": "路旁土",
    "旬": "甲子",
    "空亡": "戌亥",
    "星运": "冠带",
    "自坐": "衰"
  },
  "胎元": "庚戌",
  "胎息": "甲戌",
  "命宫": "乙卯",
  "身宫": "乙卯",
  "神煞": {
    "年柱": ["国印", "亡神"],
    "月柱": ["天德合", "月德合", "天乙贵人", "太极贵人", "福星贵人", "金舆", "血刃", "华盖", "天喜", "元辰"],
    "日柱": ["天德合", "月德合", "桃花", "九丑", "童子煞"],
    "时柱": ["天乙贵人", "太极贵人", "福星贵人", "金舆", "血刃", "华盖", "天喜", "元辰", "童子煞"]
  },
  "大运": {
    "起运年龄": 4,
    "起运日期": "2001-1-26",
    "大运": [
      {
        "干支": "庚申",
        "开始年份": 2001,
        "结束": 2010,
        "天干十神": "伤官",
        "地支十神": ["伤官", "正财", "劫财"],
        "地支藏干": ["庚", "壬", "戊"],
        "开始年龄": 4,
        "结束年龄": 13
      },
      {
        "干支": "辛酉",
        "开始年份": 2011,
        "结束": 2020,
        "天干十神": "食神",
        "地支十神": ["食神"],
        "地支藏干": ["辛"],
        "开始年龄": 14,
        "结束年龄": 23
      },
      {
        "干支": "壬戌",
        "开始年份": 2021,
        "结束": 2030,
        "天干十神": "正财",
        "地支十神": ["劫财", "食神", "偏印"],
        "地支藏干": ["戊", "辛", "丁"],
        "开始年龄": 24,
        "结束年龄": 33
      },
      {
        "干支": "癸亥",
        "开始年份": 2031,
        "结束": 2040,
        "天干十神": "偏财",
        "地支十神": ["正财", "正官"],
        "地支藏干": ["壬", "甲"],
        "开始年龄": 34,
        "结束年龄": 43
      },
      {
        "干支": "甲子",
        "开始年份": 2041,
        "结束": 2050,
        "天干十神": "正官",
        "地支十神": ["偏财"],
        "地支藏干": ["癸"],
        "开始年龄": 44,
        "结束年龄": 53
      },
      {
        "干支": "乙丑",
        "开始年份": 2051,
        "结束": 2060,
        "天干十神": "七杀",
        "地支十神": ["比肩", "偏财", "食神"],
        "地支藏干": ["己", "癸", "辛"],
        "开始年龄": 54,
        "结束年龄": 63
      },
      {
        "干支": "丙寅",
        "开始年份": 2061,
        "结束": 2070,
        "天干十神": "正印",
        "地支十神": ["正官", "正印", "劫财"],
        "地支藏干": ["甲", "丙", "戊"],
        "开始年龄": 64,
        "结束年龄": 73
      },
      {
        "干支": "丁卯",
        "开始年份": 2071,
        "结束": 2080,
        "天干十神": "偏印",
        "地支十神": ["七杀"],
        "地支藏干": ["乙"],
        "开始年龄": 74,
        "结束年龄": 83
      },
      {
        "干支": "戊辰",
        "开始年份": 2081,
        "结束": 2090,
        "天干十神": "劫财",
        "地支十神": ["劫财", "七杀", "偏财"],
        "地支藏干": ["戊", "乙", "癸"],
        "开始年龄": 84,
        "结束年龄": 93
      },
      {
        "干支": "己巳",
        "开始年份": 2091,
        "结束": 2100,
        "天干十神": "比肩",
        "地支十神": ["正印", "伤官", "劫财"],
        "地支藏干": ["丙", "庚", "戊"],
        "开始年龄": 94,
        "结束年龄": 103
      }
    ]
  },
  "刑冲合会": {
    "年": {
      "天干": {},
      "地支": {}
    },
    "月": {
      "天干": {},
      "地支": {
        "半合": [
          {
            "柱": "日",
            "知识点": "未卯半合木",
            "元素": "木"
          }
        ]
      }
    },
    "日": {
      "天干": {},
      "地支": {
        "半合": [
          {
            "柱": "月",
            "知识点": "卯未半合木",
            "元素": "木"
          },
          {
            "柱": "时",
            "知识点": "卯未半合木",
            "元素": "木"
          }
        ]
      }
    },
    "时": {
      "天干": {},
      "地支": {
        "半合": [
          {
            "柱": "日",
            "知识点": "未卯半合木",
            "元素": "木"
          }
        ]
      }
    }
  }
}
```

### getSolarTimes

> 根据给定的八字返回可能的公历时间列表。
> Return a list of possible solar calendar datetime based on the given Bazi.

#### 参数 | Arguments

- bazi: `String`

  > 八字，各柱用空格隔开。
  > Bazi, with each pillar separated by a space.

#### 结果示例 ｜ Result example

```json
["1758-07-29 14:00:00", "1818-07-15 14:00:00", "1998-07-31 14:00:00"]
```

### getChineseCalendar

> 获取指定公历时间（默认今天）的黄历信息。
> Get chinese calendar information for the specified solar calendar date (default is today).

#### 参数 | Arguments

- solarDatetime

  > ISO 格式的阳历时间。例如：`2000-05-15T12:00:00+08:00`。  
  > Solar datetime in ISO format. Example: `2000-05-15T12:00:00+08:00`.

#### 结果示例 ｜ Result example

```json
{
  "公历": "2025年5月7日 星期三",
  "农历": "农历乙巳年四月初十",
  "干支": "乙巳 辛巳 丙子",
  "生肖": "蛇",
  "纳音": "涧下水",
  "节气": "立夏",
  "二十八宿": "箕水豹吉",
  "彭祖百忌": "丙不修灶必见灾殃 子不问卜自惹祸殃",
  "喜神方位": "西南",
  "阳贵神方位": "西",
  "阴贵神方位": "西北",
  "福神方位": "东",
  "财神方位": "西南",
  "冲煞": "冲马(午)煞南",
  "宜": "嫁娶,祭祀,祈福,求嗣,开光,出行,拆卸,动土,上梁,出火,进人口,入宅,移徙,安床,栽种,纳畜,牧养,竖柱,安门,修造,解除,会亲友",
  "忌": ""
}
```

### ~~buildBaziFromLunarDatetime~~ (deprecated)

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

### ~~buildBaziFromSolarDatetime~~ (deprecated)

> 根据`阳历`时间计算八字结果。  
> Calculate the BaZi results based on the solar datetime.

#### 参数 ｜ Arguments

- solarDatetime: `String`

  > ISO 格式的阳历时间。例如：`2000-05-15T12:00:00+08:00`。  
  > Solar datetime in ISO format. Example: `2000-05-15T12:00:00+08:00`.

- gender: `Number`

  > 性别。可选。0 - 女，1-男。  
  > Gender. Optional. 0 for female, 1 for male.

- eightCharProviderSect： `Number`

  > 早晚子时配置。可选。1 - 表示 23:00-23:59 日干支为明天，2 - 表示 23:00-23:59 日干支为当天。默认 2。
  > Configuration for eight char provider. Optional. 1 for meaning the day stem of 23:00-23:59 is for tomorrow, 2 for meaning the day stem of 23:00-23:59 is for today. 2 by default.

**Keywords**: Bazi MCP, Bazi AI Agent, Fengshui AI Agent, Bazi Calculator MCP, Bazi Calculator AI, Cantian AI
