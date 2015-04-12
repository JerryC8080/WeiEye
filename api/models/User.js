var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName   : 'users',
  identity    : 'User',

  attributes: {
    id                  : { type: 'string', unique: true, primaryKey: true },
    username            : { type: 'string' },
    screen_name         : { type: 'string' },   // 用户昵称
    name                : { type: 'string' },   // 友好显示名称
    province            : { type: 'integer' },   // 用户所在省级ID
    city                : { type: 'integer' },   // 用户所在城市ID
    location            : { type: 'string' },   // 用户所在地
    description         : { type: 'string' },   // 用户个人描述
    url                 : { type: 'string' },   // 用户博客地址
    profile_image_url   : { type: 'string' },   // 用户头像地址（中图），50×50像素
    profile_url         : { type: 'string' },   // 用户的微博统一URL地址
    domain              : { type: 'string' },   // 用户的个性化域名
    gender              : { type: 'string' },   // 性别，m：男、f：女、n：未知
    followers_count     : { type: 'integer' },  // 粉丝数
    friends_count       : { type: 'integer' },  // 关注数
    statuses_count      : { type: 'integer' },  // 微博数
    favourites_count    : { type: 'integer' },  // 收藏数
    created_at          : { type: 'date' },   // 用户创建（注册）时间
    verified            : { type: 'boolean' },  // 是否是微博认证用户，即加V用户，true：是，false：否
    avatar_large        : { type: 'string' }, // 用户头像地址（大图），180×180像素
    avatar_hd           : { type: 'string' }, // 用户头像地址（高清），高清头像原图
    follow_me           : { type: 'boolean' }, // 该用户是否关注当前登录用户，true：是，false：否
    bi_followers_count  : { type: 'integer' }, // 用户的互粉数
    lang                : { type: 'string' }, // 用户当前的语言版本，zh-cn：简体中文，zh-tw：繁体中文，en：英语

    email               : { type: 'email',  unique: true },
    passports           : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
