percent = (v, o) -> v * (o / 100)

two = new Two(
	width: 960
	height: 960
	autostart: true
	type: Two.Types.webgl
	fullscreen: true
).appendTo(viewport)

ball = new Ball(two)
paddle = new Paddle(two)

bricks = []
for i in [0 ... 10]
	bricks[i] = []
	for j in [0 ... 8]
		bricks[i][j] = new Brick two, j, i

clientStats = new Stats()
clientStats.domElement.style.position = 'absolute'
clientStats.domElement.style.left = '0px'
clientStats.domElement.style.top = '0px'
$(document.body).append clientStats.domElement

serverStats = new Stats()
serverStats.setMode 1
serverStats.domElement.style.position = 'absolute'
serverStats.domElement.style.left = '80px'
serverStats.domElement.style.top = '0px'
$(document.body).append serverStats.domElement
