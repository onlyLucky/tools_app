package routers

import "toolsAppServer/api"

func (router RouterGroup) TodoRouter() {
	app := api.App.TodoApi
	router.POST("/todo",app.TodoAddView)
}
