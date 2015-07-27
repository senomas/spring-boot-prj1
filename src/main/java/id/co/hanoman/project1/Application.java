package id.co.hanoman.project1;

import java.util.Arrays;

import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.context.request.async.DeferredResult;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.AlternateTypeRules;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.schema.WildcardType;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import com.fasterxml.classmate.TypeResolver;
import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

@SpringBootApplication
@EnableSwagger2
@ComponentScan({
    "id.co.hanoman", "com.senomas.common.loggerfilter"
})
public class Application {

    @Autowired
    private TypeResolver typeResolver;

    @Bean
    public Docket getApi() {
        // @formatter:off
        return new Docket(DocumentationType.SWAGGER_2).select().apis(RequestHandlerSelectors.any())
        		.paths(paths()).build().pathMapping("/").directModelSubstitute(LocalDate.class, String.class)
                .genericModelSubstitutes(ResponseEntity.class).alternateTypeRules(
                        AlternateTypeRules
                                .newRule(typeResolver.resolve(DeferredResult.class, typeResolver.resolve(ResponseEntity.class, WildcardType.class)), typeResolver.resolve(WildcardType.class)))
                .useDefaultResponseMessages(false).globalResponseMessage(RequestMethod.GET,
                        Arrays.asList(new ResponseMessageBuilder().code(500).message("500 message").responseModel(new ModelRef("Error")).build()));
        // @formatter:on
    }

    @SuppressWarnings("unchecked")
    private Predicate<String> paths() {
        return Predicates.or(PathSelectors.regex("/rs/.*"));
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
