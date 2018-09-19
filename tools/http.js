const url = 'http://192.168.1.148:8080'
const http = {
	async get(path) {
		return fetch(`${url}${path}`)
			.then(resp => resp.json())
			.then(({ data }) => data)
	}
}

module.exports = http
