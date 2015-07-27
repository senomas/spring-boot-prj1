package id.co.hanoman.project1.rs;

import org.springframework.data.domain.PageRequest;

public class PageParam {
	int page;
	int size;
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	
	public PageRequest getRequest() {
		return new PageRequest(page, size);
	}
	
	@Override
	public String toString() {
		return "PageParam [page=" + page + ", size=" + size + "]";
	}
}
