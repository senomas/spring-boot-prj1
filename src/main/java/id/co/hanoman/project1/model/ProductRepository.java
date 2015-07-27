package id.co.hanoman.project1.model;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;


public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

	List<Product> findAll();

}
