module.exports=function(eventID,name,token,done){
	var request=require("request");
	var access="https://graph.facebook.com/v2.8/"+eventID+"/attending?fields=name,picture{url}&limit=500&access_token="+token;
	var regex=new RegExp(" ?"+name+" ");
	var arr=[];
	var giveMeData=function(access){
		request(access,function(error,response,body){
			if(!error && response.statusCode===200){		
				var paging=JSON.parse(body).paging;
				var res=JSON.parse(body).data;	
				for(var k in res){
					if(res[k]["name"].search(regex)>-1){
						arr.push(res[k]);
					}
				}
				if(paging.next===undefined){
					return done(null,arr);
				}
				giveMeData(paging.next);
			}else{
				done(error);
			}
		});
	};
	giveMeData(access);
};
