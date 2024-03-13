package global

import (
	"toolsAppServer/config"

	"github.com/sirupsen/logrus"
)

var (
	Config *config.Config
	Log    *logrus.Logger
)
