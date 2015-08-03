package id.co.hanoman.project1.rs;

import id.co.hanoman.project1.model.Product;
import id.co.hanoman.project1.model.ProductCategory;
import id.co.hanoman.project1.model.ProductSummary;
import id.co.hanoman.project1.repo.ProductCategoryRepository;
import id.co.hanoman.project1.repo.ProductRepository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.senomas.common.persistence.PageRequestId;
import com.senomas.common.rs.ResourceNotFoundException;

@RestController
@RequestMapping("/rs/product")
public class ProductServiceController {

	@Autowired
	ProductRepository repository;

	@Autowired
	ProductCategoryRepository productCategoryRepository;

	@Autowired
	EntityManager entityManager;

	@RequestMapping(value = "/id/{id}", method = { RequestMethod.GET })
	@Transactional
	public Product get(@PathVariable("id") Long id) {
		Product obj = repository.findOne(id);
		if (obj == null)
			throw new ResourceNotFoundException("Product '" + id
					+ "' not found.");
		return obj;
	}

	@RequestMapping(method = { RequestMethod.GET })
	@Transactional
	public List<Product> list() {
		return repository.findAll();
	}

	@RequestMapping(method = { RequestMethod.POST })
	@Transactional
	public PageRequestId<ProductSummary> listSummary(@RequestBody ProductPageParam param) {
		try {
			Thread.sleep(2000);
		} catch (Exception e) {
		}
		return repository.findSummaryFilter(param);
	}

	@RequestMapping(method = { RequestMethod.PUT })
	@Transactional
	public Product save(@RequestBody Product obj) {
		if (obj.getName().indexOf("xxx") >= 0)
			throw new RuntimeException("Invalid name");
		if (obj.getCategory() != null) {
			ProductCategory category;
			if (obj.getCategory().getId() != null) {
				category = productCategoryRepository.findOne(obj.getCategory()
						.getId());
			} else {
				category = productCategoryRepository.findByName(obj
						.getCategory().getName());
			}
			if (category == null)
				throw new ResourceNotFoundException("Invalid category "
						+ obj.getCategory());
			obj.setCategory(category);
		}
		return repository.save(obj);
	}

	@RequestMapping(value = "/id/{id}", method = { RequestMethod.DELETE })
	@Transactional
	public Product delete(@PathVariable("id") Long id) {
		Product obj = repository.findOne(id);
		if (obj == null)
			throw new ResourceNotFoundException("Product '" + id
					+ "' not found.");
		if (obj.getName().indexOf("seno") >= 0)
			throw new RuntimeException("You can't delete me!");
		repository.delete(obj);
		return obj;
	}

}
