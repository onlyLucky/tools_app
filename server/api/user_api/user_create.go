package user_api

import (
	"toolsAppServer/service/common/res"

	"github.com/gin-gonic/gin"
)

func (UserApi) UserCreateView(c *gin.Context) {
	res.OKWithMsg("success", c)
}
