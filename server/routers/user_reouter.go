package routers

import "toolsAppServer/api"

func (router RouterGroup) UserRouter() {
	userApi := router.Group("user")
	app := api.App.UserApi
	userApi.POST("/create", app.UserCreateView)
}
