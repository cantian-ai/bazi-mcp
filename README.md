# Bazi MCP

根据个人的出生时间来提供八字信息的 MCP server。八字学是中国传统命理学的重要分支，广泛应用于性格分析、命运预测等领域。

目前本项目已应用在参天 AI 平台：[cantian.ai](https://cantian.ai)。我们欢迎更多命理爱好者和研究者在此交流经验、分享见解，积极参与项目共建，共同推动中国传统文化的传承与发展。有任何问题欢迎提 issue。

An MCP server that provides BaZi information based on an individual's birth datetime.BaZi is a traditional Chinese metaphysics system used for personality analysis, fortune-telling, and destiny forecasting.

The MCP server is currently integrated with the Cantian AI platform: [cantian.ai](https://cantian.ai). We invite enthusiasts and practitioners of Chinese metaphysics to participate, share their insights, and contribute to the continued development of the project. Together, let’s advance the understanding of Chinese traditional culture and foster an open, collaborative community in the field of BaZi and fate analysis. Feel free to submit issues.

## 前置需求 ｜ Prerequisite

Node.js 22 版本或以上。

Node.js 22 or above.

## 开始使用 ｜ Start

1. 克隆仓库到本地并进入仓库目录。

   Clone this repository and navigate to the repository directory.

2. 安装依赖。

   Install dependencies.

   ```sh
   npm i
   ```

3. 配置 AI 应用（例如 Claude Descktop）。

   Configure AI application (e.g. Claude Desktop).

   ```json
   {
     "mcpServers": {
       "Bazi": {
         "command": "node",
         "args": ["{Absolute path of the repository directory}/dist/stdio.js"]
       }
     }
   }
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
