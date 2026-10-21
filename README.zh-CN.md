# Mubboo Flights Search MCP

**从 AI 对话轻松开始旅行比价。**

[Mubboo Flights](https://mubboo.flights/) 是一站式旅行比价与门票平台。比较机票、酒店和租车，探索旅游活动与景点门票，结合目的地指南和旅行研究，寻找更合适、更有价值的选择。

**We compare. You choose. You save.**

免费的托管 MCP 服务可以帮助兼容的 AI 助手查找机场、核对行程参数，并准备可直接打开的机票搜索链接。打开链接后，你可以比较当前选项并自行选择预订渠道。

[官方连接指南](https://mubboo.flights/mcp) · [English](README.md)

## 连接设置

- 名称：Mubboo Flights Search
- 地址：`https://mubboo.flights/api/mcp`
- 协议：Streamable HTTP
- 认证：无需账号或 API key，不要填写密码或个人旅客身份资料。
- 官方 MCP Registry 名称：`flights.mubboo/flight-search`

客户端须支持远程 Streamable HTTP；不同客户端的使用资格和目录审核各自独立。支持 `mcpServers` 的客户端可以合并以下配置：

```json
{
  "mcpServers": {
    "mubboo-flights": {
      "url": "https://mubboo.flights/api/mcp"
    }
  }
}
```

## 三个工具

| 工具 | 用途 |
| --- | --- |
| `find_airports` | 按地点名称或 IATA 代码查找机场和城市，存在多个结果时由旅客确认。 |
| `prepare_flight_search` | 核对航段、日期、人数、舱位、出发市场、语言及货币，生成搜索链接。支持单程、往返和多程。 |
| `get_service_info` | 查看服务能力、产品链接和联系信息。 |

可以向助手说：“帮我准备纽约往返巴黎的机票搜索，先询问日期、出发市场、货币、舱位和旅客人数，再给我搜索链接。”

MCP 不返回机票价格、时刻、实时余位、行李额度或票规，也不提供订票、付款、取消、账号访问或行程保存。酒店、租车、活动和门票属于网站服务，尚不是 MCP 搜索工具。查到机场代码不代表存在定期客运航班。

## 运行示例

本仓库由 Mubboo LLC 维护，公开连接文档、客户端示例、测试和工具结构快照。生产服务的实现仍为私有；本仓库不是可自行部署的 MCP 服务器。

需要 Node.js 20 或更新版本：

```sh
npm ci --ignore-scripts
npm test
node examples/discover.mjs
node examples/config.mjs vscode
```

`discover.mjs` 仅初始化连接并读取工具清单，不执行工具。可选的 `node examples/demo.mjs` 用虚构的 JFK–LHR 行程调用三个工具，日期为运行时的 30 天后；它核验搜索链接但不打开链接，不预订或付款。不要把这些客户端程序配置为 stdio MCP 服务器。

2026 年 10 月 21 日已核验公开端点和三个工具，记录见 [tools.json](tools.json)。这不代表任何第三方目录已经批准收录。

## 隐私与支持

只发送工具必需的行程参数，不要发送姓名、护照、邮箱、电话、密码或付款资料。请求可能出现在托管基础设施的运行日志中。打开搜索链接会把行程参数传给搜索供应商，价格、条件和可订状态以所选供应商确认为准。

[隐私政策](https://mubboo.flights/privacy) · [使用条款](https://mubboo.flights/terms) · [商业披露](https://mubboo.flights/affiliate-disclosure) · [support@mubboo.flights](mailto:support@mubboo.flights)

MIT 许可证只覆盖本仓库中的原创文件，不包括托管服务的私有实现或 Mubboo 商标；依赖保留各自的许可证。
