package id.co.hanoman.project1.repo;

import id.co.hanoman.project1.model.Product;
import id.co.hanoman.project1.model.ProductCategory;
import id.co.hanoman.project1.model.ProductSummary;
import id.co.hanoman.project1.rs.ProductFilter;
import id.co.hanoman.project1.rs.ProductPageParam;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;

import org.springframework.beans.factory.annotation.Autowired;

import com.senomas.common.persistence.AbstractCustomRepository;
import com.senomas.common.persistence.FilterJoin;
import com.senomas.common.persistence.PageRequestId;

public class ProductRepositoryImpl extends AbstractCustomRepository implements ProductRepositoryCustom {
	
	@Autowired
	EntityManager entityManager;

	@Override
	public PageRequestId<ProductSummary> findSummaryFilter(final ProductPageParam param) {
		return findJoinWithSpecification(param.getRequestId(), entityManager, param.getRequest(), new FilterJoin<ProductSummary, Product, ProductCategory>() {
			@Override
			public Predicate toPredicate(Root<Product> product, Root<ProductCategory> category, CriteriaQuery<?> query, CriteriaBuilder builder) {
				ProductFilter filter = param.getFilter();
				Predicate p = builder.equal(product.get("category").get("id"), category.get("id"));
				if (filter != null) {
					if (filter.getName() != null && filter.getName().length() > 0) {
						p = builder.and(p, builder.like(product.get("name").as(String.class), filter.getName()));
					}
					if (filter.getCategoryId() != null) {
						p = builder.and(p, builder.equal(product.get("category").get("id"), filter.getCategoryId()));
					}
					if (filter.getDescription() != null && filter.getDescription().length() > 0) {
						p = builder.and(p, builder.like(product.get("description").as(String.class), filter.getDescription()));
					}
				}
				return p;
			}

			@Override
			public Selection<? extends ProductSummary> getSelection(
					Root<Product> product, Root<ProductCategory> category,
					CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.construct(ProductSummary.class, product.get("id"), category.get("name"), product.get("name"));
			}
		}, ProductSummary.class, Product.class, ProductCategory.class);
	}

}
