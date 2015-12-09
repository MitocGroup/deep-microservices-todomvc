#!/usr/bin/env bash



http_code=$(curl -sL -w "%{http_code}\\n" "http://d1om2xh63shh0v.cloudfront.net" -o /dev/null)

echo ${http_code}
if [[ "$http_code" = 200 ]] ; then
	echo "success"
     #Connection success!
else
	echo "failed"
     #Connection failure
fi

