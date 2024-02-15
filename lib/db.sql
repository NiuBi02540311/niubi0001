USE [WEBAPI]
GO

/****** Object:  Table [dbo].[wx_users]    Script Date: 2024/2/16 0:32:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[wx_users](
	[uid] [int] IDENTITY(1,1) NOT NULL,
	[openid] [varchar](30) NULL,
	[session_key] [varchar](30) NULL,
	[name] [varchar](50) NULL,
	[addtime] [datetime] NULL,
	[logintime] [datetime] NULL,
	[logincount] [int] NULL,
	[admin] [int] NULL,
	[flag] [int] NULL,
	[isdelete] [int] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[wx_users] ADD  CONSTRAINT [DF_wx_users_addtime]  DEFAULT (getdate()) FOR [addtime]
GO

ALTER TABLE [dbo].[wx_users] ADD  CONSTRAINT [DF_wx_users_logintime]  DEFAULT (getdate()) FOR [logintime]
GO

ALTER TABLE [dbo].[wx_users] ADD  CONSTRAINT [DF_wx_users_logincount]  DEFAULT ((0)) FOR [logincount]
GO

ALTER TABLE [dbo].[wx_users] ADD  CONSTRAINT [DF_wx_users_admin]  DEFAULT ((0)) FOR [admin]
GO

ALTER TABLE [dbo].[wx_users] ADD  CONSTRAINT [DF_wx_users_flag]  DEFAULT ((0)) FOR [flag]
GO

ALTER TABLE [dbo].[wx_users] ADD  CONSTRAINT [DF_wx_users_isdelete]  DEFAULT ((0)) FOR [isdelete]
GO


-------------------------------------------------------------------------------------------
USE [WEBAPI]
GO

/****** Object:  Table [dbo].[wx_goodadd]    Script Date: 2024/2/16 0:33:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[wx_goodadd](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[pid] [int] NULL,
	[openid] [varchar](30) NULL,
	[title] [varchar](100) NULL,
	[_desc] [varchar](100) NULL,
	[num] [int] NULL,
	[price] [float] NULL,
	[tag] [varchar](100) NULL,
	[buytime] [date] NULL,
	[addtime] [datetime] NULL,
	[updatetime] [datetime] NULL,
	[approveID] [int] NULL,
	[approvetime] [datetime] NULL,
	[shared] [int] NULL,
	[ImgCount] [int] NULL,
	[isdelete] [int] NULL,
	[deletetime] [datetime] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_pid]  DEFAULT ((0)) FOR [pid]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_num]  DEFAULT ((0)) FOR [num]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_price]  DEFAULT ((0)) FOR [price]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_addtime]  DEFAULT (getdate()) FOR [addtime]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_uptime]  DEFAULT (getdate()) FOR [updatetime]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_approveID]  DEFAULT ((0)) FOR [approveID]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_shared]  DEFAULT ((0)) FOR [shared]
GO

ALTER TABLE [dbo].[wx_goodadd] ADD  CONSTRAINT [DF_wx_goodadd_isdelete]  DEFAULT ((0)) FOR [isdelete]
GO


---------------------------------------------------------------
USE [WEBAPI]
GO

/****** Object:  Table [dbo].[wx_good_img]    Script Date: 2024/2/16 0:33:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[wx_good_img](
	[sid] [int] IDENTITY(1,1) NOT NULL,
	[GoodID] [int] NULL,
	[ImgUrl] [varchar](100) NULL,
	[addtime] [datetime] NULL,
	[Isdelete] [int] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[wx_good_img] ADD  CONSTRAINT [DF_wx_good_img_addtime]  DEFAULT (getdate()) FOR [addtime]
GO

ALTER TABLE [dbo].[wx_good_img] ADD  CONSTRAINT [DF_wx_good_img_Isdelete]  DEFAULT ((0)) FOR [Isdelete]
GO


