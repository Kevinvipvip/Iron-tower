var bottomList = [{
    itemName: '景区概况',
    clickName: 'openScenic',
    flag: true
  },
  {
    itemName: '笔记',
    clickName: 'openNote',
    flag: true
  },
  {
    itemName: '游览路线',
    clickName: 'openRoute',
    flag: false
  }
]

var data = [
  [{
      coord: [50.5, 39],
      content: '铁塔',
      text: '铁塔始建于北宋皇佑元年（1049年），已有近千年历史。位于铁塔公园的东北部，是园内重要的文物，也是主要的景点。是1961年中国首批公布的国家重点保护文物之一，享有“天下第一塔”之称。铁塔高55.88米，八角十三层。因此地为开宝寺，又称“开宝寺塔”。又因遍体通砌褐色琉璃砖，混似铁柱，从元代起民间称其为"铁塔"。',
      listenUrl: 'https://www.caves.vip/res/kaifeng/tieta.mp3',
      latitude: 34.815816,
      longitude: 114.366592,
      show: false
    },
    {
      coord: [33, 49],
      content: '灵感院',
      text: '灵感院位于接引殿旁边，是为供奉白玉佛像而建。正殿内供奉的释迦牟尼“白玉佛像”，是1933年由旅居缅甸的华侨捐赠。佛像高约1米，由整块白玉精雕而成，秀丽端庄，晶莹洁亮，堪称佳品。',
      listenUrl: 'https://www.caves.vip/res/kaifeng/lingganyuan.mp3',
      latitude: 34.816368,
      longitude: 114.368332,
      show: false
    },
    {
      coord: [49.1, 52],
      content: '接引殿',
      text: '接引殿在铁塔的正前面，仿汉白玉砌成，系三门牌楼式仿宋建筑，宽70米，高12米，大门左右墙壁上，对称镶嵌着8块庄严、肃穆、圣洁青石神佛坐像，1986年为供奉北宋文物“接引佛”而建。该殿为重檐歇山式建筑，殿前，石狮雄踞，鼎香缭绕；殿周，24根大柱抱殿而矗；大殿台基，青石栏杆拦护，妙趣横生的96只小狮子环绕排开。',
      listenUrl: 'https://www.caves.vip/res/kaifeng/jieyindian.mp3',
      latitude: 34.816063,
      longitude: 114.368935,
      show: false
    }
  ],
  [{
      coord: [49.2, 87],
      content: '铁塔大门',
      text: '',
      latitude: 34.815693,
      longitude: 114.363251,
      show: false
    },
    {
      coord: [66, 45],
      content: '南门',
      text: '',
      latitude: 34.815006,
      longitude: 114.370674,
      show: false
    }
  ],
  [{
      coord: [44.5, 39],
      content: '卫生间',
      text: '',
      latitude: 34.816116,
      longitude: 114.364388,
      show: false
    },
    {
      coord: [60, 51],
      content: '卫生间',
      text: '',
      latitude: 34.816116,
      longitude: 114.364388,
      show: false
    }
  ],
  [{
    coord: [30, 90],
    content: '游客服务中心',
    text: '',
    latitude: 34.816067,
    longitude: 114.363388,
    show: false
  }],
  [{
      coord: [20, 84],
      content: '停车场',
      text: '',
      latitude: 34.816100,
      longitude: 114.363690,
      show: false
    },
    {
      coord: [64, 56],
      content: '停车场',
      text: '',
      latitude: 34.815257,
      longitude: 114.369269,
      show: false
    }
  ],
  [{
      coord: [38, 88],
      content: '售票处',
      text: '',
      latitude: 34.815990,
      longitude: 114.363350,
      show: false
    },
    {
      coord: [45, 43],
      content: '售票处',
      text: '',
      latitude: 34.816067,
      longitude: 114.370850,
      show: false
    }
  ],
  [{
    coord: [59, 86],
    content: '警务处',
    text: '',
    latitude: 34.815543,
    longitude: 114.363781,
    show: false
  }]
]

module.exports = {
  data: data,
  bottomList: bottomList
}