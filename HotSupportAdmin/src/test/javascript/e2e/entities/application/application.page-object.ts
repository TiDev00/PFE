import { element, by, ElementFinder } from 'protractor';

export class ApplicationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-application div table .btn-danger'));
  title = element.all(by.css('jhi-application div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class ApplicationUpdatePage {
  pageTitle = element(by.id('jhi-application-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  appNameInput = element(by.id('field_appName'));
  descAppInput = element(by.id('field_descApp'));

  serviceSelect = element(by.id('field_service'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setAppNameInput(appName: string): Promise<void> {
    await this.appNameInput.sendKeys(appName);
  }

  async getAppNameInput(): Promise<string> {
    return await this.appNameInput.getAttribute('value');
  }

  async setDescAppInput(descApp: string): Promise<void> {
    await this.descAppInput.sendKeys(descApp);
  }

  async getDescAppInput(): Promise<string> {
    return await this.descAppInput.getAttribute('value');
  }

  async serviceSelectLastOption(): Promise<void> {
    await this.serviceSelect.all(by.tagName('option')).last().click();
  }

  async serviceSelectOption(option: string): Promise<void> {
    await this.serviceSelect.sendKeys(option);
  }

  getServiceSelect(): ElementFinder {
    return this.serviceSelect;
  }

  async getServiceSelectedOption(): Promise<string> {
    return await this.serviceSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ApplicationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-application-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-application'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
