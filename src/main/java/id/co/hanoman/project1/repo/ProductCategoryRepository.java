package id.co.hanoman.project1.repo;

import id.co.hanoman.project1.model.ProductCategory;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ProductCategoryRepository extends CrudRepository<ProductCategory, Long>, ProductCategoryRepositoryCustom {

	ProductCategory findByName(String name);

	List<ProductCategory> findAll();

}
