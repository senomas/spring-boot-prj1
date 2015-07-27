package id.co.hanoman.project1.rs;

import id.co.hanoman.project1.model.Product;
import id.co.hanoman.project1.model.ProductRepository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rs/product")
public class ProductServiceController {

	@Autowired
	ProductRepository repository;

	@RequestMapping(value="/id/{id}", method={RequestMethod.GET})
	@Transactional
	public Product get(@PathVariable("id") Long id) {
		Product obj = repository.findOne(id);
		if (obj == null) throw new ResourceNotFoundException("Product '"+id+"' not found.");
		return obj;
	}

	@RequestMapping(value="/", method={RequestMethod.GET})
	@Transactional
	public List<Product> list() {
		return repository.findAll();
	}

	@RequestMapping(value="/", method={RequestMethod.POST})
	@Transactional
	public Page<Product> list(@RequestBody PageParam param) {
		return repository.findAll(param.getRequest());
	}

	@RequestMapping(value="/", method={RequestMethod.PUT})
	@Transactional
	public Product save(@RequestBody Product obj) {
        if (obj.getName().indexOf("xxx") >= 0) throw new RuntimeException("Invalid name");
		return repository.save(obj);
	}

	@RequestMapping(value="/id/{id}", method={RequestMethod.DELETE})
	@Transactional
	public Product delete(@PathVariable("id") Long id) {
		Product obj = repository.findOne(id);
		if (obj == null) throw new ResourceNotFoundException("Product '"+id+"' not found.");
        if (obj.getName().indexOf("seno") >= 0) throw new RuntimeException("You can't delete me!");
		repository.delete(obj);
		return obj;
	}
	
}
