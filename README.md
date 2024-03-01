# README

## Features

将 cppdbg 类型调试器调试终端的信息发送至设定的 udp 端口。

## Requirements

- 需要使用 cppdbg 类型调试器。
- 将 logpoint 设置为 json 格式，只发送 `{` 开头的数据。
```
\{"value1" : {value1} \}
```

## Extension Settings


## Known Issues

- 自定义 IP 端口。
- 手动取消跟踪器的注册。

## Release Notes

### 1.0.0

第一个版本