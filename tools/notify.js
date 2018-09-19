const Notify = {
	_ws: null,
	_callbacks: {},
	_retry: {
		interval: 1000,
		id: null
	},

	sub(key, fn) {
		this._callbacks[key] = this._callbacks[key]
			? [fn, ...this._callbacks[key]]
			: [fn]
	},

	notify(key, payload={}) {
		if (!this._ws) throw new Error('No websocket connection')
		const cbs = this._callbacks[key]
		if (cbs && cbs.length) {
			cbs.forEach(cb => cb(payload))
		}
	},

	push(key, payload={}) {
		if (!this._ws) throw new Error('No websocket connection')
		this._ws.send(JSON.stringify({ key, payload }))
	},

	handleClose() {
		const { interval } = this._retry
		console.log('WebSocket connection closed.')
		setTimeout(this.connect.bind(this), interval)
	},

	handleOpen() {
		console.log('WebSocket connection made.')
		clearInterval(this._retry.id)
	},

	connect() {
		this._ws = new WebSocket('ws://192.168.1.148:8080/notifications')
		this._ws.onmessage = ({ data }) => {
			const { key, payload } = JSON.parse(data)
			this.notify(key, payload)
		}
		this._ws.onerror = err => console.log(err.message && err.message)
		this._ws.onopen = this.handleOpen.bind(this)
		this._ws.onclose = this.handleClose.bind(this)
		return this
	}
}

module.exports = Notify
