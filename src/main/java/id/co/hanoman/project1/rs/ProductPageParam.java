package id.co.hanoman.project1.rs;

import com.senomas.common.rs.PageParam;

public class ProductPageParam extends PageParam {
	ProductFilter filter;
	
	public ProductFilter getFilter() {
		return filter;
	}
	
	public void setFilter(ProductFilter filter) {
		this.filter = filter;
	}
}
