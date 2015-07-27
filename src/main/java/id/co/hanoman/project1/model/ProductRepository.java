package id.co.hanoman.project1.model;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;


public interface ProductRepository extends CrudRepository<Product, Long> {

	List<Product> findAll();

	Page<Product> findAll(Pageable pageable);

}
