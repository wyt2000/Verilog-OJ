# Verilog-OJ
[![Build Status](https://travis-ci.org/lluckydog/Verilog-OJ.svg?branch=master)](https://travis-ci.org/lluckydog/Verilog-OJ)
[![Coverage Status](https://coveralls.io/repos/github/lluckydog/Verilog-OJ/badge.svg?branch=master)](https://coveralls.io/github/lluckydog/Verilog-OJ?branch=master)

Verilog OJ 是面向数字电路学习和实践的在线评测平台。

## 开发环境部署指南

下文以 Ubuntu 20.04.1 LTS 为例进行说明。

需要的依赖：
- Python 3
  - ~~请注意，PyPI 上目前没有 Python 3.8 预编译的 Pandas 软件包，您可能需要安装 Cython, g++ 等再进行 pip install 操作，否则可能出现错误。~~ (Bumped Pandas to 1.1.4)
- NodeJS & NPM (需要选择支持 package-lock.json 功能的 NPM 版本，过旧的版本请不要使用)
- RabbitMQ 消息中间件
  - 此项用于后端向判题服务传递消息，是 Celery 的依赖
  - 请用 apt 安装并部署

> 目前判题脚本中 pyDigitalWaveTools 的版本还没有迁移，请参考 [Judger 中的说明](judger/test/README.md) 部署 libreliu 魔改的 pyDigitalWaveTools 版本。

大致过程：
```bash
# Update repo to latest
sudo apt update && sudo apt upgrade

# Install essential software
sudo apt install build-essential rabbitmq-server yosys nodejs npm python3-virtualenv 
sudo systemctl start rabbitmq-server

git clone https://github.com/lluckydog/Verilog-OJ
cd Verilog-OJ
virtualenv venv
. venv/bin/activate
pip install -r requirements.txt

cd frontend
# 建议先把 npm 源切换为淘宝源，此处略
npm install .

cd ../backend
python manage.py migrate

# 此处创建您测试环境的超级用户的用户名和密码
python manage.py createsuperuser
```

这样就基本部署完成了。

### 运行前端

```bash
cd frontend
npm run dev
```

### 运行后端

```bash
cd backend
python manage.py runserver
```

### 运行判题服务器

```bash
cd backend
# Make sure your rabbitmq have started.
# If not, use systemctl start rabbitmq-server
# (use systemctl enable to start on system boot)
celery -A judge worker -l INFO
```