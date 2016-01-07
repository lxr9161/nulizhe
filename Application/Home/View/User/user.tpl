<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<p>Hello world!!!!!!!!!!</p>
	 {$name} [ {$email} {$phone} ]

	 {$user.nickname|default="nxixixixixi"}
	 <br/>

	 <for start="1" end="100" name='nihao' step="10">{$nihao}<br/></for>

	 <eq name="hello" value="hello world">thinnkphp<else/>noeq</eq>

	 <br/>
	 <defined name="APP_DEBUG">
	  NAME常量已经定义
   	 </defined>
</body>
</html>