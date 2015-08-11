package id.co.hanoman.project1;

import java.util.Random;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import id.co.hanoman.project1.model.Product;
import id.co.hanoman.project1.model.ProductCategory;
import id.co.hanoman.project1.repo.ProductCategoryRepository;
import id.co.hanoman.project1.repo.ProductRepository;

@Component
public class DataInitializer {
	private static final Logger log = LoggerFactory
			.getLogger(DataInitializer.class);

	@Autowired
	@Qualifier("transactionManager")
	protected PlatformTransactionManager txManager;

	@Autowired
	protected ProductRepository productRepo;

	@Autowired
	protected ProductCategoryRepository categoryRepo;

	@PostConstruct
	public void populateDummyData() {
		TransactionTemplate tmpl = new TransactionTemplate(txManager);
		tmpl.execute(new TransactionCallbackWithoutResult() {
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				try {
					log.info("Populate dummy data...");

					initProducts();

					log.info("Done populate dummy data.");
				} catch (Exception e) {
					throw new RuntimeException(e.getMessage(), e);
				}
			}
		});
	}

	protected void initProducts() {
		String catName[] = { "Book", "Magazine", "Comic" };
		ProductCategory cat[] = new ProductCategory[catName.length];

		for (int i = 0, il = catName.length; i < il; i++) {
			cat[i] = categoryRepo.findByName(catName[i]);
			if (cat[i] == null) {
				cat[i] = new ProductCategory(catName[i]);
				cat[i] = categoryRepo.save(cat[i]);
			}
		}

		long productCount = 543;
		long count = productRepo.count();
		if (count < productCount) {
			Random rnd = new Random();
			String prodNames[] = { "dummy", "foo", "john", "marvel", "dc",
					"black", "white", "brown", "fox", "lazy", "eager", "mount",
					"river", "express", "train", "bus", "car", "bycicle",
					"monocrome", "super", "batman", "robin", "superman",
					"joker", "yoda", "windu", "luke", "darth", "ben" };
			for (long i = count; i < productCount; i++) {
				Product p = new Product();
				if (i % 100 == 0) log.info("Save "+i+" products");
				p.setName("Product "+prodNames[rnd.nextInt(prodNames.length)]+" "+prodNames[rnd.nextInt(prodNames.length)]+" "+i);
				p.setCategory(cat[rnd.nextInt(cat.length)]);
				p.setDescription("Full description "+p.getName());
				productRepo.save(p);
			}
		}
	}

}
