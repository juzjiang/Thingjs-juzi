const mockData= {
	"datas": [
    {
		"code": "ZJ01",
		"displayName": "闸机_09",
		"en": "FZ_0001_0100_CGQHJCGQHJ_4F_01",
		"location": "4F西侧办公区5",
        "suibian":' 1',
		"point": [{
			"name": "DIZJGZZT",
			"pvn": "FZ_0001_0100_CGQHJCGQHJ_4F_01_AISNCO2",
			"value": 0,
			"valueType": "Boolean"
		},{
			"name": "DIZJYXZT",
			"pvn": "FZ_0001_0100_CGQHJCGQHJ_4F_01_BIZLX",
			"value": 0,
			"valueType": "Boolean"
        }],
    },
    {
		"code": "SBXTSB01",
		"displayName": "售票机_01",
		"en": "FZ_0001_0100_CGQHJCGQHJ_4F_01",
		"location": "4F西侧办公区5",
        "suibian":' 1',
		"point": [{
			"name": "DISBXTGZZT",
			"pvn": "FZ_0001_0100_CGQHJCGQHJ_4F_01_AISNCO21",
			"value": 0,
			"valueType": "Boolean"
		},{
			"name": "DISBXTXYXZT",
			"pvn": "FZ_0001_0100_CGQHJCGQHJ_4F_01_BIZLX22",
			"value": 1,
			"valueType": "Boolean"
        }],
    }
],

	"means": [
        {
            "code": "ZJ01",
            "key": "DIZJGZZT",
            "unit": "",
            "value": "{\"0\":\"正常\",\"1\":\"故障\"}"
        },
        {
            "code": "ZJ01",
            "key": "DIZJYXZT",
            "unit": "",
            "value": "{\"0\":\"开\",\"1\":\"关\"}"
        },
        {
            "code": "SBXTSB01",
            "key": "DISBXTGZZT",
            "unit": "",
            "value": "{\"0\":\"正常\",\"1\":\"故障\"}"
        },
        {
            "code": "SBXTSB01",
            "key": "DISBXTXYXZT",
            "unit": "",
            "value": "{\"0\":\"开\",\"1\":\"关\"}"
        },

    ]
}
