package id.co.hanoman.project1.repo;

import id.co.hanoman.project1.model.Product;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long>, ProductRepositoryCustom {

	List<Product> findAll();

}
