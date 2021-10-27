exports.commands = [
	"xkcd",
	"highnoon"
]

exports.xkcd = {
	usage: "[comic number]",
	description: "displays a given xkcd comic number (or the latest if nothing specified",
	process: function(bot,msg,suffix){
		var url = "http://xkcd.com/";
		if(suffix != "") url += suffix+"/";
		url += "info.0.json";
		require("request")(url,function(err,res,body){
			try{
				var comic = JSON.parse(body);
				msg.channel.send(
					comic.title+"\n"+comic.img,function(){
						msg.channel.send(comic.alt)
				});
			}catch(e){
				msg.channel.send(
					"Couldn't fetch an XKCD for "+suffix);
			}
		});
	}
}

exports.highnoon = {
	process: (bot,msg,suffix) => {
		require("request")({
			uri:"http://imgs.xkcd.com/comics/now.png",
			followAllRedirects:true
		},(err, resp, body) => msg.channel.send(resp.request.uri.href))
	}
}
