package id.co.hanoman.project1.model;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;


public interface ProductCategoryRepository extends CrudRepository<ProductCategory, Long> {

	List<ProductCategory> findAll();

	Page<ProductCategory> findAll(Pageable pageable);

}
