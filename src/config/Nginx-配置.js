#使用nginx常用命令
cd E:  E:\nginx-1.16.1
1、启动：        start nginx.exe
2、关闭nginx：  ./nginx  -s  stop
3、重启nginx：  ./nginx -s reload

#host配置： 127.0.0.1 jiayouwa.triumen.cn
 
#修改 nginx 配置
 upstream tomcatserver_agent_cms {
   server 10.0.2.90:8080 weight=1;
}

server {
		listen       8080;
		server_name  jiayouwa.agent.triumen.cn;

		location / {

			proxy_pass http://tomcatserver_agent_cms/;
			proxy_connect_timeout 600;
			proxy_read_timeout 600;
		}

		error_page   500 502 503 504  /50x.html;
		location = /50x.html {
			root   html;
		}
	}
