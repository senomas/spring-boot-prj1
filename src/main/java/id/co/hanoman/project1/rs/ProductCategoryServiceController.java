package id.co.hanoman.project1.rs;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.senomas.common.rs.ResourceNotFoundException;

import id.co.hanoman.project1.model.ProductCategory;
import id.co.hanoman.project1.repo.ProductCategoryRepository;

@RestController
@RequestMapping("/rs/productCategory")
public class ProductCategoryServiceController {

	@Autowired
	ProductCategoryRepository repository;

	@RequestMapping(value = "/id/{id}", method = { RequestMethod.GET })
	@PreAuthorize("hasAnyRole('opr', 'admin')")
	@Transactional
	public ProductCategory get(@PathVariable("id") Long id) {
		ProductCategory obj = repository.findOne(id);
		if (obj == null)
			throw new ResourceNotFoundException("ProductCategory '" + id
					+ "' not found.");
		return obj;
	}

	@RequestMapping(method = { RequestMethod.GET })
	@PreAuthorize("hasAnyRole('opr', 'admin')")
	@Transactional
	public List<ProductCategory> list() {
		return repository.findAll();
	}

	@RequestMapping(method = { RequestMethod.POST })
	@PreAuthorize("hasAnyRole('opr', 'admin')")
	@Transactional
	public Page<ProductCategory> list(@RequestBody ProductCategoryPageParam param) {
		try {
			Thread.sleep(2000);
		} catch (Exception e) {
		}
		return repository.findFilter(param);
	}

	@RequestMapping(method = { RequestMethod.PUT })
	@PreAuthorize("hasRole('admin')")
	@Transactional
	public ProductCategory save(@RequestBody ProductCategory obj) {
		if (obj.getName().indexOf("xxx") >= 0)
			throw new RuntimeException("Invalid name");
		return repository.save(obj);
	}

	@RequestMapping(value = "/id/{id}", method = { RequestMethod.DELETE })
	@PreAuthorize("hasRole('admin')")
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
