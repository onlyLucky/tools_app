package todo_api

import (
	"toolsAppServer/service/common/res"

	"github.com/gin-gonic/gin"
)

func (TodoApi) TodoAddView(c *gin.Context) {
	res.OKWithMsg("success", c)
}
