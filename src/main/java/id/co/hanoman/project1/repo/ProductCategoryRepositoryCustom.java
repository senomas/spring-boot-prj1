package id.co.hanoman.project1.repo;

import id.co.hanoman.project1.model.ProductCategory;
import id.co.hanoman.project1.rs.ProductCategoryPageParam;

import org.springframework.data.domain.Page;

public interface ProductCategoryRepositoryCustom {
	
	Page<ProductCategory> findFilter(ProductCategoryPageParam param);

}
