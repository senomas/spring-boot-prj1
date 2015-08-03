package id.co.hanoman.project1.rs;

import com.senomas.common.rs.PageParam;

public class ProductCategoryPageParam extends PageParam {
	ProductCategoryFilter filter;
	
	public ProductCategoryFilter getFilter() {
		return filter;
	}
	
	public void setFilter(ProductCategoryFilter filter) {
		this.filter = filter;
	}
}
