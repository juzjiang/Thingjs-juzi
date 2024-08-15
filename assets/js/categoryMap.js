 //专业类码
//  PAYXZT01 PA
// PISSBYXZT01:PIS
// DFT01 电扶梯
// FJ01 风机
// SBXTSB01 水泵
// ZJ01  闸机
// PSDZTM01 站台门

var categoryStatusMap= {
    'PAYXZT01':{'malfunction':'DISXGZZT','working':'DOSXYXZT'},
    'PISSBYXZT01':{'malfunction':'DIPISSXGZZT','working':'DOPISSXYXZT'},
    'DFT01':{'malfunction':'DIDFTGZZT','working':'DODFTYXZT'},
    'FJ01':{'malfunction':'DIFJGZZT','working':'DOFJYXZT'},
    'SBXTSB01':{'malfunction':'DISBXTGZZT','working':'DOSBXTYXZT'},
    'ZJ01':{'malfunction':'DIZJGZZT','working':'DOZJYXZT'},
    'PSDZTM01':{'malfunction':'DIZTMGZZT','working':'DOZTMYXZT'},
}

var CSSMAP={
        'PAYXZT01':
            {
                'normal': "background:url('/assets/img/icon-PA-1.png') 0% 0% / 100% 100% no-repeat ",
                'active': "background:url('/assets/img/icon-PA-2.png') 0% 0% / 100% 100% no-repeat ",
                'offline': "background:url('/assets/img/icon-PA-3.png') 0% 0% / 100% 100% no-repeat ",
            },
        'PISSBYXZT01':
            {
                'normal': "background:url('/assets/img/icon-PIS-1.png') 0% 0% / 100% 100% no-repeat ",
                'active': "background:url('/assets/img/icon-PIS-2.png') 0% 0% / 100% 100% no-repeat ",
                'offline': "background:url('/assets/img/icon-PIS-3.png') 0% 0% / 100% 100% no-repeat ",
            },
        'DFT01':
            {
                'normal': "background:url('/assets/img/icon-futi-1.png') 0% 0% / 100% 100% no-repeat ",
                'active': "background:url('/assets/img/icon-futi-2.png') 0% 0% / 100% 100% no-repeat ",
                'offline': "background:url('/assets/img/icon-futi-3.png') 0% 0% / 100% 100% no-repeat ",
            },
        'FJ01':
            {
                'normal': "background:url('/assets/img/icon-fengji-1.png') 0% 0% / 100% 100% no-repeat ",
                'active': "background:url('/assets/img/icon-fengji-2.png') 0% 0% / 100% 100% no-repeat ",
                'offline': "background:url('/assets/img/icon-fengji-3.png') 0% 0% / 100% 100% no-repeat ",
            },
        'SBXTSB01':
            {
                'normal': "background:url('/assets/img/icon-shuibeng-1.png') 0% 0% / 100% 100% no-repeat ",
                'active': "background:url('/assets/img/icon-shuibeng-2.png') 0% 0% / 100% 100% no-repeat ",
                'offline': "background:url('/assets/img/icon-shuibeng-3.png') 0% 0% / 100% 100% no-repeat ",
            },
        'ZJ01':
            {
                'normal': "background:url('/assets/img/icon-zhaji-1.png') 0% 0% / 100% 100% no-repeat ",
                'active': "background:url('/assets/img/icon-zhaji-2.png') 0% 0% / 100% 100% no-repeat ",
                'offline': "background:url('/assets/img/icon-zhaji-3.png') 0% 0% / 100% 100% no-repeat ",
            },
        'PSDZTM01':
            {
                'normal': "background:url('/assets/img/icon-men-1.png') 0% 0% / 100% 100% no-repeat ",
                'active': "background:url('/assets/img/icon-men-2.png') 0% 0% / 100% 100% no-repeat ",
                'offline': "background:url('/assets/img/icon-men-3.png') 0% 0% / 100% 100% no-repeat ",
            },
    }