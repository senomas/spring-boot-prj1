package id.co.hanoman.project1.repo;

import id.co.hanoman.project1.model.ProductSummary;
import id.co.hanoman.project1.rs.ProductPageParam;

import com.senomas.common.persistence.PageRequestId;

public interface ProductRepositoryCustom {

	PageRequestId<ProductSummary> findSummaryFilter(ProductPageParam param);

}
