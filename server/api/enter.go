package api

import (
	"toolsAppServer/api/todo_api"
	"toolsAppServer/api/user_api"
)

type Api struct {
	UserApi user_api.UserApi
	TodoApi todo_api.TodoApi
}

var App = new(Api)
