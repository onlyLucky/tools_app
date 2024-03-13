package core

import (
	"log"
	"os"
	"toolsAppServer/config"

	"gopkg.in/yaml.v3"
)

const yamlPath = "config.yaml"

// 读取yaml 配置初始化
func InitConfig() (c *config.Config) {
	byteData, err := os.ReadFile(yamlPath)
	if err != nil {
		log.Fatalln("read yaml err:", err.Error())
	}
	c = new(config.Config)
	err = yaml.Unmarshal(byteData, c)
	if err != nil {
		log.Fatalln("解析 yaml err：", err.Error())
	}
	return c
}
