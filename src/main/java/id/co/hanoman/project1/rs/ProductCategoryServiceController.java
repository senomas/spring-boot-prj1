package id.co.hanoman.project1.rs;

import id.co.hanoman.project1.model.ProductCategory;
import id.co.hanoman.project1.model.ProductCategoryRepository;
import io.swagger.annotations.ApiParam;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.senomas.common.rs.PageParam;
import com.senomas.common.rs.ResourceNotFoundException;

@RestController
@RequestMapping("/rs/productCategory")
public class ProductCategoryServiceController {

	@Autowired
	ProductCategoryRepository repository;

	@RequestMapping(value = "/id/{id}", method = { RequestMethod.GET })
	@Transactional
	public ProductCategory get(@PathVariable("id") Long id) {
		ProductCategory obj = repository.findOne(id);
		if (obj == null)
			throw new ResourceNotFoundException("ProductCategory '" + id
					+ "' not found.");
		return obj;
	}

	@RequestMapping(value = "/", method = { RequestMethod.GET })
	@Transactional
	public List<ProductCategory> list() {
		return repository.findAll();
	}

	@RequestMapping(value = "/", method = { RequestMethod.POST })
	@Transactional
	public Page<ProductCategory> list(@RequestBody PageParam param) {
		return repository.findAll(param.getRequest());
	}

	@RequestMapping(value = "/name/{name}", method = { RequestMethod.POST })
	@Transactional
	public Page<ProductCategory> listByNameLike(
			@ApiParam("name with like operator (use %)") @RequestParam("name") String name,
			@RequestBody PageParam param) {
		return repository.findByNameLike(name, param.getRequest());
	}

	@RequestMapping(value = "/", method = { RequestMethod.PUT })
	@Transactional
	public ProductCategory save(@RequestBody ProductCategory obj) {
		if (obj.getName().indexOf("xxx") >= 0)
			throw new RuntimeException("Invalid name");
		return repository.save(obj);
	}

	@RequestMapping(value = "/id/{id}", method = { RequestMethod.DELETE })
	@Transactional
	public ProductCategory delete(@PathVariable("id") Long id) {
		ProductCategory obj = repository.findOne(id);
		if (obj == null)
			throw new ResourceNotFoundException("Product '" + id
					+ "' not found.");
		if (obj.getName().indexOf("seno") >= 0)
			throw new RuntimeException("You can't delete me!");
		repository.delete(obj);
		return obj;
	}

}
