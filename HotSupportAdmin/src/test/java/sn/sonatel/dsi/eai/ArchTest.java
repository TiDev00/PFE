package sn.sonatel.dsi.eai;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("sn.sonatel.dsi.eai");

        noClasses()
            .that()
                .resideInAnyPackage("sn.sonatel.dsi.eai.service..")
            .or()
                .resideInAnyPackage("sn.sonatel.dsi.eai.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..sn.sonatel.dsi.eai.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
