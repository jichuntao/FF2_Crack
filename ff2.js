/**
 * Created with JetBrains WebStorm.
 * User: jichuntao
 * Date: 14-6-6
 * Time: 下午2:51
 * To change this template use File | Settings | File Templates.
 */
var nsutil = require('./nsutil');
var querystring = require('querystring');
var serverUrl = 'ff2-us.socialgamenet.com';
//var path = '/time.php';//batch load_user_data

var path = '/persist/batch/';//batch load_user_data
var data = {};
data.user = '100003188026759';
data.world_id = '100003188026759';
data.userguid = '142'
data.batch_number = 7;
data.batch_token = '4ec9129eef79a5975b52a6c2603a9e4b';
data.IQ = '25970157386';
data.secret = 'c13a92260ba53f23f0825960ea41fe1e';
data.flashVersion = '14568.22';
data.session_key = '4000032520';
data.hashed_id = '';

var options = {};
options.hostname = serverUrl;
options.method = 'POST';

var headers = {};
headers['Accept'] = '*/*';
headers['Content-Type'] = 'application/x-www-form-urlencoded';
headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.22 Safari/537.36';
headers['Referer'] = 'https://d297281mgrzzms.cloudfront.net/v2/versions/14377/main/Preloader.swf';
headers['Accept-Language'] = 'zh-CN,zh;q=0.8';
headers['Origin'] = 'https://d297281mgrzzms.cloudfront.net';
options.headers = headers;


var addtime = getAddTime();
//var command='[{"opTime":'+getAddTime()+',"action":"move","params":{"newX":63,"maskKey":null,"guid":"11","newZ":0,"newY":5,"className":"Animal_Cow"}},{"opTime":1402060717,"action":"move","params":{"newX":59,"maskKey":null,"guid":"50002","newZ":0,"newY":14,"className":"Animal_Chicken"}},{"opTime":'+getAddTime()+',"action":"move","params":{"newX":56,"maskKey":null,"guid":"50023","newZ":0,"newY":21,"className":"Animal_Cow"}}]';
//var command = '[{"action":"toggle_setting","params":{"ident":"music","value":1},"opTime":' + addtime + '}]';
var command = '[';
command += '{"opTime":'+(addtime-6)+',"params":{"ident":"First0_4_1"},"action":"start_quest"},';
command += '{"opTime":'+(addtime-5)+',"params":{"value":1,"ident":"zoom"},"action":"toggle_setting"},';
command += '{"opTime":'+(addtime-4)+',"params":{"objectiveIndex":1,"objectiveState":{"usecash":false,"count":0,"isComplete":true,"ident":"First0_4_1_1"},"ident":"First0_4_1"},"action":"save_quest_objective"},';
command += '{"opTime":'+(addtime-3)+',"params":{"value":0.7,"ident":"zoom"},"action":"toggle_setting"},';
command += '{"opTime":'+(addtime-2)+',"params":{"objectiveIndex":0,"objectiveState":{"usecash":false,"count":0,"isComplete":true,"ident":"First0_4_1_0"},"ident":"First0_4_1"},"action":"save_quest_objective"},';
command += '{"opTime":'+(addtime-1)+',"params":{"ident":"First0_4_1"},"action":"complete_quest"}';
command += ']';

call_batch(addtime, command, function (err, chunks) {
    console.log(err);
    console.log(chunks)
});

function call_batch(addtime, commands, cb) {
    options.path = path + '?key=' + getKeyTime() + '75';
    data.addTime = addtime;
    data.sendTime = data.addTime;
    data.sendVersion = secretTime(data.addTime);
    data.batch_number++;
    data.commands = commands;
    console.log(querystring.stringify(data));

    nsutil.PostData(options, querystring.stringify(data), function (err, chunks, pcookies) {
        cb(err, chunks);
    });
}

//Post请求 URL 中key 的时间
function getKeyTime() {
    return new Date().getTime().toString() + Math.random().toString().substr(0, 8);
}

//表单中的 时间
function getAddTime() {
    return Math.round(new Date().getTime() / 1000) + 15;
}

//反编加密算法
function secretTime(param1) {
    var _loc_2 = 0;
    if (!param1) {
        return 0;
    }
    var _loc_3 = [1, 6, 9, 8, 7, 3, 0, 2, 5, 4];
    var _loc_4 = param1.toString().split("");
    var _loc_5 = [];
    _loc_2 = 0;
    while (_loc_2 < _loc_4.length) {

        _loc_4[_loc_2] = _loc_3[_loc_4[_loc_2]];
        _loc_2++;
    }
    _loc_2 = (_loc_4.length - 1) - _loc_4[(_loc_4.length - 1)];
    while (_loc_2 < (_loc_4.length - 1)) {

        _loc_5.push(_loc_4[_loc_2]);
        _loc_2++;
    }
    _loc_2 = 0;
    while (_loc_2 < (_loc_4.length - 1) - _loc_4[(_loc_4.length - 1)]) {

        _loc_5.push(_loc_4[_loc_2]);
        _loc_2++;
    }
    _loc_5.push(_loc_4[(_loc_4.length - 1)]);
    return Number(_loc_5.join("")) * 3 + 17;
}

