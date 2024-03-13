package main

import (
	"toolsAppServer/core"
	"toolsAppServer/global"
	"toolsAppServer/routers"
)

func main() {
	global.Log = core.InitLogger(core.LogRequest{
		LogPath: "logs",
		AppName: "tools",
	})
	global.Config = core.InitConfig()
	
	addr := global.Config.System.GetAddr()
	route := routers.InitRouter()
	route.Run(addr)
}
