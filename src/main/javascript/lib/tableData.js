export default class TableData {

	constructor(loadData, pageSize = 100, pageBuffer = 1) {
		this.pageSize = pageSize;
		this.pageBuffer = pageBuffer;
		this.cacheSize = (pageBuffer*2+1)*pageSize;
		this.total = 0;
		this.rowLoading = {};
		this.content = new Map();

		this.requested = undefined;
		this.loadData = loadData;

		this.getRow = this.getRow.bind(this);
		this.update = this.update.bind(this);
		this.clear = this.clear.bind(this);
	}

	getRow(row) {
		let r = this.content.get(row);
		if (!r) {
			if (!this.requested) {
				this.requested = row;
				window.setTimeout(this.loadData, 10, Math.floor(row/this.pageSize), this.pageSize);
			} else {
				this.requested = row;
			}
			r = this.rowLoading;
		}
		r.row = row + 1;
		return r;
	}

	update(data) {
		this.total = data.totalElements;
		if (data.totalElements === 0) {
			this.offset = 0;
			this.content.clear();
			return;
		}
		let offset = data.number * data.size;
		data.content.forEach(function(v, k) {
			this.content.set(offset + k, v);
		}.bind(this));
		if (this.content.size > this.cacheSize) {
			console.log('content size '+this.content.size);
			let p1 = offset - this.pageBuffer * this.pageSize;
			let p2 = offset + (this.pageBuffer + 1) * this.pageSize;
			this.content.forEach(function(v, k) {
				if (k < p1 || k > p2 || k >= this.total) this.content.delete(k);
			}.bind(this));
			console.log('new content size '+this.content.size+'  '+p1+' '+p2);
		}
		if (this.requested) {
			if (!this.content.has(this.requested)) {
				window.setTimeout(this.loadData, 10, Math.floor(this.requested/this.pageSize), this.pageSize);
			} else {
				this.requested = undefined;
			}
		}
	}

	updateRow(data) {
		this.content.forEach((v, k, list) => {
			if (data.id == v.id) {
				list[k] = data;
			}
		});
	}

	clear() {
		this.offset = 0;
		this.total = 0;
		this.content.clear();
	}
}
