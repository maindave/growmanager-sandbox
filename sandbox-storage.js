(()=>{'use strict';
const PREFIX='growmanager-sandbox:';
const proto=Storage.prototype;
const getItem=proto.getItem,setItem=proto.setItem,removeItem=proto.removeItem;
proto.getItem=function(key){return getItem.call(this,`${PREFIX}${key}`)};
proto.setItem=function(key,value){return setItem.call(this,`${PREFIX}${key}`,value)};
proto.removeItem=function(key){return removeItem.call(this,`${PREFIX}${key}`)};
})();
