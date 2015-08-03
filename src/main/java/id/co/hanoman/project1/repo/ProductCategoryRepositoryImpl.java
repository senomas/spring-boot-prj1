package id.co.hanoman.project1.repo;

import id.co.hanoman.project1.model.ProductCategory;
import id.co.hanoman.project1.rs.ProductCategoryFilter;
import id.co.hanoman.project1.rs.ProductCategoryPageParam;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import com.senomas.common.persistence.AbstractCustomRepository;
import com.senomas.common.persistence.Filter;

public class ProductCategoryRepositoryImpl extends AbstractCustomRepository implements ProductCategoryRepositoryCustom {
	
	@Autowired
	EntityManager entityManager;
	
	@Override
	public Page<ProductCategory> findFilter(final ProductCategoryPageParam param) {
		return findWithSpecification(param.getRequestId(), entityManager, param.getRequest(), new Filter<ProductCategory>() {
			@Override
			public Predicate toPredicate(Root<ProductCategory> category, CriteriaQuery<?> query, CriteriaBuilder builder) {
				Predicate p = null;
				ProductCategoryFilter filter = param.getFilter();
				if (filter != null) {
					if (filter.getName() != null) {
						p = builder.like(category.get("name").as(String.class), filter.getName());
					}
				}
				return p;
			}
		}, ProductCategory.class);
	}

}
